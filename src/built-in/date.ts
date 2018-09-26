function padStart(str = '', len = 0, fill = '0') {
  while(str.length < len) {
    str = fill + str
  }

  return str
}

export function ensureDate (dateInstance: any) {
  if (dateInstance === null || dateInstance === undefined) return

  if (dateInstance instanceof Date) return dateInstance
  dateInstance = new Date(dateInstance)
  if (dateInstance + '' === 'Invalid Date') return
  else if (isNaN(dateInstance.valueOf())) return

  return dateInstance
}

export function padMonth (string: string) {
  string = string + ''
  return padStart(string, 2, '0')
}

export function padDate (string: string) {
  string = string + ''
  return padStart(string, 2, '0')
}

export const padHours = padDate
export const padMiniutes = padDate
export const padSeconds = padDate

export function padMilliseconds (string: string) {
  string = string + ''
  return padStart(string, 3, '0')
}

/**
 * @brief parse one Date(if it is)
 *
 * @param  date: valid date descriptor
 * @return parsed data
 */
export function parseDate (date: any) {
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

export function slashLocalDate (date: any) {
  if (!(date = ensureDate(date))) return
  return `${date.getFullYear()}/${padMonth(date.getMonth() + 1)}/${padDate(date.getDate())}`
}

export function kebabLocalDate (date: any) {
  if (!(date = ensureDate(date))) return
  return `${date.getFullYear()}-${padMonth(date.getMonth() + 1)}-${padDate(date.getDate())}`
}

export function getDiffDays (beginTime: any, endTime: any) {
  if (!(beginTime = ensureDate(beginTime)) || !(endTime = ensureDate(endTime))) {
    return 0
  }
  let diffMs = endTime - beginTime
  return Math.floor(diffMs / (86400 * 1e3))
}

export function zoneOffsetInfo (datetime: any = new Date) {
  datetime = ensureDate(datetime)
  if (!datetime) return null
  const offsetMinutes = datetime.getTimezoneOffset()

  return {
    offset_hours: offsetMinutes / 60,
    offset_minutes: offsetMinutes,
    offset_seconds: offsetMinutes * 60,
    offset_milliseconds: offsetMinutes * 60 * 1000,
  }
}
