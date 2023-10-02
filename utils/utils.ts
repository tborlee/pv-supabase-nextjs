export function withDiffMonths(diff: number) {
  const date = new Date();
  date.setMonth(date.getMonth() + diff);
  return date.toISOString().substring(0, 10);
}