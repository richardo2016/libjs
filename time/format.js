import moment from 'moment'

export const dayStart = (momentSrc) => {
  return moment(momentSrc).hour(0).minute(0).second(0).millisecond(0)
}

export const dayEnd = (momentSrc) => {
  return moment(momentSrc).hour(+24).minute(0).second(-1).millisecond(0)
}
