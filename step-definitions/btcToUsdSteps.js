const { Given, When, Then } = require("@cucumber/cucumber");
const Helper = require("../common/helper");

let btcInitialPriceFromApi = 0;
let btcPrices = [];

Given(
    "The target api url is responsive",
    { timeout: 60 * 1000 },
    async function () {
        await fetch('https://www.google.com/finance/quote/BTC-USD')
        .then(response => {
            // Check if response status is 200
            console.log("status code is " + response.status)
            if (response.status === 200){
                 throw new Error("API is responsive")
                }else {
                    throw new Error ("Api is not responsive")
                }
        })
        .catch(error => {
            console.error('Error occurred while fetching API endpoint:', error);
        });
    }
  );

  Given(
    "A baseline price is recorded",
    { timeout: 60 * 1000 },
    async function () {
        btcInitialPriceFromApi = await Helper.getBitcoinPriceGecko;
        console.log("Bitcoin baseline price is: " + btcPriceFromApi)
    }
  );

  When(
    "The price is checked every {int} seconds for {int} minutes",
    { timeout: 600 * 1000 },
    async function (seconds, minutes) {
        while (i < (minutes * 60) / seconds) {
            await sleep(seconds * 1000);
            let btcPriceInInt = await Helper.getBitcoinPriceGecko;
            console.log(btcPriceInInt)
            btcPrices.push(btcPriceInInt);
            i++;
          }
          console.log(btcPrices)
    }
  );
  
  Then(
    "The avarage price difference for {int} minutes is less than {int}%",
    { timeout: 600 * 1000 },
    function (minutes, percent) {
        avgPrice = Helper.getAvgPrice(btcPrices);
        console.log("Avg price is ", avgPrice);
        percentageDiff = Helper.calculatePercentage(initialPrice, avgPrice);
        console.log("Percentage diff is ", percentageDiff);
        if( percentageDiff >= percent && percentageDiff <= -percent){ 
          throw new Error("Percentage difference for the time period of " + minutes + " minutes is more than " + percent + "%");
        }
    }
  );