'use strict'

const assert = require('assert');
const TokenInterface = require('../server/tokenInterface');

describe('tokenInterface', () => {

    let hash = "0x31767f2a3ee7defce2e57447a89bf254cf88690d3be1d383ae067206a48ee647";

    const gas = {
        price: 20 * 1e8,
        limit: 2100000,
    }

    const keypair = {
        myAddress: "0x2cA4488037250f9453032aA8dE9bE5786c5c178B",
        privateKey: "62b8292bc6e27d594b7bf4f71bcb79c85e26cd506704c3f14d21ed1e17cfd9d3",
    }

    const tokenInterface = new TokenInterface("hello", gas, keypair);

    beforeEach(async () => {
        

    });

    it('Should mint a token', async () => {
        const result = await tokenInterface.mintToken(hash);
        assert.ok(result);
    })
})