const { config } = require("chai");
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


  async getBitcoinPriceGecko (){   
    fetch(coinGeckoUrl)
        .then(response => {
          // Check if the response is successful
          if (!response.ok) {
            throw new Error('Failed to fetch BTC price');
          }
          // Parse the response as JSON
          return response.json();
        })
        .then(data => {
          // Extract the BTC price from the response
          const btcPrice = data.bitcoin.usd;
          console.log('BTC price:', btcPrice);
        })
        .catch(error => {
          console.error('Error fetching BTC price:', error);
        });
        return btcPrice
    }
}

module.exports = Helper;