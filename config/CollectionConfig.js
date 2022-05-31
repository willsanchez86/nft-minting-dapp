const CollectionConfig = {
  testnet: '0xf57b2c51ded3a29e6891aba85459d600256cf317',
  mainnet: '0xa5409ec958c83c3f309868babaca7c86dcb077c1',
  // The contract name can be updated using the following command:
  // yarn rename-contract NEW_CONTRACT_NAME
  // Please DO NOT change it manually!
  contractName: 'GenericEye',
  tokenName: 'GenericEye',
  tokenSymbol: 'EYE',
//   hiddenMetadataUri: 'ipfs://__CID__/hidden.json',
  maxSupply: 20,
  vipSale: {
    price: 0, // Free mint for VIP
    maxMintAmountPerTx: 1,
  },
  preSale: {
    price: 50000000000000000, // 0.05 ether
    maxMintAmountPerTx: 3,
  },
  publicSale: {
    price: 90000000000000000, // 0.09 ether
    maxMintAmountPerTx: 5,
  },
  contractAddress: '0x4ac8a77b56073Ba7f014eC35d9E2119d87c551D4',
};

// module.exports = CollectionConfig;

export default CollectionConfig;