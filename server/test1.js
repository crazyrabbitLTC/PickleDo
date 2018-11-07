'use strict'

const HDWalletPRovider = require("truffle-hdwallet-provider");
const Web3 = require('web3');
const memonic = "detail august fragile luggage coyote home trap veteran witness result feed blade";
const provider = new HDWalletPRovider(memonic, "http://localhost:7545");
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("The accounts are: ", accounts);
}

deploy();