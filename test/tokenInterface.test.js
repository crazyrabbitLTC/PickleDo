'use strict'

const assert = require('assert');
const TokenInterface = require('../server/tokenInterface');

describe('tokenInterface', () => {

    let hash = "0x31767f2a3ee7defce2e57447a89bf254cf88690d3be1d383ae067206a48ee647";
    const gas = {
        price: 20 * 1e8,
        limit: 2100000,
    }

    const tokenInterface = new TokenInterface("hello", gas);

    beforeEach(async () => {
        

    });

    it('Should mint a token', async () => {
        const result = await tokenInterface.mintToken(hash);
        assert.ok(result);
    })
})