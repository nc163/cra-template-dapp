import { useAccount, useConnect, useDisconnect } from 'wagmi'

import logo from './logo.svg';
import './App.css';

function Dapp() {

  const { address, connector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className='Wallet'>
        {isConnected && (
          <div>
            <div>{address}</div>
              <div>Connected to {connector.name}</div>
              <button onClick={disconnect}>Disconnect</button>
          </div>
        )}
        {connectors.map((connector) => (
          <button
            className="Wallet-connect-btn"
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading && connector.id === pendingConnector?.id &&' (connecting)'}
          </button>
        ))}
        {error && <div className='Error-msg'>{error.message}</div>}
      </div>
    </div>
  );
}

export default Dapp;
