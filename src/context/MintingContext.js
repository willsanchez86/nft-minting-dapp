import { createContext, useState, useEffect } from 'react';
import { initOnboard } from 'utils/onboard';
import {
  setPreSaleMerkleRoot,
  getTotalMinted,
  getMaxSupply,
  isPausedState,
  isPublicSaleState,
  isPreSaleState,
  isVipSaleState,
  vipMint,
  presaleMint,
  publicMint,
} from 'utils/interact';
import CollectionConfig from 'config/CollectionConfig';

const MintingContext = createContext();

export const MintingProvider = ({ children }) => {
  const [maxSupply, setMaxSupply] = useState(0);
  const [totalMinted, setTotalMinted] = useState(0);
  const [maxMintAmount, setMaxMintAmount] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isPublicSale, setIsPublicSale] = useState(false);
  const [isPreSale, setIsPreSale] = useState(false);
  const [isVipSale, setIsVipSale] = useState(true);

  const [status, setStatus] = useState(null);
  const [mintAmount, setMintAmount] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const [onboard, setOnboard] = useState(null);
  const [price, setPrice] = useState(null);

  // Set Onboard
  useEffect(() => {
    setOnboard(initOnboard);
  }, []);

  // INIT
  useEffect(() => {
    const init = async () => {
      setMaxSupply(await getMaxSupply());
      setTotalMinted(await getTotalMinted());

      setPaused(await isPausedState());
      setIsPublicSale(await isPublicSaleState());
      setIsPreSale(await isPreSaleState());
      setIsVipSale(await isVipSaleState());

      // setPrice(await getCost());
    };
    init();
    setMaxMintAmount(
      isVipSale
        ? CollectionConfig.vipSale.maxMintAmountPerTx
        : isPreSale
        ? CollectionConfig.preSale.maxMintAmountPerTx
        : CollectionConfig.publicSale.maxMintAmountPerTx
    );
    setPrice(
      isVipSale
        ? CollectionConfig.vipSale.price
        : isPreSale
        ? CollectionConfig.preSale.price
        : CollectionConfig.publicSale.price
    );
    console.log('Init called');
  });

  // ! If preSale, update Merkle Root to preSaleWhitelist and adjust price
  useEffect(() => {
    if (isPreSale) {
      const preSaleConfig = async () => {
        await setPreSaleMerkleRoot();
      };

      preSaleConfig();
    }
  }, [isPreSale]);

  // Increment and Decrement Mint Amount functions
  const incrementMintAmount = () => {
    if (mintAmount < maxMintAmount) {
      setMintAmount(mintAmount + 1);
    }
    console.log(mintAmount);
  };

  const decrementMintAmount = () => {
    if (mintAmount > 1) {
      setMintAmount(mintAmount - 1);
      console.log(mintAmount);
    }
  };

  // VIP Mint Handler
  const vipMintHandler = async () => {
    setIsMinting(true);

    const { success, status } = await vipMint(mintAmount);

    setStatus({
      success,
      message: status,
    });

    setIsMinting(false);
  };

  // PreSale Mint Handler
  const presaleMintHandler = async () => {
    setIsMinting(true);

    const { success, status } = await presaleMint(mintAmount);

    setStatus({
      success,
      message: status,
    });

    setIsMinting(false);
  };

  //  Public Mint Handler
  const publicMintHandler = async () => {
    setIsMinting(true);

    const { success, status } = await publicMint(mintAmount);

    setStatus({
      success,
      message: status,
    });

    setIsMinting(false);
  };

  return (
    <MintingContext.Provider
      value={{
        maxSupply,
        totalMinted,
        maxMintAmount,
        price,
        paused,
        isPublicSale,
        isPreSale,
        isVipSale,
        onboard,
        mintAmount,
        status,
        isMinting,
        incrementMintAmount,
        decrementMintAmount,
        vipMintHandler,
        presaleMintHandler,
        publicMintHandler,
      }}
    >
      {children}
    </MintingContext.Provider>
  );
};

export default MintingContext;
