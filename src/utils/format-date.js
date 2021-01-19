import dayjs from 'dayjs'

export function getNowData({ format = 'YYYY', month = 4 }) {
  return dayjs().month(month).format(format)
}
