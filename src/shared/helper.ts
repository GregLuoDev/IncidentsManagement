export function formatLocalDateTime(isoString: string) {
  return new Date(isoString).toLocaleString(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

export function formatLocalName(locationName: string) {
  return locationName
    .split('/')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
