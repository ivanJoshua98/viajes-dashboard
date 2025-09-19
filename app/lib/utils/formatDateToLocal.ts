
export function formatDateToLocal ( date: Date ) {
  return date.toLocaleString('es-AR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour12: false,
    timeZone: 'America/Argentina/Buenos_Aires',
  });
};