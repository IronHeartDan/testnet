const crypto = require('crypto')
const axios = require('axios')

// const URL = "https://testnet.binancefuture.com/fapi/v1/order";
// const secretKey = 'a59d8169920b36d7e2e184edabb5baf268a078c89a192837ff9111a65652b558';


const binanceBaseUrl = 'https://api.binance.com';

const binanceApiKey =
    '9eHB94i6GoLCerY75OSkYpUlT4Y77zxz7VYfQqIkjd8bh4QwZCXLV63s2X6lMWXZ';
const binanceApiSecret =
    '3J49k3dLBunXiNxMSUy8PspbKKQTXlU77EWAKTgbWUt4dvRo1fcXqzB1cGofkTid';

// const subAccount = '3679485884113516033';


// CX Acc 
// const subApiKey = 'AS8PA7lD2iIyYMDcGJmOyYs9NO2WYWeMyiPV0r1O4itWdFu1yymxqGZgrQsOh0Hl';
// const subApiSecret = 'WTBkQkjA2JLd213yjo6a1ytvMOvkNXzmrGERcLaycdyiXEkOhDMtIJyNX5kniRfb';

const subApiKey = 'Iyrib0GkZYNiB12QTPP4XvmXI3nL37LPyh0OUhScKuf1Lc5iksp7YkEKbzrHDbLi';
const subApiSecret = 'mvTnxokjvu2Ow26IJJkq4gnzFJ5PgblYw6LFVG171fgvEcfPtH0nTwG4GUTIR0F9';
const subAccount = '3463679599460339201';

// Enable Futures -> Update Api Key Permission -> enableSubAccountUniversalTransfer for Key

(async () => {
    createSubAccount()

    // await fetchSubAccountAssets()

    // enableSubAccountFutures()
    // await createApiKey()

    // const keys = await getApiKey()
    // console.log(keys);

    // Enable Futures
    // await enableSubAccountFutures()

    // Grant Permission Of Futures For Existing Key
    // await changeApiKeyPermission(keys[0].apiKey)


    // enableSubAccountUniversalTransfer()
    // performUniversalTransfer()


    // fetchSubAccount()


    // Delete Keys

    // const keys = await getApiKey()
    // keys.forEach((key) => deleteApiKey(key.apiKey))

    // deleteApiKey('')

    // getApiKeyRestriction()

})()


