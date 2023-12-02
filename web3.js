const { Web3 } = require('web3')

// Connect to BSC node
const web3 = new Web3('https://bsc-dataseed.binance.org/')

const USDT = 30

// Fetch gas price
web3.eth.getGasPrice().then((gasPrice) => {
    console.log('Current gas price on BSC:', web3.utils.fromWei(gasPrice, 'gwei'), 'gwei')

    // Example: Calculate total
    const total = web3.utils.toWei((USDT).toString(), 'tether') + (gasPrice)
    console.log('Total transaction cost:', web3.utils.fromWei(total, 'tether'), 'tether')
}).catch((error) => {
    console.error('Error fetching gas price:', error)
})
