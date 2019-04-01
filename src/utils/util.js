export function formatDate(date) {
  if (typeof date === 'string') {
    return formatDate2(date)
  }
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate()
  d = d < 10 ? '0' + d : d
  return y + '-' + m + '-' + d
}
export function formatDate2(date) {
  var y = date.substring(0, 4)
  var m = date.substring(5, 7)
  var d = date.substring(8, 10)

  return y + '-' + m + '-' + d
}
