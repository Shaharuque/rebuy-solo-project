export const priceExtraction = (text: string): string => {
  const rangeMatch = text.match(/\$\d+/g);

  if (!rangeMatch) {
    const newResult = text.match(/\b\d+−\d+\b/);
    if (newResult) {
      const newPrice = newResult[0].split("−");
      const result = `${parseInt(newPrice[0]) * 107}-${
        parseInt(newPrice[1]) * 107
      }`;
      return result;
    } else {
      const priceRegex = /\d+\.\d+/g;

      const pricesArray = text.match(priceRegex);

      if (pricesArray && pricesArray.length > 0) {
        return `${parseInt(pricesArray[0]) * 107}`;
      } else {
        return "0";
      }
    }
  }
  return `${parseInt(rangeMatch[0]) * 107}`;
};
