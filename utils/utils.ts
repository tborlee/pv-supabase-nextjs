export function withDiffMonths(diff: number) {
  const date = new Date();
  date.setMonth(date.getMonth() + diff);
  return date.toISOString().substring(0, 10);
}

export function formatDate(dateString: string, locale: string = 'fr-BE'): string {
  const parsed = Date.parse(dateString)
  
  if (isNaN(parsed)) {
    return dateString
  }
  
  const date = new Date(parsed)
  return date.toLocaleDateString(locale, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
}