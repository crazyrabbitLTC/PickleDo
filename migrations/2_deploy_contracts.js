var testToken = artifacts.require("testToken");

const name = "testToken";
const symbol = "tt";

module.exports = function(deployer) {
  deployer.deploy(testToken, name, symbol);
};