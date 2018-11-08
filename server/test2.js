"use strict";

const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");
const Tx = require('ethereumjs-tx');
const testToken = require("../build/contracts/testToken");
const memonic = "detail august fragile luggage coyote home trap veteran witness result feed blade";
const provider = new HDWalletProvider(
  memonic,
  "HTTP://127.0.0.1:7545"
);

const myAddress = "0x2cA4488037250f9453032aA8dE9bE5786c5c178B";

const privateKey = Buffer.from(
  "62b8292bc6e27d594b7bf4f71bcb79c85e26cd506704c3f14d21ed1e17cfd9d3",
  "hex"
);
const contractABI = testToken.abi;
const contractAddress = "0x6f129fed5004a2a37bcb0965f2a81e2f02f20783";

const web3 = new Web3(provider);
const contract = new web3.eth.Contract(contractABI, contractAddress);





const getCount = async () => {
    const count = await web3.eth.getTransactionCount(myAddress);
    return count;
}

const deploy = async (uri) => {
  const balanceOf = await contract.methods.balanceOf(myAddress).call();
  const accounts = await  web3.eth.getAccounts();
  let totalCount = await contract.methods.totalSupply.call();


  const count = await getCount();
  console.log("Accounts: ", accounts);
  console.log("Count: ", count);
  //console.log("TotalSupply: ", totalCount);

  var rawTransaction = {
    from: myAddress,
    gasPrice: web3.utils.toHex(20 * 1e9),
    gasLimit: web3.utils.toHex(210000),
    to: contractAddress,
    value: "0x0",
    data: contract.methods
      .mintWithTokenURI(myAddress, count, "This is token 1")
      .encodeABI(),
    nonce: web3.utils.toHex(count)
  };

  ///////

  let transaction = new Tx(rawTransaction);
  transaction.sign(privateKey);

  web3.eth
    .sendSignedTransaction("0x" + transaction.serialize().toString("hex"))
    .once("transactionHash", (hash) => {
        console.log("Hash made! ", hash);
    }).once('receipt', function(receipt){console.log(['transferToReceiver Receipt:', receipt]);})
    .on('confirmation', (confirmationNumber) => {console.log('transferToReceiver confirmation: ' + confirmationNumber);})
    


  const isMinter = await contract.methods.isMinter(myAddress).call();
  

  console.log("" Balance: ", balanceOf);

  

  return(balanceOf);
  
};


deploy("My name is same!");

module.exports = deploy;

