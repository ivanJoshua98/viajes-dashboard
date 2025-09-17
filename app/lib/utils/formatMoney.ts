
export function formatMoney(cents: number, locale = 'es-AR'): string {
  const amount = cents / 100;

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(amount);
}
