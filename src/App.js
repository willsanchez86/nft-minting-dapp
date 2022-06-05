import NftImage from './components/NftImage';
import ContractAddress from './components/ContractAddress';
import { useEffect, useContext } from 'react';
// import { initOnboard } from 'utils/onboard';
import { useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react';
// import {
//   setContractMaxMintAmount,
//   setPreSaleMerkleRoot,
//   getTotalMinted,
//   getMaxSupply,
//   isPausedState,
//   isPublicSaleState,
//   isPreSaleState,
//   isVipSaleState,
//   vipMint,
//   presaleMint,
//   publicMint,
// } from '../utils/interact';

// import CollectionConfig from 'config/CollectionConfig';

import MintingContext from './context/MintingContext';

function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
  const connectedWallets = useWallets();

  // const [maxSupply, setMaxSupply] = useState(0);
  // const [totalMinted, setTotalMinted] = useState(0);
  // const [maxMintAmount, setMaxMintAmount] = useState(0);
  // const [paused, setPaused] = useState(false);
  // const [isPublicSale, setIsPublicSale] = useState(false);
  // const [isPreSale, setIsPreSale] = useState(false);
  // const [isVipSale, setIsVipSale] = useState(true);

  // const [status, setStatus] = useState(null);
  // const [mintAmount, setMintAmount] = useState(1);
  // const [isMinting, setIsMinting] = useState(false);
  // const [onboard, setOnboard] = useState(null);
  // const [price, setPrice] = useState(null);

  const {
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
  } = useContext(MintingContext);

  // // Set Onboard
  // useEffect(() => {
  //   setOnboard(initOnboard);
  // }, []);

  //Check if wallet was previously loaded and saved in localStorage
  useEffect(() => {
    if (!connectedWallets.length) return;

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    );
    window.localStorage.setItem(
      'connectedWallets',
      JSON.stringify(connectedWalletsLabelArray)
    );
  }, [connectedWallets]);

  // Set Wallet
  useEffect(() => {
    // If onboarding failed, then return
    if (!onboard) return;

    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem('connectedWallets')
    );

    if (previouslyConnectedWallets?.length) {
      async function setWalletFromLocalStorage() {
        await connect({
          autoSelect: {
            label: previouslyConnectedWallets[0],
            disableModals: true,
          },
        });
      }

      setWalletFromLocalStorage();
    }
  }, [onboard, connect]);

  // // TODO: INIT
  // useEffect(() => {
  //   const init = async () => {
  //     setMaxSupply(await getMaxSupply());
  //     setTotalMinted(await getTotalMinted());

  //     // setPaused(await isPausedState());
  //     // setIsPublicSale(await isPublicSaleState());
  //     // setIsPreSale(await isPreSaleState());
  //     // setIsVipSale(await isVipSaleState());

  //     // setPrice(await getCost());
  //   };
  //   init();
  //   setMaxMintAmount(
  //     isVipSale
  //       ? CollectionConfig.vipSale.maxMintAmountPerTx
  //       : isPreSale
  //       ? CollectionConfig.preSale.maxMintAmountPerTx
  //       : CollectionConfig.publicSale.maxMintAmountPerTx
  //   );
  //   setContractMaxMintAmount(maxMintAmount);
  //   setPrice(
  //     isVipSale
  //       ? CollectionConfig.vipSale.price
  //       : isPreSale
  //       ? CollectionConfig.preSale.price
  //       : CollectionConfig.publicSale.price
  //   );
  // }, []);

  // ! If preSale, update Merkle Root to preSaleWhitelist and adjust price
  // useEffect(() => {
  //   if (isPreSale) {
  //     const preSaleConfig = async () => {
  //       await setPreSaleMerkleRoot();
  //     };

  //     preSaleConfig();
  //   }
  // }, [isPreSale]);

  // ! If publicSale, update price
  // useEffect(() => {
  //   if (isPublicSale) {
  //     const publicSaleConfig = async () => {
  //       await setCost(CollectionConfig.publicSale.price);
  //     };

  //     publicSaleConfig();
  //   }
  // }, [isPublicSale]);

  // // Increment and Decrement Mint Amount functions
  // const incrementMintAmount = () => {
  //   if (mintAmount < maxMintAmount) {
  //     setMintAmount(mintAmount + 1);
  //   }
  //   console.log(mintAmount);
  // };

  // const decrementMintAmount = () => {
  //   if (mintAmount > 1) {
  //     setMintAmount(mintAmount - 1);
  //     console.log(mintAmount);
  //   }
  // };

  // // TODO: VIP Mint Handler
  // const vipMintHandler = async () => {
  //   setIsMinting(true);

  //   const { success, status } = await vipMint(mintAmount);

  //   setStatus({
  //     success,
  //     message: status,
  //   });

  //   setIsMinting(false);
  // };

  // // TODO: PreSale Mint Handler
  // const presaleMintHandler = async () => {
  //   setIsMinting(true);

  //   const { success, status } = await presaleMint(mintAmount);

  //   setStatus({
  //     success,
  //     message: status,
  //   });

  //   setIsMinting(false);
  // };

  // // TODO: Public Mint Handler
  // const publicMintHandler = async () => {
  //   setIsMinting(true);

  //   const { success, status } = await publicMint(mintAmount);

  //   setStatus({
  //     success,
  //     message: status,
  //   });

  //   setIsMinting(false);
  // };

  return (
    <div className="h-full w-full overflow-hidden flex bg-gradient-to-br from-red-600 to-stone-900">
      <div className="h-full w-11/12 lg:w-7/12 bg-black bg-blend-color-dodge m-auto text-center">
        <div className="flex flex-col  h-full w-full px-2 md:px-10">
          <div className="relative z-1 w-full filter backdrop-blur-sm py-4 rounded-md px-2 md:px-10 flex flex-col">
            {wallet && (
              <button
                className="absolute left-1 bg-indigo-600 transition duration-200 ease-in-out font-chalk border-2 border-[rgba(0,0,0,1)] shadow-[0px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none px-4 py-2 rounded-md text-sm text-white tracking-wide uppercase"
                onClick={() =>
                  disconnect({
                    label: wallet.label,
                  })
                }
              >
                Disconnect
              </button>
            )}
            <header className="font-coiny uppercase h-1/5 text-3xl md:text-4xl font-bold pt-14 md:pt-4">
              {paused
                ? 'Paused'
                : isVipSale
                ? 'VIP Mint'
                : isPreSale
                ? 'Pre-Sale'
                : 'Public Sale'}
            </header>
            <h3 className="text-sm text-pink-200 tracking-widest md:pt-8">
              {/* If wallet is connected,  render abbreciated contract address*/}
              {wallet?.accounts[0]?.address
                ? wallet?.accounts[0]?.address.slice(0, 8) +
                  '...' +
                  wallet?.accounts[0]?.address.slice(-4)
                : ''}
            </h3>
          </div>
          <main className="flex flex-1 flex-wrap">
            <NftImage totalMinted={totalMinted} maxSupply={maxSupply} />
            <div className="flex flex-1 flex-col justify-between px-4 mt-16 md:mt-0">
              <div className="flex justify-between gap-4">
                <button
                  onClick={incrementMintAmount}
                  className="btn btn-square btn-lg text-white text-5xl pb-1"
                >
                  +
                </button>
                <h1 className="font-sans h-1/5 text-4xl text-center font-bold mt-2">
                  {mintAmount}
                </h1>
                <button
                  onClick={decrementMintAmount}
                  className="btn btn-square btn-lg justify-self-end text-white text-4xl pb-1"
                >
                  -
                </button>
              </div>
              <p>Max Mint Amount: {maxMintAmount}</p>
              <div className="flex flex-1 flex-col justify-center">
                <div className="font-coiny font-semibold flex text-2xl border-y border-gray-300 py-6">
                  <h1 className="justify-start">Total</h1>
                  <h1 className="ml-auto">
                    <span className="mr-1">
                      {Number.parseFloat(
                        (price / Math.pow(10, 18)) * mintAmount
                      ).toFixed(2)}
                    </span>
                    ETH + GAS
                  </h1>
                </div>
              </div>

              {/* Mint Button && Connect Wallet Button */}
              {wallet ? (
                <button
                  className={` ${
                    paused || isMinting
                      ? 'bg-gray-900 cursor-not-allowed'
                      : 'bg-gradient-to-br from-brand-purple to-brand-pink shadow-lg hover:shadow-pink-400/50'
                  } font-coiny mt-12 w-full px-6 py-3 rounded-md text-2xl text-white  mx-4 tracking-wide uppercase`}
                  disabled={paused || isMinting}
                  onClick={
                    isVipSale
                      ? vipMintHandler
                      : isPreSale
                      ? presaleMintHandler
                      : publicMintHandler
                  }
                >
                  {isMinting ? 'Minting...' : 'Mint'}
                </button>
              ) : (
                <button
                  className="btn btn-wide text-xl m-auto font-bold"
                  onClick={() => connect()}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </main>

          {/* Status */}
          {status && (
            <div
              className={`border ${
                status.success ? 'border-green-500' : 'border-brand-pink-400 '
              } rounded-md text-start h-full px-4 py-4 w-full mx-auto mt-8 md:mt-4"`}
            >
              <p className="flex flex-col space-y-2 text-white text-sm md:text-base break-words ...">
                {status.message}
              </p>
            </div>
          )}

          <ContractAddress />
        </div>
      </div>
    </div>
  );
}

export default App;
