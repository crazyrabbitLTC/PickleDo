"use strict";


const HDWalletPRovider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const memonic = "detail august fragile luggage coyote home trap veteran witness result feed blade";
const artifacts = require('../build/contracts/testToken.json')
const contract = require('truffle-contract')

const privKey = "62b8292bc6e27d594b7bf4f71bcb79c85e26cd506704c3f14d21ed1e17cfd9d3";
const privateKey = Buffer.from(privKey, "hex");
const provider = new HDWalletPRovider(privateKey, "http://localhost:7545");
const web3 = new Web3(provider);



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
  const name = await myContract.name.call();
  console.log("Total Supply: ", totalSupply.toString(), "Name: ", name);

  } catch (err) {
      console.log(err);
  }

  

  
};

deploy();
