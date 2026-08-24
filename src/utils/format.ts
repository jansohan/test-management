export function formatDate(iso?: string): string {
  if (!iso) return '-';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function toSelectOption(value: string) {
  return {
    value: value.toLowerCase().replace(/\s+/g, '-'),
    label: value,
  };
}
