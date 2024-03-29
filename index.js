import { networks, payments, Psbt } from 'bitcoinjs-lib';
import { ECPairFactory } from "ecpair";
import * as ecc from "tiny-secp256k1";
import axios from 'axios';

async function sendCrypto() {

    const walletA = {
        "address": "n4CjraHDsmEjRbmVhx4DPZBR8RYVzLsWEw",
        "privateKey": "fd4e1b29c5cdf713c8dd327f672ee6e42de2933c8e576c6d0254820e6efc999f",
        "publicKey": "02edcd780e1a9e2cc140de56590b9b091b3b6716818c72d7bd97e999cebb724657"
    }

    const walletB = {
        "address": "n2oBEU446uM3ReFepRbSBUSGioZtyBwhgv",
        "publicKey": "039766e72f469e591f3d6b1b67905fe94e66dafe8766064982edafdc75e0fcbeaa",
        "privateKey": "7aa6a3f444835006c033f1bff9080b5ef5b26ed7bee20df636f202d80459904f"
    }

    const txb = new Psbt({ network: networks.testnet })

    const ECPair = ECPairFactory(ecc)

    const keyPair = ECPair.fromPrivateKey(Buffer.from(walletA.privateKey, 'hex'));

    const payment = payments.p2pkh({ pubkey: keyPair.publicKey, network: networks.testnet });

    const { address } = payment;


    const response = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${walletA.address}/full`);

    const senderTotalBalance = response.data.balance

    const amountToSend = 0.001 * 100000000 // BTC to Satoshis
    const fee = 0.00001 * 100000000
    const deductions = (amountToSend + fee)
    const change = senderTotalBalance - deductions


    const utxos_res = await axios.get(`https://blockstream.info/testnet/api/address/${walletA.address}/utxo`);

    const utxos = utxos_res.data;

    for (const element of utxos) {
        const response = await axios.get(`https://api.blockcypher.com/v1/btc/test3/txs/${element.txid}?includeHex=true`);
        const previousTx = response.data.hex;
        txb.addInput({
            hash: element.txid,
            index: element.vout,
            nonWitnessUtxo: Buffer.from(previousTx, 'hex')
        });
    }


    txb.addOutput({
        address: walletB.address,
        value: amountToSend
    });

    txb.addOutput({
        address: address,
        value: change
    });


    try {

        txb.signAllInputs(keyPair)
        txb.finalizeAllInputs()

        const rawHex = txb.extractTransaction().toHex();
        console.log("Raw Hex");
        console.log(rawHex);

    } catch (error) {
        console.error(error);
    }

}

sendCrypto()







































































// const ethers = require('ethers')

// const provider = new ethers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/')


// const wallet = ethers.Wallet.createRandom()
// wallet.connect(this.provider)

// console.log(wallet.mnemonic.phrase);

// const bip39 = require('bip39')

// const mnemonic = bip39.generateMnemonic()

// console.log(mnemonic);


// const wallet = ethers.Wallet.fromPhrase(mnemonic);

// console.log(wallet);