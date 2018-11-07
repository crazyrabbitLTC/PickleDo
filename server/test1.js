"use strict";

const fs = require("fs");
const HDWalletPRovider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const memonic = "detail august fragile luggage coyote home trap veteran witness result feed blade";
const privKey = "62b8292bc6e27d594b7bf4f71bcb79c85e26cd506704c3f14d21ed1e17cfd9d3";
const provider = new HDWalletPRovider(privKey, "http://localhost:7545", 5);
const web3 = new Web3(provider);

const artifacts = require('../build/contracts/testToken.json')
const contract = require('truffle-contract')

let testToken = contract(artifacts);

//testToken.setProvider(web3.currentProvider);
testToken.setProvider(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  //const testTokenContract = web3.eth.contract('abi');
  //var testToken = testTokenContract.at('PASTE CONTRACT ADDRESS HERE');

  console.log("The accounts are: ", accounts);

  const myContract = await testToken.deployed();



  try {
  const mint = await myContract.mintWithTokenURI("0x4A3EAeA9f76E26084520926EeC8fCd90d1F08a69", 0, "This is the first token", {from: accounts[0], gas: 300000});
  const totalSupply = await myContract.totalSupply.call();
  console.log("Total Supply: ", totalSupply.toString());

  } catch (err) {
      console.log(err);
  }

  

  
};

deploy();
