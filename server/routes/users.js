var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.json(
    {
      forecastTableIsOpen: false,
      forecast: [],
      stocks: {
        KO: {
          symbol: 'KO',
          market_price: 0,
          dividend_percentage: 0,
          growth: 0
        },
        MCD: {
          symbol: 'MCD',
          market_price: 0,
          dividend_percentage: 0,
          growth: 0
        },
        T: {
          symbol: 'T',
          market_price: 0,
          dividend_percentage: 0,
          growth: 0
        },
        CTL: {
          symbol: 'CTL',
          market_price: 0,
          dividend_percentage: 0,
          growth: 0
        }
      },
      purchases: {
        purchase1: {
          symbol: 'KO',
          share: 44,
          entry_price: 33.01
        },
        purchase2: {
          symbol: 'MCD',
          share: 17,
          entry_price: 81.02
        },
        purchase3: {
          symbol: 'T',
          share: 124,
          entry_price: 28.9075
        },
        purchase4: {
          symbol: 'KO',
          share: 106,
          entry_price: 34.335
        },
        purchase5: {
          symbol: 'CTL',
          share: 41,
          entry_price: 34.61
        },
        purchaseOrder: ['purchase1', 'purchase2', 'purchase3', 'purchase4', 'purchase5']
      }
    }
  );
});

module.exports = router;
