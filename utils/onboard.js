import { init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import fortmaticModule from '@web3-onboard/fortmatic'
import walletConnectModule from '@web3-onboard/walletconnect'
import coinbaseWalletModule from '@web3-onboard/coinbase'
import ledgerModule from '@web3-onboard/ledger'


// const ETH_MAINNET_RPC = `https://mainnet.infura.io/v3/${INFURA_KEY}`
const RPC_URL = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL
console.log(RPC_URL)

const injected = injectedModule()
const walletConnect = walletConnectModule()
const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true })
const ledger = ledgerModule()
const fortmatic = fortmaticModule({ apiKey: process.env.NEXT_PUBLIC_FORTMATIC_KEY })

const initOnboard = init({
  wallets: [injected, walletConnect, coinbaseWalletSdk, ledger, fortmatic],
  chains: [
    //! {
    //!   id: '0x1',  // chain ID must be in hexadecimel
    //!   token: 'ETH',  // main chain token
    //!   label: 'Ethereum Mainnet',
    //!   rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`  // rpcURL required for wallet balances
    //! },
    // {
    //   id: '0x3',
    //   token: 'tROP',
    //   label: 'Ethereum Ropsten Testnet',
    //   rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`
    // },
    {
      id: '0x4',
      token: 'rETH',
      label: 'Ethereum Rinkeby Testnet',
      rpcUrl: RPC_URL
    }
    // {
    //   id: '0x38',
    //   token: 'BNB',
    //   label: 'Binance Smart Chain',
    //   rpcUrl: 'https://bsc-dataseed.binance.org/'
    // },
    // {
    //   id: '0x89',
    //   token: 'MATIC',
    //   label: 'Matic Mainnet',
    //   rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
    // },
    // {
    //   id: '0xfa',
    //   token: 'FTM',
    //   label: 'Fantom Mainnet',
    //   rpcUrl: 'https://rpc.ftm.tools/'
    // }
  ],
  appMetadata: {
    name: 'My App',
    icon: '<SVG_ICON_STRING>',
    logo: '<SVG_LOGO_STRING>',
    description: 'My app using Onboard',
    recommendedInjectedWallets: [ 
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' }
    ]
  }
})

export { initOnboard }

// const wallets = await onboard.connectWallet()

// console.log(wallets)