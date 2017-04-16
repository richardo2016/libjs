import moment from 'moment'

export const descriptors = {
  YESTERDAY: 'YESTERDAY',
  TODAY: 'TODAY',
  TOMORROW: 'TOMORROW'
}

export const TIME_CONST = {
  todayStart: moment().hour(0).minute(0).second(0).millisecond(0),
  yesterdayStart: moment().hour(-24).minute(0).second(0).millisecond(0),
  tomorrowStart: moment().hour(+24).minute(0).second(0).millisecond(0),

  hourSecOffset: 60 * 60,
  daySecOffset: 60 * 60 * 24
}

TIME_CONST.todayStartSec = TIME_CONST.todayStart.toDate().getTime() / 1000
TIME_CONST.yesterdayStartSec = TIME_CONST.yesterdayStart.toDate().getTime() / 1000
TIME_CONST.tomorrowStartSec = TIME_CONST.tomorrowStart.toDate().getTime() / 1000
