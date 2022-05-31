const CollectionConfig = require('../config/CollectionConfig.js');
const hre = require('hardhat');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const vip = require('../config/vip.js')

const BASE_URI = process.env.BASE_URI_METADATA;
const proxyRegistryAddressRinkeby = CollectionConfig.testnet;
const proxyRegistryAddressMainnet = CollectionConfig.mainnet;


async function main() {
// Calculate merkle root from the whitelist array
const leafNodes = vip.map((addr) => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
const root = merkleTree.getRoot();

const price = CollectionConfig.vipSale.price;
const maxSupply = CollectionConfig.maxSupply;
const maxMintAmountPerTx = CollectionConfig.vipSale.maxMintAmountPerTx;

// Deploy the contract --> run command in terminal: <npx hardhat run scripts/deployContract.js --network {rinkeby OR mainnet}>
const GenericEyes = await hre.ethers.getContractFactory('GenericEye')
const genericEyes = await GenericEyes.deploy(
    BASE_URI,
    root,
    proxyRegistryAddressRinkeby,
    price,
    maxSupply,
    maxMintAmountPerTx
)

await genericEyes.deployed()

console.log('GenericEyes deployed to:', genericEyes.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})