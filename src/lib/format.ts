// Dates are stored as ISO day strings (2024-09-15); format in UTC so the
// rendered day never shifts with the server's timezone.
export function formatDate(iso: string, month: 'short' | 'long' = 'short'): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    year: 'numeric',
    month,
    day: 'numeric',
    timeZone: 'UTC',
  })
}
