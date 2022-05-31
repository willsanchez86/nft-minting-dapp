/**
 *  This script will calculate the constructor arguments for the `verify` function and call it.
 *  You can use this script to verify the contract on etherscan.io.
 */



import CollectionConfig from '../config/CollectionConfig';
require('@nomiclabs/hardhat-etherscan')
// const CollectionConfig = require('../config/CollectionConfig.js');
const hre = require('hardhat');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const vip = require('../config/vip.js')


const BASE_URI = process.env.BASE_URI_METADATA;
const proxyRegistryAddressRinkeby = CollectionConfig.testnet;
const proxyRegistryAddressMainnet = CollectionConfig.mainnet;

const price = CollectionConfig.vipSale.price;
const maxSupply = CollectionConfig.maxSupply;
const maxMintAmountPerTx = CollectionConfig.vipSale.maxMintAmountPerTx;

async function main() {
// Calculate merkle root from the whitelist array
const leafNodes = vip.map((addr) => keccak256(addr))
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
const root = merkleTree.getRoot()

await hre.run('verify:verify', {
    address: CollectionConfig.contractAddress, // Deployed contract address
    constructorArguments: [BASE_URI, root, proxyRegistryAddressRinkeby, price, maxSupply, maxMintAmountPerTx]
})
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})




// Successfully verified contract GenericEye on Etherscan.
// https://rinkeby.etherscan.io/address/0x4ac8a77b56073Ba7f014eC35d9E2119d87c551D4#code