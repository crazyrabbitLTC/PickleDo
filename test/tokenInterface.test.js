"use strict";

const assert = require("assert");
const TokenInterface = require("../server/tokenInterface");

const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");
const Tx = require("ethereumjs-tx");
const server = "HTTP://127.0.0.1:7545";

describe("tokenInterface", () => {
  let hash = "test1";

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
    contractAddress: "0x21250898ad6044217f5c8bcc6f7e6974c33e8a91"
  };

  const web3Plus = {
    Web3,
    HDWalletProvider,
    Tx,
    server
  };

  const tokenInterface = new TokenInterface(
    gas,
    keypair,
    contractInstance,
    web3Plus
  );

  beforeEach(async () => {});

  it("Should mint a token...", async () => {
    const result = await tokenInterface.mintToken(hash);
    assert.equal(result.logs[0].type, "mined");
  })

  it("Should increment the supply count by 1...", async () => {
    const count = await tokenInterface.totalSupply();
    await tokenInterface.mintToken(hash);
    const count2 = await tokenInterface.totalSupply();
    assert.equal(Number(count) + 1, Number(count2));
  });

  it("Should return a Token URI...", async () => {
    const uri = "test1";
    let response = await tokenInterface.tokenURI(645);
    assert.equal(uri, response);
  });

  it("Should return token of owner by index...", async () => {
    const address = "0x2ca4488037250f9453032aa8de9be5786c5c178b";
    const index = 1;
    let response = await tokenInterface.tokenOfOwnerByIndex(address, index);
    assert.equal(Number(response), 5);
  });

  it("Should return the symbol 'tt'...", async () => {
      let response = await tokenInterface.symbol();
      assert.equal(response, "tt");
  });

  it("Should respond false for supporting uknown interface...", async () => {
      const code = "0x032"
      let response = await tokenInterface.supportsInterFace(code);
      assert.ok(!response);
  });


  


  // it('Should add a minter', async (done) => {
  //     const result = await tokenInterface.addMinter("0x85A7bAC4da4Bc90820339759E73bee84D1D28c3E");
  //     setTimeout(done, 4500);
  //     assert.ok(result);
  // })
});
