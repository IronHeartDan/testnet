const Binance = require('binance-api-node').default
const crypto = require('crypto')
const axios = require('axios')

const URL = "https://testnet.binancefuture.com"
const WS = "wss://testnet.binancefuture.com/ws"


// TestNet
// const apiKey = '578edce32d57b528d3888a676d91769d09eadcaa437ff74818ddc37fddd5259c'
// const apiSecret = 'fb7587d158674da13167481efe97c78f485c2f8fd5008c40e017ce8446e0307c'


// CX Acc (Live)
const apiKey = 'AS8PA7lD2iIyYMDcGJmOyYs9NO2WYWeMyiPV0r1O4itWdFu1yymxqGZgrQsOh0Hl'
const apiSecret = 'WTBkQkjA2JLd213yjo6a1ytvMOvkNXzmrGERcLaycdyiXEkOhDMtIJyNX5kniRfb'

// const apiKey = 'Iyrib0GkZYNiB12QTPP4XvmXI3nL37LPyh0OUhScKuf1Lc5iksp7YkEKbzrHDbLi';
// const apiSecret = 'mvTnxokjvu2Ow26IJJkq4gnzFJ5PgblYw6LFVG171fgvEcfPtH0nTwG4GUTIR0F9';

// const apiKey = GcHB3GDz3wVrrdldd7T02WUKlK4iVzzmNTV5bfjVusluWGc7YtOrch72gIQxu3g0;
// const apiSecret = dOHsIQKC2x2dhU8I0aXoQlrkRJL93BNuZ4edujJk3KuDPboNSZl6D8naoA6u5iTu;


const client = Binance({
  apiKey: apiKey,
  apiSecret: apiSecret,
  httpFutures: URL
});

// const client = Binance()


const symbol = 'BTCUSDT';
const side = 'BUY'; // Replace with 'SELL' if you want to sell BTC
const quantity = 1; // Replace with the desired quantity of BTC
const price = 30000; // Replace with the desired price for the limit order

var currentSymbolStatus = {
  eventType: null,
  eventTime: null,
  symbol: null,
  aggId: null,
  price: null,
  quantity: null,
  firstId: null,
  lastId: null,
  timestamp: null,
  isBuyerMaker: null
};

// Limit Order
// (async () => {

//   try {
//     const order = await client.futuresOrder({
//       symbol: symbol,
//       side: side,
//       quantity: quantity,
//       type: 'LIMIT',
//       price: price,
//       timeInForce: 'GTC',
//     })

//     console.log("Sucess", order);
//   } catch (error) {
//     console.log(error);
//   }

// })()

// Market Order
// (async () => {

//   try {
//     const order = await client.futuresOrder({
//       symbol: symbol,
//       type: 'MARKET',
//       side: side,
//       quantity: quantity
//     })

//     console.log("Sucess", order);
//   } catch (error) {
//     console.log(error);
//   }

// })()


// Stop Limit Order
// (async () => {

//   try {
//     const order = await client.futuresOrder({
//       symbol: symbol,
//       type: 'STOP',
//       side: side,
//       quantity: quantity,
//       price: price,
//       stopPrice: 30200,
//       timeInForce: 'GTC',
//     })

//     console.log("Sucess", order);
//   } catch (error) {
//     console.log(error);
//   }

// })()

// Cancle Order //
// (async () => {

//   try {
//     const res = await client.futuresCancelOrder({
//       symbol: 'BTCUSDT',
//       orderId: 3412362590,
//     });
//     console.log("Sucess", res);
//   } catch (error) {
//     console.log(error);
//   }

// })()


// Fetch Open Orders
// (async () => {

//   const orders = await client.futuresOpenOrders({
//     symbol: symbol,
//   });
//   console.log(orders);

// })()


// Fetch Current Open Positions
// (async () => {
//   try {
//     const positions = await client.futuresPositionRisk();
//     const openPositions = positions.filter(position => parseFloat(position.positionAmt) !== 0);
//     console.log(openPositions);
//   } catch (error) {
//     console.error('Error fetching positions:', error);
//   }
// })();

// Live Orders
// (() => {
//   client.ws.futuresUser((msg) => {
//     console.clear();
//     console.log(msg.eventType);
//   })

// client.ws.futuresLiquidations(symbol, (forceOrder) => {
//   console.clear();
//   console.log(forceOrder);
// })

// client.ws.futuresAllLiquidations((forceOrder) => {
//   console.clear();
//   console.log(forceOrder);
// })

// })()

// Live Symbol Price
// (async() => {
// client.ws.futuresAggTrades(symbol, (trade) => {
//   currentSymbolStatus = trade;
// })
// const res = await client.futuresAggTrades({symbol:symbol,limit:5})
// console.log(res.reverse()[0]);
// })();


// Order Book

// (async () => {
//   const res = await client.futuresBook({ symbol: "BNXUSDT", limit: 10 })
//   console.log(res);
//   const asksArray = res.asks.map((entry) => [parseFloat(entry.price), parseFloat(entry.quantity)])
//   const bidsArray = res.bids.map((entry) => [parseFloat(entry.price), parseFloat(entry.quantity)])
//   console.log({ a: asksArray, b: bidsArray })
// })();

// Live Order Book
// (() => {
//   client.ws.futuresPartialDepth({ symbol: symbol, level: 10 }, (depth) => {

//     let cumulativeSumBids = 0;
//     const totalBidsVolume = depth.bidDepth.reduce((sum, bid) => sum + parseFloat(bid.quantity), 0);
//     const bidDepth = depth.bidDepth.map((bid) => {
//       const priceInBTC = parseFloat(bid.price) / parseFloat(currentSymbolStatus.price);
//       cumulativeSumBids += priceInBTC * parseFloat(bid.quantity);
//       bid.sumInBTC = cumulativeSumBids;

