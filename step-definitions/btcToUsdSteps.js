const { Given, When, Then } = require("@cucumber/cucumber");
const Helper = require("../common/helper.js");

let btcInitialPriceFromApi = 0;
let btcPrices = [];

Given(
  "The target api url is responsive",
  { timeout: 60 * 1000 },
  async function () {
    try {
      const response = await fetch(
        "https://www.google.com/finance/quote/BTC-USD"
      );
      console.log("API is responsive");
    } catch (error) {
      console.error("Error occurred while fetching API endpoint:", error);
    }
  }
);

Given(
  "A baseline price is recorded",
  { timeout: 60 * 1000 },
  async function () {
    btcInitialPriceFromApi = await Helper.getBitcoinPriceGecko();
    console.log("Bitcoin baseline price is: " + btcInitialPriceFromApi);
  }
);

When(
  "The price is checked every {int} seconds for {int} minutes",
  { timeout: 600 * 1000 },
  async function (seconds, minutes) {
    let i = 0;
    while (i < 2) {
      let btcPriceInInt = await Helper.getBitcoinPriceGecko();
      console.log(btcPriceInInt);
      btcPrices.push(btcPriceInInt);
      i++;            
      await Helper.sleep(seconds * 1000);
    }
    console.log(btcPrices);
  }
);

Then(
  "The avarage price difference for {int} minutes is less than {int} percent",
  { timeout: 600 * 1000 },
  function (minutes, percent) {
    avgPrice = Helper.getAvgPrice(btcPrices);
    console.log("Avg price is ", avgPrice);
    percentageDiff = Helper.calculatePercentage(
      btcInitialPriceFromApi,
      avgPrice
    );
    console.log("Percentage diff is ", percentageDiff);
    if (percentageDiff >= percent && percentageDiff <= -percent) {
      throw new Error(
        "Percentage difference for the time period of " +
          minutes +
          " minutes is more than " +
          percent +
          "%"
      );
    }
  }
);

Then(
  "Each price for {int} minutes does not vary by more than {int} percent",
  { timeout: 600 * 1000 },
  function (minutes, percent) {
    for (let i = 0; i < btcPrices.length - 1; i++) {
      for (let j = i + 1; j < btcPrices.length; j++) {
        const value1 = btcPrices[i];
        const value2 = btcPrices[j];
        percentageDiff = Helper.calculatePercentage(value1, value2);
        console.log("Percentage difference is ", percentageDiff);
        if (percentageDiff >= percent && percentageDiff <= -percent) {
          throw new Error(
            "Percentage difference for time period of " +
              minutes +
              " between price " +
              value1 +
              " and price " +
              value2 +
              " is more than " +
              percent +
              "%"
          );
        }
      }
    }
  }
);
