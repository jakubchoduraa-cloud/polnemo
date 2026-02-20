export function formatCzk(input: number): string {
  const rounded = Math.round(input / 1000) * 1000;
  const formatted = new Intl.NumberFormat("cs-CZ").format(rounded);
  return `${formatted},-`;
}

export function rangeCzk(min: number, max: number): string {
  return `${formatCzk(min)} - ${formatCzk(max)}`;
}