//       // Calculate the percentage for the depth bar
//       bid.percentage = (parseFloat(bid.quantity) / totalBidsVolume) * 100;
//       return bid;
//     });


//     let cumulativeSumAsks = 0;
//     const totalAsksVolume = depth.askDepth.reduce((sum, bid) => sum + parseFloat(bid.quantity), 0);
//     const askDepth = depth.askDepth.map((ask) => {
//       const priceInBTC = parseFloat(ask.price) / parseFloat(currentSymbolStatus.price);
//       cumulativeSumAsks += priceInBTC * parseFloat(ask.quantity);
//       ask.sumInBTC = cumulativeSumAsks;

//       // Calculate the percentage for the depth bar
//       ask.percentage = (parseFloat(ask.quantity) / totalAsksVolume) * 100;
//       return ask;
//     });

//     console.clear();
//     // console.log(`Order Book for Symbol: ${symbol}`);
//     // console.log('Asks:', askDepth);
//     console.log('Bids:', bidDepth);
//   });
// })();


// Account Info
(async () => {
  // const res = await client.futuresAccountBalance()
  // console.log(res);


  // const res = await client.accountInfo()
  // console.log(res);
  // const res = await client.futuresAccountInfo()
  // console.log(res.availableBalance);

  // const totalUnrealizedPNL = res.positions.filter((position => parseFloat(position.positionAmt) !== 0))
  //   .reduce((sum, position) => sum + parseFloat(position.unrealizedProfit), 0);
  // const availableBalance = Number(res.totalWalletBalance) - Number(res.totalInitialMargin) + totalUnrealizedPNL
  // console.log(availableBalance);

  // const data = {
  //   "Balance": res.totalWalletBalance,
  //   "Available": res.availableBalance,
  //   "Initial Margin": res.totalInitialMargin,
  //   "PNL": res.totalUnrealizedProfit
  // }
  // console.table(data)

  // const assets = res.assets.filter(asset => parseFloat(asset.crossWalletBalance) !== 0);
  // console.log("Assets :", assets);
  // const openPositions = res.positions.filter(position => position.symbol === symbol);
  // console.log("Positions : ", openPositions);

})();

// Acc Margin

// (async () => {
//   try {
//     const res = await client.futuresMarginType({ symbol: symbol, marginType: 'ISOLATED' })
//     console.log(res)
//   } catch (error) {
//     console.log(error);
//   }
// })();


// Exchange Info
// (async () => {
//   const exchangeInfo = await client.futuresExchangeInfo();
//   const symbolInfo = exchangeInfo.symbols.filter((s) => s.status === 'TRADING' && s.contractType === 'PERPETUAL');
//   console.log(symbolInfo.filter(s => s.symbol === symbol))
// // const minPrice = parseFloat(symbolInfo.filters.find((f) => f.filterType === 'PRICE_FILTER').minPrice);
// // const minQty = parseFloat(symbolInfo.filters.find((f) => f.filterType === 'LOT_SIZE').minQty);
// // const tickSize = parseFloat(symbolInfo.filters.find((f) => f.filterType === 'PRICE_FILTER').tickSize);
// // console.log(minPrice, minQty, tickSize);
// })();

// Trade History
// (async () => {
//   const res = await client.futuresAggTrades({ symbol: symbol, limit: 10 })
//   console.log(res.reverse()[0]);
// })();


// Daily Stats
// (async () => {
//   const res = await client.dailyStats()
//   if (Array.isArray(res)) {
//     console.log(res[0]);
//   }
// })()


// Position Leverage
// (async () => {
//   const res = await client.futuresLeverageBracket({ symbol: symbol })
//   console.log(res[0])

//   // await client.futuresLeverage({
//   //   symbol: symbol,
//   //   leverage: 20
//   // })
// })()

// Funds transfer
// (async () => {
//   try {
//     // const data = await client.accountInfo()
//     const data = await client.futuresAccountBalance()
//     console.log(data.find((assetBalance) => assetBalance.asset === 'USDT'));

//     // const data = await client.apiPermission()
//     // console.log(data);

//     // SPOT -> USDM Futures
//     // const res = await client.universalTransfer({
//     //   amount: 1,
//     //   asset: 'USDT',
//     //   type: 'MAIN_UMFUTURE',
//     // })
//     // console.log(res);

//     // USDM Futures -> SPOT
//     // const res = await client.universalTransfer({
//     //   amount: 1,
//     //   asset: 'USDT',
//     //   type: 'UMFUTURE_MAIN',
//     // })
//     // console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// })()

// Withdrawal History
// (async () => {
//   const res = await client.withdrawHistory()
//   console.log(res)
// })


function getSignature(query) {
  return crypto
    .createHmac('sha256', apiSecret)
    .update(query)
    .digest('hex');
}

function constructQuery(params) {
  let query = ''
  Object.entries(params).forEach(([key, value]) => {
    query += `${key}=${value}&`;
  })
  return query
}

(async () => {
  try {

    // const endpoint = '/fapi/v1/marginType'
    const endpoint = '/sapi/v1/sub-account/transfer/subUserHistory'

    let params = {
    }

    let query = constructQuery(params)

    query += `timestamp=${new Date().getTime()}`

    const signature = getSignature(query)

    const url = `https://api.binance.com${endpoint}?${query}&signature=${signature}`


    const res = await axios.get(url, {
      headers: {
        "X-MBX-APIKEY": apiKey
      }
    });


    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
})()