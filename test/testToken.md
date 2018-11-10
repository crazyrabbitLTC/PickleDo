var testToken = artifacts.require("./testToken.sol");

contract('testToken', function(accounts) {


  it("...should mint 1 token", async () => {

    const testTokenInstance = await testToken.deployed();
    testTokenInstance.mintWithTokenURI("0x4A3EAeA9f76E26084520926EeC8fCd90d1F08a69", 0, "This is the first token", {from: accounts[0]});
    const tokenSupply = await testTokenInstance.totalSupply.call();
    assert.equal(tokenSupply, 1, "The token supply is inccorect");

  })

  it("...should mint one token with Async/Await", async () => {

    const testTokenInstance = await testToken.deployed();
    testTokenInstance.mintWithTokenURI("0x4A3EAeA9f76E26084520926EeC8fCd90d1F08a69", 1, "This is the second token", {from: accounts[0]});
    const savedTokenURI = await testTokenInstance.tokenURI(1);
    assert.equal(savedTokenURI, "This is the second token", "The token URI was not saved properly");

  })

  
});



// var SimpleStorage = artifacts.require("./SimpleStorage.sol");

// contract('SimpleStorage', function(accounts) {

//   it("...should store the value 89.", function() {
//     return SimpleStorage.deployed().then(function(instance) {
//       simpleStorageInstance = instance;

//       return simpleStorageInstance.set(89, {from: accounts[0]});
//     }).then(function() {
//       return simpleStorageInstance.storedData.call();
//     }).then(function(storedData) {
//       assert.equal(storedData, 89, "The value 89 was not stored.");
//     });
//   });

// });
