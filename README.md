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
  
  Create a .env file containing the following environment variables (Do NOT use quotation marks when filling in values):
      
      REACT_APP_NEXT_PUBLIC_ALCHEMY_RPC_URL=
          # 1. Visit https://dashboard.alchemyapi.io/signup/chain and create an account
          # 2. Select Ethereum as your Ecosysten and hit "Get Started"
          # 3. Fill out Form Fields, choose Rinkeby as network, and click "Create App"
          # 4. Choose your preferred plan (Free Recommended)
          # 5. Skip for now on the Payment Info Page
          # 6. Choose "Capped Capacity" Scaling Policy then hit Continue
          # 7. Copy and paste the https:... link as the value for this environment variable

      REACT_APP_NEXT_PUBLIC_FORTMATIC_KEY=
      # Visit https://dashboard.fortmatic.com/login and create an account. Copy & Paste the test API Key as the value for this environment variable -->

      REACT_APP_METAMASK_PRIVATE_KEY=
      # Copy & Paste your Metamask Private Key (WARNING: DO NOT SHARE THESE KEYS WITH ANYONE AND BE VERY CAREFUL NOT TO EXPOSE THESE ONLINE!!)

      REACT_APP_METAMASK_DEFAULT_ACCOUNT=
      # Copy & Paste your Metamask Account Number 

      REACT_APP_ETHERSCAN_API_KEY=
          # 1. Visit https://etherscan.io/login and create 
          # 2. Copy & Paste your Metamask account an account. 
          # 3. Click on your username and choose "API Key" in the dropdown menu
          # 4. Create a new API Key
          # 5. Copy & Paste it as the value for this environment variable

      REACT_APP_BASE_URI_METADATA=ipfs://QmSGJHJfWFNCHKjU6sfREeFyvE8ywZeoCKoiASL1Qc2Hnp/        # Generic Eye Metadata
  
  
  npm start              # Run the dev server
```



### Usage & Details
Simple UI displayed as a stand-alone web page. This is intentionally separated from OrganizedCrimeApes.com to improve operational speed & efficiency in anticipation of heavy site traffic on launch day. 

**NOTE: To interact with the website or to deploy your own version to the Rinkeby Test Network, your connected wallet must contain Rinkeby Test Eth, which can be acquired on https://faucets.chain.link/rinkeby 


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
