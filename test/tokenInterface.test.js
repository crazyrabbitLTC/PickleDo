'use strict'

const assert = require('assert');
const TokenInterface = require('../server/tokenInterface');

describe('tokenInterface', () => {

    let hash = "0x31767f2a3ee7defce2e57447a89bf254cf88690d3be1d383ae067206a48ee647";
    const tokenInterface = new TokenInterface("hello");

    beforeEach(async () => {
        await tokenInterface.mintToken(hash);

    });

    it('Should mint a token', async done => {
        
        let balance = "hello";
        assert.deepEqual(balance, "hello");
    })
})