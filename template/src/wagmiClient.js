import { createClient, configureChains, 
  // mainnet as devchain, // mainnet 
  goerli as devchain // testnet
} from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
  [devchain],
  [alchemyProvider({ apiKey: process.env.YOUR_ALCHEMY_API_KEY }), publicProvider()],
)


// Set up client
export default createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
      appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
      qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
      name: 'Injected',
      shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})
