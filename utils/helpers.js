export const getDiscountedPrice = (originalPrice, distcountedPrice) => {
  const discount = originalPrice - distcountedPrice;

  const distcountePercentage = (discount / originalPrice) * 100;
  return distcountePercentage.toFixed(2);
};
