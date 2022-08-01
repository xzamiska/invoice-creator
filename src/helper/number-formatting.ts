export const formatNumber = (val: number): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(val);
};
