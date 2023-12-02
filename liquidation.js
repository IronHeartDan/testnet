const Binance = require('binance-api-node').default;

const URL = "https://testnet.binancefuture.com";
const WS = "wss://testnet.binancefuture.com/ws";
const apiKey = '0410e1783cfcbbf8d79ce965a7a6a276a91e8a9d1c52cc000cdd1c283a4a485c'
const apiSecret = 'a59d8169920b36d7e2e184edabb5baf268a078c89a192837ff9111a65652b558'

const binance = Binance({
  apiKey: apiKey,
  apiSecret: apiSecret,
  httpFutures: URL,
  wsFutures: WS
});

function calculateLiquidationPrice(
  WB,              // Wallet Balance
  TMM1,            // Maintenance Margin of all other contracts, excluding Contract 1
  UPNL1,           // Unrealized PNL of all other contracts, excluding Contract 1
  cumB,            // Maintenance Amount of BOTH position (one-way mode)
  cumL,            // Maintenance amount of LONG position (hedge mode)
  cumS,            // Maintenance amount of SHORT position (hedge mode)
  Side1BOTH,       // Direction of BOTH position, 1 as long position, -1 as short position
  Position1BOTH,   // Absolute value of BOTH position size (one-way mode)
  EP1BOTH,         // Entry Price of BOTH position (one-way mode)
  Position1LONG,   // Absolute value of LONG position size (hedge mode)
  EP1LONG,         // Entry Price of LONG position (hedge mode)
  Position1SHORT,  // Absolute value of SHORT position size (hedge mode)
  EP1SHORT,        // Entry Price of SHORT position (hedge mode)
  MMRB,            // Maintenance margin rate of BOTH position (one-way mode)
  MMRL,            // Maintenance margin rate of LONG position (hedge mode)
  MMRS             // Maintenance margin rate of SHORT position (hedge mode)
) {
  const liquidationPrice =
    (WB - TMM1 + UPNL1 + cumB + cumL + cumS - Side1BOTH * Position1BOTH * EP1BOTH - Position1LONG + Position1SHORT * EP1SHORT) /
    (Position1BOTH * MMRB + Position1LONG * MMRL + Position1SHORT * MMRS - Side1BOTH * Position1BOTH - Position1LONG + Position1SHORT);

  return liquidationPrice;
}

function getMaintMarginRatio(positionValue) {
  if (positionValue >= 0 && positionValue <= 50000) {
    return 0.004; // 0.40%
  } else if (positionValue > 50000 && positionValue <= 250000) {
    return 0.005; // 0.50%
  } else if (positionValue > 250000 && positionValue <= 3000000) {
    return 0.01; // 1.00%
  } else if (positionValue > 3000000 && positionValue <= 20000000) {
    return 0.025; // 2.50%
  } else if (positionValue > 20000000 && positionValue <= 40000000) {
    return 0.05; // 5.00%
  } else if (positionValue > 40000000 && positionValue <= 100000000) {
    return 0.10; // 10.00%
  } else if (positionValue > 100000000 && positionValue <= 120000000) {
    return 0.125; // 12.50%
  } else if (positionValue > 120000000 && positionValue <= 200000000) {
    return 0.15; // 15.00%
  } else if (positionValue > 200000000 && positionValue <= 300000000) {
    return 0.25; // 25.00%
  } else if (positionValue > 300000000 && positionValue <= 500000000) {
    return 0.50; // 50.00%
  } else {
    // Default case for positions exceeding the specified ranges
    return 0.01; // 1.00%
  }
}


async function fetchAndCalculate() {
  try {


    const accountInfo = await binance.futuresAccountInfo();
    const totalWalletBalance = parseFloat(accountInfo.totalWalletBalance);
    console.log('Total Wallet Balance:', totalWalletBalance);
    const positions = accountInfo.positions.filter(
      position => parseFloat(position.positionAmt) !== 0
    );

    const maintenanceMarginAllOthers = positions
      .filter(position => position.symbol !== 'BTCUSDT') // Exclude Contract 1
      .reduce((sum, position) => sum + parseFloat(position.maintMargin), 0);

    const unrealizedPNLAllOthers = positions
      .filter(position => position.symbol !== 'BTCUSDT') // Exclude Contract 1
      .reduce((sum, position) => sum + parseFloat(position.unrealizedProfit), 0);

    // console.log('Fetched Positions:', positions);

    positions.forEach(position => {

      const liquidationPrice = calculateLiquidationPrice(
        totalWalletBalance,
        maintenanceMarginAllOthers,
        unrealizedPNLAllOthers,
        parseFloat(position.maintMargin),
        0,
        0,
        1,
        parseFloat(position.positionAmt),
        parseFloat(position.entryPrice),
        0,
        0,
        0,
        0,
        getMaintMarginRatio(parseFloat(position.notional)), // Use position value to get maintMarginRatio
        0,
        0
      );

      console.log(`Liquidation Price for ${position.symbol}: ${liquidationPrice.toFixed(2)}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchAndCalculate();


// Example usage for ETHUSDT
// const liquidationPriceETH = calculateLiquidationPrice(
//   1535443.01,
//   71200.81144,
//   -56354.57,
//   135365,
//   0,
//   0,
//   1,
//   3683.979,
//   1456.84,
//   0,
//   0,
//   0,
//   0,
//   0.10,
//   0,
//   0
// );

// console.log('Liquidation Price for ETHUSDT:', liquidationPriceETH.toFixed(2));