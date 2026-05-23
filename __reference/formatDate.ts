export const formatActivityDate = (
  isoString: string | null | undefined,
): string => {
  if (!isoString) return '—';

  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(date);
};
