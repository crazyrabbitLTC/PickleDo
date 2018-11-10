'use strict'

const assert = require('assert');
const TokenInterface = require('../server/tokenInterface');

const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");
const Tx = require("ethereumjs-tx");
const server = "HTTP://127.0.0.1:7545";

describe('tokenInterface', () => {

    let hash = "test1";

    const gas = {
        price: 20 * 1e8,
        limit: 2100000,
    }

    const keypair = {
        memonic: "detail august fragile luggage coyote home trap veteran witness result feed blade",
        myAddress: "0x2cA4488037250f9453032aA8dE9bE5786c5c178B",
        privateKey: "62b8292bc6e27d594b7bf4f71bcb79c85e26cd506704c3f14d21ed1e17cfd9d3",
    }

    const contractInstance = {
        contractBuild: require("../build/contracts/testToken"),
        contractABI: require("../build/contracts/testToken").abi,
        contractAddress: "0x21250898ad6044217f5c8bcc6f7e6974c33e8a91",
    }

    const web3Plus = {
        Web3,
        HDWalletProvider,
        Tx, 
        server,
    }

    const tokenInterface = new TokenInterface(gas, keypair, contractInstance, web3Plus);

    beforeEach(async () => {
        

    });

    it('Should mint a token', async () => {
        const result = await tokenInterface.mintToken(hash);
        assert.ok(result);
    })

    it('Should add a minter', async () => {
        const result = await tokenInterface.addMinter("0xbc8a2a1cb9a192bdb2a167d4d1807f4895d1c65b");
        assert.ok(result);
    })
})