# NFT Minting Dapp

### Overview

Decentralized Full Stack NFT Minting Application built on Ethereum Network for Organized Crime Apes NFT Project (Deployed Demo Version on Rinkeby Testnet with dummy artwork for client privacy)

<a href="https://nft-minting-dapp-navy.vercel.app/"><img src="https://img.shields.io/badge/-DEMO-4E69C8?style=for-the-badge&logo=appveyor;link=https://nft-minting-dapp-navy.vercel.app" alt="DEMO"></a>


### Features
* ERC-721 Solidity Smart Contract
* React Front-End, Blocknative libraries used to connect user wallets, and JavaScript interacts with the Smart contract to facilitate customer transactions
* Runs on Alchemy supernode since running a node independently is costly
* IPFS decentralized image storage



### Installation & Startup
  
```bash
  Clone the repository and change directory into it:
  
  git clone https://github.com/willsanchez86/nft-minting-dapp.git 
  cd nft-minting-dapp

  npm install            # Download packages
  npm start              # Run the dev server
```



### Usage & Details
Simple UI displayed as a stand-alone web page. This is intentionally separated from OrganizedCrimeApes.com to improve operational speed & efficiency in anticipation of heavy site traffic on launch day. 


### Future Releases
Official Minting Date is still pending, but future release will include the following:
* Deployment to Mainnet
* Gas Optimized ERC-721A Smart Contract
* Built-in Royalties for Secondary Sales
* Terms of Service - pending writeup from OCA


### Credits
* <a href="https://docs.openzeppelin.com/">OpenZeppelin</a> ERC-721 Smart Contract Standard
* <a href="https://etherscan.io/address/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d#code">Bored Ape Yacht Club Smart Contract </a> customized with inspiration  from <a href="https://github.com/hashlips-lab/nft-erc721-collection/blob/main/smart-contract/contracts/YourNftToken.sol">Hashlips</a> to ensure secure, and tested contract implementation. 
* <a href="https://docs.blocknative.com/onboard">Blocknative</a> used for onboarding and connecting customer wallets
* <a href="https://docs.alchemy.com/alchemy/">Alchemy</a> supernode removes the need for running a self-hosted node for this web3 application
