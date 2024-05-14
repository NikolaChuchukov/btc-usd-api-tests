const { coinGeckoUrl } = require("./config");

class Helper {
  static getAvgPrice(list) {
    // Check if the list is empty
    if (list.length === 0) {
      return 0;
    }

    // Calculate the sum of all values in the list
    const sum = list.reduce((acc, value) => acc + value, 0);

    // Calculate the average by dividing the sum by the number of elements
    const average = sum / list.length;

    return average;
  }

  static calculatePercentage(initialPrice, currentPrice) {
    // Calculate the absolute change in price
    const priceChange = currentPrice - initialPrice;

    // Calculate the percentage change
    const percentageChange = (priceChange / initialPrice) * 100;

    // Return the percentage change
    return percentageChange;
  }

  static async getBitcoinPriceGecko() {
    try {
      const response = await fetch(
        coinGeckoUrl
      );
      const data = await response.json();
      console.log("data is ", data);
      console.log("Data BTC usd price:", data.bitcoin.usd);
      return data.bitcoin.usd;
    } catch (error) {
      console.error("Error fetching BTC price:", error);
    }
  }

  static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

module.exports = Helper;
