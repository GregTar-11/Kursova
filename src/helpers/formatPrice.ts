export const formatPrice = (price: number) =>
  new Intl.NumberFormat('uk-UA').format(price);
