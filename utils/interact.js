import CollectionConfig from '../config/CollectionConfig.js';
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const vipWhitelist = require('../config/vip.js');
const preSaleWhitelist = require('../config/whitelist.js');

//Instantiate web3
const web3 = createAlchemyWeb3(
  process.env.REACT_APP_NEXT_PUBLIC_ALCHEMY_RPC_URL
);

const contract = require('../artifacts/contracts/GenericEye.sol/GenericEye.json');

const nftContract = new web3.eth.Contract(
  contract.abi,
  CollectionConfig.contractAddress
);

// Calculate merkle root from the whitelist array
const leafNodes = vipWhitelist.map((addr) => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
const root = merkleTree.getRoot();

export const setPreSaleMerkleRoot = async () => {
  // Re-calculate merkle root from the whitelist array.
  const leafNodes = preSaleWhitelist.map((addr) => keccak256(addr));
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  const newRoot = merkleTree.getRoot();

  // Set the re-calculated merkle root to the contract.
  await nftContract.methods.setMerkleRoot(newRoot);

  console.log('Whitelist root set to:', newRoot);
};

export const getTotalMinted = async () => {
  const totalMinted = await nftContract.methods.totalSupply().call();
  return totalMinted;
};

export const getMaxSupply = async () => {
  const maxSupply = await nftContract.methods.maxSupply().call();
  return maxSupply;
};

export const isPausedState = async () => {
  const paused = await nftContract.methods.paused().call();
  return paused;
};

export const isVipSaleState = async () => {
  const vipSale = await nftContract.methods.vipM().call();
  return vipSale;
};

export const isPreSaleState = async () => {
  const preSale = await nftContract.methods.presaleM().call();
  return preSale;
};

export const isPublicSaleState = async () => {
  const publicSale = await nftContract.methods.publicM().call();
  return publicSale;
};

export const setContractMaxMintAmount = async (_maxMintAmount) => {
  await nftContract.methods
    .setMaxMintAmountPerTx(_maxMintAmount)
    .send({ from: process.env.REACT_APP_METAMASK_DEFAULT_ACCOUNT });
};

// export const getCost = async () => {
//   const price = await nftContract.methods.price().call();
//   return price;
// };

// export const setCost = async (_price) => {
//   await nftContract.methods.setPrice(_price).call();

//   console.log(
//     `Price is now set to ${await nftContract.methods.price().call()}`
//   );
// };

export const vipMint = async (mintAmount) => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: 'To be able to mint, you need to connect your wallet',
    };
  }

  const leaf = keccak256(window.ethereum.selectedAddress);
  const proof = merkleTree.getHexProof(leaf);

  // Verify Merkle Proof
  const isValid = merkleTree.verify(proof, leaf, root);

  if (!isValid) {
    return {
      success: false,
      status: 'Invalid Merkle Proof - You are not on the whitelist',
    };
  }

  const nonce = await web3.eth.getTransactionCount(
    window.ethereum.selectedAddress,
    'latest'
  );

  // Set up our Ethereum transaction
  const tx = {
    to: CollectionConfig.contractAddress,
    from: window.ethereum.selectedAddress,
    value: (CollectionConfig.vipSale.price * mintAmount).toString(16),
    // parseInt(
    //   web3.utils.toWei(String(CollectionConfig.price * mintAmount), 'ether')
    // ).toString(16), // hex
    data: nftContract.methods
      .vipMint(window.ethereum.selectedAddress, mintAmount, proof)
      .encodeABI(),
    nonce: nonce.toString(16),
  };

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx],
    });

    return {
      success: true,
      status: (
        <a
          href={`https://rinkeby.etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          <p>✅ Check out your transaction on Etherscan:</p>
          <p>{`https://rinkeby.etherscan.io/tx/${txHash}`}</p>
        </a>
      ),
    };
  } catch (error) {
    return {
      success: false,
      status: '😞 Smth went wrong:' + error.message,
    };
  }
};

//? adjusted value in ethereum transaction
export const presaleMint = async (mintAmount) => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: 'To be able to mint, you need to connect your wallet',
    };
  }

  const leaf = keccak256(window.ethereum.selectedAddress);
  const proof = merkleTree.getHexProof(leaf);

  // Verify Merkle Proof
  const isValid = merkleTree.verify(proof, leaf, root);

  if (!isValid) {
    return {
      success: false,
      status: 'Invalid Merkle Proof - You are not on the whitelist',
    };
  }

  const nonce = await web3.eth.getTransactionCount(
    window.ethereum.selectedAddress,
    'latest'
  );

  // Set up our Ethereum transaction
  const tx = {
    to: CollectionConfig.contractAddress,
    from: window.ethereum.selectedAddress,
    value: (CollectionConfig.preSale.price * mintAmount).toString(16),
    // parseInt(
    //   web3.utils.toWei(String(CollectionConfig.price * mintAmount), 'ether')
    // ).toString(16), // hex
    data: nftContract.methods
      .presaleMint(window.ethereum.selectedAddress, mintAmount, proof)
      .encodeABI(),
    nonce: nonce.toString(16),
  };

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx],
    });

    return {
      success: true,
      status: (
        <a
          href={`https://rinkeby.etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          <p>✅ Check out your transaction on Etherscan:</p>
          <p>{`https://rinkeby.etherscan.io/tx/${txHash}`}</p>
        </a>
      ),
    };
  } catch (error) {
    return {
      success: false,
      status: '😞 Smth went wrong:' + error.message,
    };
  }
};

//? adjusted value in ethereum transaction
export const publicMint = async (mintAmount) => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: 'To be able to mint, you need to connect your wallet',
    };
  }

  const nonce = await web3.eth.getTransactionCount(
    window.ethereum.selectedAddress,
    'latest'
  );

  // Set up our Ethereum transaction
  const tx = {
    to: CollectionConfig.contractAddress,
    from: window.ethereum.selectedAddress,
    value: (CollectionConfig.publicSale.price * mintAmount).toString(16),
    // parseInt(
    //   web3.utils.toWei(String(config.price * mintAmount), 'ether')
    // ).toString(16), // hex
    data: nftContract.methods.publicSaleMint(mintAmount).encodeABI(),
    nonce: nonce.toString(16),
  };

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx],
    });

    return {
      success: true,
      status: (
        <a
          href={`https://rinkeby.etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          <p>✅ Check out your transaction on Etherscan:</p>
          <p>{`https://rinkeby.etherscan.io/tx/${txHash}`}</p>
        </a>
      ),
    };
  } catch (error) {
    return {
      success: false,
      status: '😞 Smth went wrong:' + error.message,
    };
  }
};
