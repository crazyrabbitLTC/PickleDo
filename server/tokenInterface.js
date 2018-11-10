"use strict";

class tokenInterface {
  constructor(gas, keypair, contractInstance, web3Plus) {
    this.txLog = {};
    this.txIndex = [];

    const { Web3, HDWalletProvider, Tx, server } = web3Plus;
    this.Web3 = Web3;
    this.HDWalletProvider = HDWalletProvider;
    this.Tx = Tx;
    this.server = server;

    this.provider = new this.HDWalletProvider(this.memonic, this.server);
    this.web3 = new this.Web3(this.provider);

    const { price, limit } = gas;
    this.gasPrice = this.web3.utils.toHex(price);
    this.gasLimit = this.web3.utils.toHex(limit);

    const { myAddress, privateKey, memonic } = keypair;
    this.myAddress = myAddress;
    this.privateKey = Buffer.from(privateKey, "hex");
    this.memonic = memonic;

    const { contractABI, contractAddress, contractBuild } = contractInstance;
    this.contractABI = contractABI;
    this.contractAddress = contractAddress;
    this.contractBuild = contractBuild;
    this.contract = new this.web3.eth.Contract(
      this.contractABI,
      this.contractAddress
    );
  }

  getMostRecentTx() {
    return this.txLog;
  }

  getTxHistory() {
    return this.txIndex;
  }

  async getTxCount() {
    const count = await this.web3.eth.getTransactionCount(this.myAddress);
    return count;
  }

  _buildTransaction(from, to, method, count, value = "0x0") {
    //this needs to be put into configuration object
    const gasPrice = this.gasPrice;
    const gasLimit = this.gasLimit;
    const nonce = this.web3.utils.toHex(count);

    const rawTransaction = this._rawTxbuilder(
      from,
      gasPrice,
      gasLimit,
      to,
      value,
      method,
      nonce
    );

    return rawTransaction;
  }

  _rawTxbuilder(from, gasPrice, gasLimit, to, value, data, nonce) {
    const rawTransaction = {
      from,
      gasPrice,
      gasLimit,
      to,
      value,
      data,
      nonce
    };

    const transaction = new this.Tx(rawTransaction);

    return transaction;
  }

  _signTransaction(transaction) {
    transaction.sign(this.privateKey);

    return transaction;
  }

  async _sendTransaction(transaction) {
    return this.web3.eth.sendSignedTransaction(
      "0x" + transaction.serialize().toString("hex")
    );

  }

  async _mintWithTokenURI(addressTo, tokenId, URIString) {
    const count = await this.getTxCount();

    const contractMethod = this.contract.methods
      .mintWithTokenURI(addressTo, tokenId, URIString)
      .encodeABI();

    const rawTransaction = this._buildTransaction(
      addressTo,
      this.contractAddress,
      contractMethod,
      count
    );

    const transaction = this._signTransaction(rawTransaction, this.privateKey);
    return this._sendTransaction(transaction);
  }

  async addMinter(address) {
    const count = await this.getTxCount();

    const contractMethod = this.contract.methods.addMinter(address).encodeABI();

    const rawTransaction = this._buildTransaction(
      this.myAddress,
      this.contractAddress,
      contractMethod,
      count
    );

    const transaction = this._signTransaction(rawTransaction, this.privateKey);
    this._sendTransaction(transaction);
    return true;
  }

  async approve(addressTo, tokenId) {
    const count = await this.getTxCount();

    const contractMethod = this.contract.methods
      .approve(addressTo, tokenId)
      .encodeABI();

    const rawTransaction = this._buildTransaction(
      this.myAddress,
      this.contractAddress,
      contractMethod,
      count
    );

    const transaction = this._signTransaction(rawTransaction, this.privateKey);
    this._sendTransaction(transaction);
    return true;
  }

  async mint(addressTo, tokenId) {}

  async mintToken(URI, tokenId = null) {
    if (!tokenId) {
      tokenId = await this.getTxCount();
    }

    return this._mintWithTokenURI(this.myAddress, tokenId, URI);

    // try {
    //   return  this._mintWithTokenURI(this.myAddress, tokenId, URI);

    // } catch (error) {
    //   console.log(error);
    //   return false;
    // }
  }

  async renounceMinter() {}

  async safeTransferFrom(addressFrom, addressTo, tokenId) {}

  async setApprovalForAll(addresTo, boolApproved) {}

  async transferFrom(addressFrom, addressTo, tokenId) {}

  async balanceOf(address) {}

  async getApproved(tokenId) {}

  async isApprovedForAll(addressOwner, addressOperator) {}

  async isMinter(addressMinter) {}

  async name() {}

  async ownerOf(tokenId) {}

  async supportsInterFace(interfaceIdBytes4) {}

  async symbol() {}

  async tokenByIndex(index) {
    try {
      let tokenByIndex = await this.contract.methods.tokenByIndex(index).call({from: this.myAddress});
      return tokenByIndex;
    } catch (error) {
      console.log(error)
    }
  }

  async tokenOfOwnerByIndex(addressOwner, index) {
    try {
      let tokenOfOwner = await this.contract.methods.tokenOfOwnerByIndex(addressOwner, index).call({from: this.myAddress});
      return tokenOfOwner;
    } catch (error) {
      console.log(error)
    }
  }

  async tokenURI(tokenId) {
    try {
      let tokenURI = await this.contract.methods.tokenURI(tokenId).call({from: this.myAddress});
      return tokenURI;
    } catch (error) {
      console.log(error)
    }
  }

  async totalSupply() {
    try {
      let supply = await this.contract.methods.totalSupply().call({from: this.myAddress});
      //console.log("This is the total count: ". supply);
      return supply;
    } catch (error) {
      console.log(error);
    }

  }

  //Just for reference at this point
  async deploy() {
    console.log("Using Module Class Version");

    const balanceOf = await this.contract.methods
      .balanceOf(this.myAddress)
      .call();
    //const accounts = await this.web3.eth.getAccounts();
    let totalCount = await this.contract.methods.totalSupply().call({from: this.myAddress});

    console.log("Total Count is: ", totalCount);
    const count = await this.getTxCount();
    console.log("Accounts: ", this.accounts);
    console.log("Count: ", count);

    const contractMethod = this.contract.methods
      .mintWithTokenURI(this.myAddress, count, "This is token 1")
      .encodeABI();

    const rawTransaction = this._buildTransaction(
      this.myAddress,
      this.contractAddress,
      contractMethod,
      count
    );

    const transaction = this._signTransaction(rawTransaction, this.privateKey);

    this._sendTransaction(transaction);

    const isMinter = await this.contract.methods
      .isMinter(this.myAddress)
      .call();

    console.log("Name: ", isMinter, " Balance: ", balanceOf);

    return balanceOf;
  }

  static connect(values) {
    return new tokenInterface(values);
  }
}

module.exports = tokenInterface;
