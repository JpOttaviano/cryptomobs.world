import React, { useCallback, useReducer, useEffect } from 'react'
import { ethers } from 'ethers'
import Button from '@mui/material/Button'
import WalletLink from 'walletLink'

import Web3Modal from 'web3modal'

import { CONTRACT_ABI, CONTRACT_ADDRESS } from './contract'

import WalletConnectProvider from '@walletconnect/web3-provider'
import MintModal from './mintModal'

declare var window: any

const { INFURA_ID } = process.env

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
  'custom-walletlink': {
    display: {
      logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
      name: 'Coinbase',
      description: 'Connect to Coinbase Wallet (not Coinbase App)',
    },
    options: {
      appName: 'Coinbase', // Your app name
      networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      chainId: 1,
    },
    package: WalletLink,
    connector: async (_: any, options: any) => {
      const { appName, networkUrl, chainId } = options
      const walletLink = new WalletLink({
        appName,
      })
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
      await provider.enable()
      return provider
    },
  },
}

let web3Modal: Web3Modal
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
  })
}

type StateType = {
  provider?: any
  web3Provider?: any
  contract?: any
  signer?: any
  address?: string
  chainId?: number
  balance?: number
  network?: string
}

type ActionType =
  | {
      type: 'SET_WEB3_PROVIDER'
      provider?: StateType['provider']
      web3Provider?: StateType['web3Provider']
      contract?: StateType['contract']
      signer?: StateType['signer']
      address?: StateType['address']
      chainId?: StateType['chainId']
      balance?: StateType['balance']
      network?: StateType['network']
    }
  | {
      type: 'SET_ADDRESS'
      address?: StateType['address']
    }
  | {
      type: 'SET_CHAIN_ID'
      chainId?: StateType['chainId']
    }
  | {
      type: 'RESET_WEB3_PROVIDER'
    }

const initialState: StateType = {
  provider: null,
  web3Provider: null,
  signer: null,
  address: '',
  chainId: 0,
  network: 'none',
  balance: -1,
}

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'SET_WEB3_PROVIDER':
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
        balance: action.balance,
        network: action.network,
        contract: action.contract,
        signer: action.signer,
      }
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.address,
      }
    case 'SET_CHAIN_ID':
      return {
        ...state,
        chainId: action.chainId,
      }
    case 'RESET_WEB3_PROVIDER':
      return initialState
    default:
      throw new Error()
  }
}

export default function Mint({}) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    provider,
    web3Provider,
    address,
    chainId,
    balance,
    network,
    contract,
    signer,
  } = state
  const [gerliSupply, setGerliSupply] = React.useState(0)

  const connect = useCallback(async function () {
    // This is the initial `provider` that is returned when
    // using web3Modal to connect. Can be MetaMask or WalletConnect.
    const provider = await web3Modal.connect()

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new ethers.providers.Web3Provider(provider)

    const signer = web3Provider.getSigner()
    const address = await signer.getAddress()

    const network = await web3Provider.getNetwork()
    const balance = Number(
      ethers.utils.formatEther(await web3Provider.getBalance(address))
    )

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    )

    const grlySup = ethers.utils.formatUnits(await contract.totalSupply())
    setGerliSupply(Number(grlySup))

    //const greet = (await contract.greet()).toString()
    //setGreet(greet)
    // TODO: review get balance for signer

    dispatch({
      type: 'SET_WEB3_PROVIDER',
      provider,
      web3Provider,
      address,
      network: network.name,
      chainId: network.chainId,
      balance,
      contract,
      signer,
    })
  }, [])

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider()
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      }
      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      })
    },
    [provider]
  )

  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect()
    }
  }, [connect])

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        // eslint-disable-next-line no-console
        console.log('accountsChanged', accounts)
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        })
      }

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload()
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log('disconnect', error)
        disconnect()
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      // TODO add contracts listeners 

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])

  return (
    <div>
      {!web3Provider ? (
        <Button onClick={connect}>Connect</Button>
      ) : (
        <div>
          <h1>Goerly supply</h1>
          <h2>{gerliSupply}</h2>
          <h1>Network</h1>
          {network}
          <h1>balance</h1>
          {balance}
          <h1>Address</h1>
          {address}
          <Button onClick={disconnect}>Disconect</Button>

          <MintModal
            provider={web3Provider}
            contract={contract}
            signer={signer}
          />
        </div>
      )}
    </div>
  )
}
