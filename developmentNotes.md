Development Notes: 


- Minting - 

This process is a bit slower than I expected. There will be a clear need to batch/incrementally mint tokens. 
Current problem is that the filewatcher software is far faster at noting changes than ganache is at saving them. 

This has some long term performance implications. 

- Firebase - 

It occures to me that it might be performant to try and incorporate firebase as a centralized backup solution. 


- Centralization vs.... - 

This is a rather interesting question. Certainly I'm considering doing everything with Ethereum and decentralized technologies, 
but it seems like it could be a very realistic performance blocker. 
It might be reasonable to say that the act of minting the actual erc-721 token should be only an on-chain operation. 
The intermediary steps of managing collections, uploading images, etc... might be better handled through a centralized solution. 
It would be interesting to give users an option. But again, the question of performance is rather an issue right away....

- Decentralized Solution: 

Local SideChain to mint local ERC-721 tokens. (Do these even travel over a "bridge"?) 
Company SideChain - Photography/Art Focused, allows for smart contracts to interact with other user smart contracts. 
Ethereum Network - main location for ERC-721s to be minted. 

Storage: IPFS / Swarm (with encryption) 
OrbitDB: Database solution

- Centralized Hybrid Solution: 

Consumer local version plugs into firebase. Use this for storage of images (backup of images)
Local Node instance handles many of the issues. A database is used for managing the local images. 

    - Maybe we don't need a database persay- perhaps the organization of files on the hard drive is the primary method of keeping things organized. 

- Image Management - 

- What does Decentralization offer? - 

We have the security of Ethereum to back up the ERC-721s. 
We can use a sidechain to make our photography interoperable- meaning we can have smart contracts building on images. 


