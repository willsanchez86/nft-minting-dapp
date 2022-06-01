import NftImage from './components/NftImage';
import { useState, useEffect } from 'react'
import { initOnboard } from 'utils/onboard'
import { useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react'
// import {
//   getTotalMinted,
//   getMaxSupply,
//   isPausedState,
//   isPublicSaleState,
//   isPreSaleState,
//   isVipSaleState,
//   vipMint,
//   presaleMint,
//   publicMint
// } from '../utils/interact'

import CollectionConfig from 'config/CollectionConfig'

function App() {
//   const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
//   const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
//   const connectedWallets = useWallets()

//   const [maxSupply, setMaxSupply] = useState(0)
//   const [totalMinted, setTotalMinted] = useState(0)
//   const [maxMintAmount, setMaxMintAmount] = useState(0)
//   const [paused, setPaused] = useState(false)
//   const [isPublicSale, setIsPublicSale] = useState(false)
//   const [isPreSale, setIsPreSale] = useState(false)

//   const [status, setStatus] = useState(null)
//   const [mintAmount, setMintAmount] = useState(1)
//   const [isMinting, setIsMinting] = useState(false)
//   const [onboard, setOnboard] = useState(null)

//   useEffect(() => {
//     setOnboard(initOnboard)
//   }, [])


  return (
    <div className="min-h-screen h-full w-full overflow-hidden flex bg-gradient-to-br from-red-300 to-stone-900">
      <div className="h-5/6 w-11/12 md:w-1/2 bg-black bg-blend-color-dodge m-auto text-center">
        <div className="flex flex-col h-full">
          <header className="font-coiny uppercase h-1/5 text-5xl font-bold p-10">PUBLIC SALE</header>
          <main className="flex flex-1 flex-wrap">
            <div className="flex flex-1 p-8">
              <NftImage />
            </div>
            <div className="flex flex-1 flex-col p-12">
              <div className="flex justify-between gap-4">
                <button className="btn btn-square btn-lg text-white text-5xl pb-1">+</button>
                <h1 className="font-sans h-1/5 text-4xl text-center font-bold mt-2">1</h1>
                <button className="btn btn-square btn-lg justify-self-end text-white text-4xl pb-1">-</button>
              </div>
              <p>Max Mint Amount: 5</p>
              <div className="flex flex-1 flex-col justify-center">
                <div className="flex text-3xl">
                  <h1 className="justify-start">Total</h1>
                  <h1 className="ml-auto"><span>0.1</span>ETH + GAS</h1>
                </div>
              </div>
              <button className="btn btn-wide text-xl m-auto font-bold">Connect Wallet</button>
            </div>
          </main>
          <footer className="h-1/5 p-3 border-t border-gray-300">
            <h1 className="font-sans text-2xl font-bold p-4">CONTRACT ADDRESS</h1>
            <p>{CollectionConfig.contractAddress}</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
