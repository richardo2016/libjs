import moment from 'moment'
import { descriptors, TIME_CONST } from './constant'
let dateTimeUtils = {}

export const YESTERDAY = descriptors.YESTERDAY
export const TODAY = descriptors.TODAY
export const TOMORROW = descriptors.TOMORROW

export const TIMES = {...descriptors}

export { TIME_CONST }

export function formatUtc (utctime, timeformat) {
  timeformat = timeformat || 'YYYY-MM-DD'
  if (!utctime) {
    return ''
  }

  let utcDateTime = moment.utc(utctime)
  return utcDateTime.format(timeformat)
}

export function formatLocal (utctime, timeformat) {
  timeformat = timeformat || 'YYYY-MM-DD'
  if (!utctime) {
    return ''
  }

  let utcDateTime = moment.utc(utctime).local()
  return utcDateTime.format(timeformat)
}

export const inOneDay = (time_filter) => {
  let { begin_ts, end_ts } = computeTimeFilter(time_filter) || {},
      be_ts_offset = end_ts - begin_ts,
      inOneDay = be_ts_offset <= TIME_CONST.daySecOffset

  if (be_ts_offset === 0) {
    inOneDay = 'same'
  } else if (be_ts_offset < 0) {
    inOneDay = 'negative'
  }

  return inOneDay
}

/**
 * Check One Object whether the time query range,
 * which is one array with 1st elem for start_time
 * and 2nd elem for end_time.
 *
 * start_time and end_time are both moment instance
 *
 * @param  {Object} time_filter [Range Object]
 *
 * @return {Boolean}             [is time_filter a range of moment]
 */
export const isTimesRange = (time_filter = '') => {
  return time_filter && time_filter.length === 2 && time_filter.filter(x => x instanceof moment).length === 2
}

/**
 * Time Filter Protocal:
 * params: String/ Moment Range
 * results: Object: {begin_ts: , end_ts} | false | null | undefined
 *
 * return { TimeRange | undefined }
 */

export const computeTimeFilter = (time_filter) => {
  if (isTimesRange(time_filter)) {
    return {
      begin_ts: time_filter[0].toDate().getTime() / 1000,
      end_ts: time_filter[1].toDate().getTime() / 1000
    }
  }

  switch (time_filter) {
    case TIMES.TODAY:
      return {
        begin_ts: TIME_CONST.todayStartSec,
        end_ts: TIME_CONST.tomorrowStartSec - 1
      }
    case TIMES.YESTERDAY:
      return {
        begin_ts: TIME_CONST.yesterdayStartSec,
        end_ts: TIME_CONST.todayStartSec - 1
      }
  }

  if (typeof time_filter === 'number' && time_filter >= 0 || time_filter instanceof Date) {
    return ensureMoment(time_filter)
  } else if (isTimeRangeStr(time_filter)) { // deal with timeRange based string from localStorage
    let [beginDateStr, endDateStr] = time_filter.split(','),
        begin_ts = moment(beginDateStr).toDate().getTime() / 1000,
        end_ts = moment(endDateStr).toDate().getTime() / 1000 - 1

    return {
      begin_ts,
      end_ts
    }
  }
}

export const timeRangeStrSplit = (time_filter) => {
  if (typeof time_filter === 'string' && time_filter.indexOf(',')) { // deal with timeRange based string from localStorage
    let [beginDateStr, endDateStr] = time_filter.split(','),
        begin_ts = moment(beginDateStr),
        end_ts = moment(endDateStr).second(-1)

    time_filter = [
      begin_ts,
      end_ts
    ]
  }

  return time_filter
}

export const isTimeRangeStr = (time_filter) => {
  return typeof time_filter === 'string' && time_filter.indexOf(',') >= 0
}

export const computeTimeFilterDesc = (time_filter) => {
  if (isTimeRangeStr(time_filter)) {
    time_filter = timeRangeStrSplit(time_filter)
  }

  switch (time_filter) {
    case TIMES.TODAY:
      return '今日'
    case TIMES.YESTERDAY:
      return '昨日'
    case 'custom':
      return '自定义'
    default:
      let [startDate, endDate] = time_filter || []

      if (startDate instanceof moment && endDate instanceof moment) {
        let diff = startDate.diff(endDate),
            inOneDay = diff < 0 && diff >= -(TIME_CONST.daySecOffset * 1000)

        // TODO: 优化, 对昨日和今日(包括后续的特定内容) 显示对应日子
        let startSec = startDate.toDate().getTime() / 1000,
            endSec = endDate.toDate().getTime() / 1000,
            startFromToday = startSec - TIME_CONST.todayStartSec >= 0 && startSec - TIME_CONST.todayStartSec < TIME_CONST.daySecOffset,
            startFromYesterday = !startFromToday && TIME_CONST.yesterdayStartSec - startSec <= 0 && startSec - TIME_CONST.yesterdayStartSec < TIME_CONST.daySecOffset,
            endAtToday = endSec - TIME_CONST.tomorrowStartSec < 0 && endSec - TIME_CONST.todayStartSec > 0,
            endAtYesterday = !endAtToday && endSec - TIME_CONST.todayStartSec < 0 && endSec - TIME_CONST.yesterdayStartSec > 0

        if (inOneDay) {
          if (startFromToday) {
            return '今日'
          } else if (startFromYesterday) {
            return '昨日'
          }

          return `${startDate.format('YYYY.MM.DD')}`
        }

        let startDesc = startFromYesterday ? '昨日' : startFromToday ? '今日' : `${startDate.format('YYYY.MM.DD')}`
        let endDesc = endAtToday ? '今日' : endAtYesterday ? '昨日' : `${startDate.format('YYYY.MM.DD')}`

        return `${startDesc} ~ ${endDesc}`
      }

      return '自定义'
  }
}

/**
 * generator of time Range
 *
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export const timeRangeGen = (params = {}) => {
  let { begin_time = new Date().getTime() - 86400 * 1000, end_time = new Date() } = params || {}

  begin_time = ensureMoment(begin_time)
  end_time = ensureMoment(end_time)

  return {
    begin_time,
    end_time
  }
}

/**
 * make sure one object a moment instance
 *
 * @param  {timestamp, Date} time [description]
 *
 * @return {[type]}      [description]
 */
export const ensureMoment = (time) => {
  if ((typeof time !== 'number' || time < 0) || !(time instanceof Date)) {
    console.warn('you should give one valid timestamp or Date Object')
    return new Error('you should give one valid timestamp or Date Object')
  }

  return time instanceof moment ? time : moment(time)
}