function getSignature(query) {
    return crypto
        .createHmac('sha256', binanceApiSecret)
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

async function createSubAccount() {
    try {

        const endpoint = '/sapi/v1/broker/subAccount'

        let params = {
            makerCommission: 0.001,
            takerCommission: 0.001,
        }

        let query = constructQuery(params)

        query += `timestamp=${new Date().getTime()}`

        const signature = getSignature(query)

        const url = `${binanceBaseUrl}${endpoint}?${query}&signature=${signature}`

        const res = await axios.post(url, null, {
            headers: {
                "X-MBX-APIKEY": binanceApiKey
            }
        });


        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

async function fetchSubAccount() {
    try {

        const endpoint = '/sapi/v1/broker/subAccount'

        let params = {
            subAccountId: subAccount
        }

        let query = constructQuery(params)

        query += `timestamp=${new Date().getTime()}`

        const signature = getSignature(query)

        const url = `${binanceBaseUrl}${endpoint}?${query}&signature=${signature}`

        const res = await axios.get(url, {
            headers: {
                "X-MBX-APIKEY": binanceApiKey
            }
        });


        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

async function fetchSubAccountAssets() {
    try {

        const endpoint = '/sapi/v2/broker/subAccount/futuresSummary'

        let params = {
            subAccountId: subAccount,
            futuresType: 1
        }

        let query = constructQuery(params)

        query += `timestamp=${new Date().getTime()}`

        const signature = getSignature(query)

        const url = `${binanceBaseUrl}${endpoint}?${query}&signature=${signature}`

        const res = await axios.get(url, {
            headers: {
                "X-MBX-APIKEY": binanceApiKey
            }
        });


        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

async function enableSubAccountFutures() {
    try {

        const endpoint = '/sapi/v1/broker/subAccount/futures'

        let params = {
            subAccountId: subAccount,
            futures: true,
        }

        let query = constructQuery(params)

        query += `timestamp=${new Date().getTime()}`

        const signature = getSignature(query)

        const url = `${binanceBaseUrl}${endpoint}?${query}&signature=${signature}`

        const res = await axios.post(url, null, {
            headers: {
                "X-MBX-APIKEY": binanceApiKey
            }
        });


        console.log(res.data);
    } catch (error) {
        console.log(error.response.data);
    }
}

async function enableSubAccountUniversalTransfer() {
    try {

        const endpoint = '/sapi/v1/broker/subAccountApi/permission/universalTransfer'

        let params = {
            subAccountId: subAccount,
            subAccountApiKey: subApiKey,
            canUniversalTransfer: true,
        }

        let query = constructQuery(params)

        query += `timestamp=${new Date().getTime()}`

        const signature = getSignature(query)

        const url = `${binanceBaseUrl}${endpoint}?${query}&signature=${signature}`

        const res = await axios.post(url, null, {
            headers: {
                "X-MBX-APIKEY": binanceApiKey
            }
        });


        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

async function performUniversalTransfer() {
    try {

        const endpoint = '/sapi/v1/broker/universalTransfer'

        let params = {
            fromId: subAccount,
            toId: subAccount,
            fromAccountType: 'SPOT',
            toAccountType: 'USDT_FUTURE',
            asset: 'USDT',
            amount: 0.001,
        }

        let query = constructQuery(params)

        query += `timestamp=${new Date().getTime()}`

        const signature = getSignature(query)

        const url = `${binanceBaseUrl}${endpoint}?${query}&signature=${signature}`

        const res = await axios.post(url, null, {
            headers: {
                "X-MBX-APIKEY": binanceApiKey
            }
        });


        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

async function createApiKey() {
    try {

        const endpoint = '/sapi/v1/broker/subAccountApi'

        let params = {
            subAccountId: subAccount,
            canTrade: true,
            marginTrade: false,
            futuresTrade: false,
        }

        let query = constructQuery(params)

        query += `timestamp=${new Date().getTime()}`

        const signature = getSignature(query)

        const url = `${binanceBaseUrl}${endpoint}?${query}&signature=${signature}`

        const res = await axios.post(url, null, {
            headers: {
                "X-MBX-APIKEY": binanceApiKey
            }
        });


        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

async function getApiKey() {
    try {

        const endpoint = '/sapi/v1/broker/subAccountApi'

        let params = {
            subAccountId: subAccount,
            // canTrade: true,
            // marginTrade: false,
            // futuresTrade: true,
        }

        let query = constructQuery(params)

        query += `timestamp=${new Date().getTime()}`

        const signature = getSignature(query)

        const url = `${binanceBaseUrl}${endpoint}?${query}&signature=${signature}`

        const res = await axios.get(url, {
            headers: {
                "X-MBX-APIKEY": binanceApiKey
            }
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
}

async function changeApiKeyPermission(apiKey) {
    try {

        const endpoint = '/sapi/v1/broker/subAccountApi/permission'

        let params = {
            subAccountId: subAccount,
            subAccountApiKey: apiKey,
            canTrade: true,
            marginTrade: false,
            futuresTrade: true,
        }

        let query = constructQuery(params)

        query += `timestamp=${new Date().getTime()}`

        const signature = getSignature(query)

        const url = `${binanceBaseUrl}${endpoint}?${query}&signature=${signature}`

        const res = await axios.post(url, null, {
            headers: {
                "X-MBX-APIKEY": binanceApiKey
            }
        });


        console.log(res);
        return res.data
    } catch (error) {
        console.log(error);
    }
}

async function deleteApiKey(apiKey) {
    try {

        const endpoint = '/sapi/v1/broker/subAccountApi'

        let params = {
            subAccountId: subAccount,
            subAccountApiKey: apiKey,
        }

        let query = constructQuery(params)

        query += `timestamp=${new Date().getTime()}`

        const signature = getSignature(query)

        const url = `${binanceBaseUrl}${endpoint}?${query}&signature=${signature}`

        const res = await axios.delete(url, {
            headers: {
                "X-MBX-APIKEY": binanceApiKey
            }
        });


        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

async function getApiKeyRestriction() {
    try {

        const endpoint = '/sapi/v1/broker/subAccountApi/ipRestriction'

        let params = {
            subAccountId: subAccount,
            subAccountApiKey: subApiKey,
        }

        let query = constructQuery(params)

        query += `timestamp=${new Date().getTime()}`

        const signature = getSignature(query)

        const url = `${binanceBaseUrl}${endpoint}?${query}&signature=${signature}`

        const res = await axios.get(url, {
            headers: {
                "X-MBX-APIKEY": binanceApiKey
            }
        });

        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}