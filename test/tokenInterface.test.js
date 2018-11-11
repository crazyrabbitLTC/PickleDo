"use strict";

const assert = require("assert");
const uuidv4 = require("uuid/v4");
const TokenInterface = require("../server/tokenInterface");

const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");
const Tx = require("ethereumjs-tx");
const server = "HTTP://127.0.0.1:7545";
const wsServer = "ws://localhost:7545";
const networkId = 5777;

const ganacheAccountZero = "0x2ca4488037250f9453032aa8de9be5786c5c178b";

describe("tokenInterface", () => {
 
    //Accessible for all the tests
    let tokenId;
    let tokenURI;

  let mintedtokens = {};

  const gas = {
    price: 20 * 1e8,
    limit: 2100000
  };

  const keypair = {
    memonic:
      "detail august fragile luggage coyote home trap veteran witness result feed blade",
    myAddress: "0x2cA4488037250f9453032aA8dE9bE5786c5c178B",
    privateKey:
      "62b8292bc6e27d594b7bf4f71bcb79c85e26cd506704c3f14d21ed1e17cfd9d3"
  };

  const contractInstance = {
    contractBuild: require("../build/contracts/testToken"),
    contractABI: require("../build/contracts/testToken").abi,
    contractAddress: require("../build/contracts/testToken").networks[networkId]
      .address
  };

  const web3Plus = {
    Web3,
    HDWalletProvider,
    Tx,
    server,
    wsServer
  };

  const tokenInterface = new TokenInterface(
    gas,
    keypair,
    contractInstance,
    web3Plus
  );

  beforeEach(async () => {
    // let events = await tokenInterface.subscribeToAllEvents();
    // events('newBlockHeaders', (error, blockHeader) => {
    //   if (error) console.log(error)
    //   console.log("Here is blockheader", blockHeader);
    // })
  });



  it("Should mint a token...", async () => {
    tokenURI = uuidv4();

    let events = await tokenInterface.subscribeToContractEvents();
    events.Transfer(
      {
        fromBlock: 0
      },
      function(error, event) {
        if (error) {
          console.log(error);
          assert.equal(event.event, "Transfer");
        }
        //console.log("The Event", event);
        tokenId = event.returnValues.tokenId;
        console.log("Token Id: (transfered from 0x0) ", event.returnValues.tokenId);
        assert.equal(event.event, "Transfer");
      }
    );

    const result = await tokenInterface.mintToken(tokenURI);
  }).timeout(5000);

  it("Should return a Token URI...", async () => {

    let response = await tokenInterface.tokenURI(tokenId);
    console.log("Token ID: ", tokenId , " URI: ", response);
    assert.equal(tokenURI, response);
  });

  it("Should return token of owner by index...", async () => {
    const address = ganacheAccountZero;
    const index = 1;
    let response = await tokenInterface.tokenOfOwnerByIndex(address, index);
    console.log(response);
    //assert.equal(Number(response), 809);
  });

  xit("Should return the symbol 'tt'...", async () => {
    let response = await tokenInterface.symbol();
    assert.equal(response, "tt");
  });

  xit("Should respond false for supporting uknown interface...", async () => {
    const code = "0x032";
    let response = await tokenInterface.supportsInterFace(code);
    assert.ok(!response);
  });

  xit("Should respond with the owner address...", async () => {
    const expectedAddress = ganacheAccountZero;
    const token = 645;
    let response = await tokenInterface.ownerOf(token);
    assert.equal(response.toLowerCase(), expectedAddress);
  });

  xit("Should respond with the token Name...", async () => {
    const expectedName = "testToken";
    let response = await tokenInterface.name();
    assert.equal(response, expectedName);
  });

  xit("Should return status of isMinter for an address...", async () => {
    const address = ganacheAccountZero;
    let response = await tokenInterface.isMinter(address);
    assert.ok(response);
  });

  xit("Should return false for an unaproved isApprovedForAll operator...", async () => {
    const addressOwner = ganacheAccountZero;
    const addressOperator = "0xBc8a2A1Cb9a192bDb2A167d4d1807F4895d1C65B";
    let response = await tokenInterface.isApprovedForAll(
      addressOwner,
      addressOperator
    );
    assert.ok(!response);
  });

  xit("Should return no one is approved for getApproved...", async () => {
    const tokenId = 645;
    const nullAddress = "0x0000000000000000000000000000000000000000";
    let response = await tokenInterface.getApproved(tokenId);
    assert.equal(response, nullAddress);
  });

  xit("Should return the balance of an address...", async () => {
    const address = ganacheAccountZero;
    let response = await tokenInterface.balanceOf(address);
    assert.ok(response);
  });

  xit("Should Transfer a token from and address to an address...", async () => {
    const addressFrom = ganacheAccountZero;
    const addressTo = "0x4A3EAeA9f76E26084520926EeC8fCd90d1F08a69";
    const tokenID = 5;

    let response = await tokenInterface.transferFrom(
      addressFrom,
      addressTo,
      tokenID
    );
    //console.log("Response: ", response);
    assert.equal(response.logs[0].type, "mined");
  });

  xit("Should approve the transfer of all tokens...", async () => {
    const addressTo = "0x4A3EAeA9f76E26084520926EeC8fCd90d1F08a69";
    const approval = true;

    let response = await tokenInterface.setApprovalForAll(addressTo, approval);
    //console.log("Response: ", response);
    assert.equal(response.logs[0].type, "mined");
  });

  xit("Should safeTransfer a token from and address to an address...", async () => {
    const addressFrom = ganacheAccountZero;
    const addressTo = "0x4A3EAeA9f76E26084520926EeC8fCd90d1F08a69";
    const tokenID = 809;

    let response = await tokenInterface.safeTransferFrom(
      addressFrom,
      addressTo,
      tokenID
    );
    //console.log("Response: ", response);
    assert.equal(response.logs[0].type, "mined");
  });

  xit("Renounce Minter...");

  // it('Should add a minter', async (done) => {
  //     const result = await tokenInterface.addMinter("0x85A7bAC4da4Bc90820339759E73bee84D1D28c3E");
  //     setTimeout(done, 4500);
  //     assert.ok(result);
  // })
});
