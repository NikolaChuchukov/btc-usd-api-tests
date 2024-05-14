Feature: Check the BTC to USD price for a given period of time

Background:
    Given The target api url is responsive

@AvaragePrice
Scenario Outline: Verify the avg percentage difference for a given time is less than 1%
    Given A baseline price is recorded
    When The price is checked every 10 seconds for <minute> minutes
    Then The avarage price difference for <minute> minutes is less than 1%

    Examples:
        |minute |
        |1      |

@EachPrice
Scenario Outline: Verify the price difference for a given time is less than 2%
    When The price is checked every 10 seconds for <minutes> minutes
    Then Each price for <minutes> minutes does not vary by more than 2 percent

    Examples:
        |minutes|
        |1      |