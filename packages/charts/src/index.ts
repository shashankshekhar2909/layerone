export const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US', { notation: 'compact' }).format(value);

export const formatCurrency = (value: number, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);

export const formatPercent = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(value);
