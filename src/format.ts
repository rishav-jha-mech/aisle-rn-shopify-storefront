type Money = { amount: string; currencyCode: string };

const formatters = new Map<string, Intl.NumberFormat>();

export function formatMoney({ amount, currencyCode }: Money) {
  let formatter = formatters.get(currencyCode);
  if (!formatter) {
    formatter = new Intl.NumberFormat(undefined, { style: 'currency', currency: currencyCode });
    formatters.set(currencyCode, formatter);
  }
  return formatter.format(Number(amount));
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function humanize(value: string | null | undefined) {
  if (!value) return '';
  return value.charAt(0) + value.slice(1).toLowerCase().replace(/_/g, ' ');
}
