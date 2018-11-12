pragma solidity ^0.4.24;


import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Mintable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721MetadataMintable.sol";




contract testToken is ERC721Full, ERC721MetadataMintable, ERC721Mintable {
    
    constructor(string name, string symbol) ERC721Full(name, symbol)  public {

    }
  
  function bulkMint(address[] addressTo, uint256[] tokenId, bytes32[] uri){

  }

}