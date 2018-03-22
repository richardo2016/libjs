import 'core-js/modules/es7.string.pad-start'
import 'core-js/modules/es7.string.pad-end'

export function ensureDate (dateInstance) {
  if (!dateInstance) return
  if (dateInstance instanceof Date) return dateInstance
  dateInstance = new Date(dateInstance)
  if (dateInstance + '' === 'Invalid Date') return
  else if (isNaN(dateInstance.valueOf())) return

  return dateInstance
}

export function padMonth (string) {
  string = string + ''
  return string.padStart(2, '0')
}

export function padDate (string) {
  string = string + ''
  return string.padStart(2, '0')
}

export const padHours = padDate
export const padMiniutes = padDate
export const padSeconds = padDate

export function padMilliseconds (string) {
  string = string + ''
  return string.padStart(3, '0')
}

export function slashLocalDateTime (date) {
  if (!(date = ensureDate(date))) return
  return `${date.getFullYear()}/${padMonth(date.getMonth() + 1)}/${padDate(date.getDate())}`
}

export function kebabLocalDateTime (date) {
  if (!(date = ensureDate(date))) return
  return `${date.getFullYear()}-${padMonth(date.getMonth() + 1)}-${padDate(date.getDate())}`
}

export function getDiffDays (beginTime, endTime) {
  if (!(beginTime = ensureDate(beginTime)) || !(endTime = ensureDate(endTime))) {
    return 0
  }
  let diffMs = endTime - beginTime
  return Math.floor(diffMs / (86400 * 1e3))
}

/**
 * @brief parse one Date(if it is)
 *
 * @param  date: valid date descriptor
 * @return parsed data
 */
export function parseDate (date) {
  if (!(date = ensureDate(date))) return

  return {
    padded_year: date.getFullYear() + '',
    padded_month: padMonth(date.getMonth() + 1),
    padded_date: padDate(date.getDate()),
    padded_hours: padHours(date.getHours()),
    padded_minutes: padMiniutes(date.getMinutes()),
    padded_seconds: padSeconds(date.getSeconds()),
    padded_milliseconds: padMilliseconds(date.getMilliseconds())
  }
}