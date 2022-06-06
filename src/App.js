import NftImage from './components/NftImage';
import ContractAddress from './components/ContractAddress';
import Status from './components/Status';
import { useEffect, useContext } from 'react';
import { useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react';

import MintingContext from './context/MintingContext';
import MintAmount from './components/MintAmount';

function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
  const connectedWallets = useWallets();

  const {
    maxMintAmount,
    price,
    paused,
    isPublicSale,
    isPreSale,
    isVipSale,
    onboard,
    mintAmount,
    isMinting,
    vipMintHandler,
    presaleMintHandler,
    publicMintHandler,
  } = useContext(MintingContext);

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

  return (
    <div className="h-full w-full flex bg-gradient-to-br from-stone-900 to-red-900">
      <div className="h-full w-11/12 lg:w-7/12 bg-black m-auto justify-center text-center overflow-auto">
        <div className="flex flex-col  h-full w-full px-2 md:px-10 object-cover">
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
            <header className="font-coiny uppercase h-1/5 text-3xl md:text-4xl font-bold pt-14 md:pt-4 text-brand-red">
              {paused
                ? 'Paused'
                : isVipSale
                ? 'VIP Mint'
                : isPreSale
                ? 'Pre-Sale'
                : 'Public Sale'}
            </header>
            <h3 className="text-sm text-white tracking-widest pt-8 md:pt-8">
              {/* If wallet is connected,  render abbreciated contract address*/}
              {wallet?.accounts[0]?.address
                ? wallet?.accounts[0]?.address.slice(0, 8) +
                  '...' +
                  wallet?.accounts[0]?.address.slice(-4)
                : ''}
            </h3>
          </div>
          <main className="flex flex-1 flex-wrap">
            <NftImage />
            <div className="flex flex-1 flex-col justify-between px-4 mt-16 md:mt-0">
              <MintAmount />
              <p className="text-white">Max Mint Amount: {maxMintAmount}</p>
              <div className="flex flex-1 flex-col justify-center mt-3">
                <div className="font-coiny font-semibold flex text-xl border-y border-gray-300 py-6">
                  <h1 className="justify-start text-brand-yellow">Total</h1>
                  <h1 className="ml-auto text-brand-dark-grey">
                    <span className="mr-2 text-brand-yellow">
                      {Number.parseFloat(
                        (price / Math.pow(10, 18)) * mintAmount
                      ).toFixed(2)}{' '}
                      ETH
                    </span>
                    + GAS
                  </h1>
                </div>
              </div>

              {/* Mint Button && Connect Wallet Button */}
              {wallet ? (
                <button
                  className={` ${
                    paused || isMinting
                      ? 'bg-gray-900 cursor-not-allowed'
                      : 'bg-gradient-to-br from-brand-charcoal to-brand-red shadow-lg hover:shadow-red-500/50'
                  } font-coiny mt-8 w-full px-6 py-3 rounded-md text-2xl text-white  mx-4  mb-4 tracking-wide uppercase`}
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
                  className="font-coiny mt-8 w-full px-6 py-3 rounded-md text-2xl text-white  mx-4  mb-4 tracking-wide uppercase bg-gradient-to-br from-brand-charcoal to-brand-red shadow-lg hover:shadow-red-500/50"
                  onClick={() => connect()}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </main>

          {/* Status */}
          <Status />
          <ContractAddress />
        </div>
      </div>
    </div>
  );
}

export default App;
