export const priceExtraction = (text: string): string => {
    const rangeMatch = text.match(/\$\d+/g);
  
    if (!rangeMatch) {
      const newResult = text.match(/\b\d+−\d+\b/);
      if (newResult) {
        const newPrice = newResult[0].split("−");
        const result = `${parseInt(newPrice[0]) * 107}Tk-${parseInt(newPrice[1]) * 107}Tk`;
        return result;
      } else {
        return (Math.floor(Math.random() * (200 - 50 + 1)) + 50).toString();
      }
    }
    return `${parseInt(rangeMatch[0]) * 107}Tk`;
  };
  