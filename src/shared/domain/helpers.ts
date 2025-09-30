export function isInvalidDate(d: Date) {
  return isNaN(d.getTime());
}
