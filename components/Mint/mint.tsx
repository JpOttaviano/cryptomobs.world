import React, { useCallback, useReducer, useEffect } from 'react'
import { ethers } from 'ethers'
import Button from '@mui/material/Button'
import WalletLink from 'walletlink'
import Image from 'next/image'

import Web3Modal from 'web3modal'

import { CONTRACT_ABI, CONTRACT_ADDRESS } from './contract'

import WalletConnectProvider from '@walletconnect/web3-provider'
import MintModal from './mintModal'
import styles from '../../styles/Home.module.css'
import caveImage from '../../public/escapecave.png'
import InfoCard from './infoCard'
import { Grid } from '@mui/material'

declare var window: any

const { INFURA_ID } = process.env

// TODO: Update to correct value
const MAX_AVAIL = 10

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
  web3Provider: '',
  signer: null,
  address: '',
  chainId: 0,
  network: 'none',
  balance: 0,
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
  const [minted, setMinted] = React.useState(0)
  const [supply, setSupply] = React.useState(0)
  const [available, setAvailable] = React.useState(0)

  const connect = useCallback(async function () {
    // This is the initial `provider` that is returned when
    // using web3Modal to connect. Can be MetaMask or WalletConnect.
    // const provider = await web3Modal.connect()

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.

    /*const web3Provider = new ethers.providers.Web3Provider(provider)

    const signer = web3Provider.getSigner()
    const address = await signer.getAddress()

    const network = await web3Provider.getNetwork()
    const balance = Number(
      ethers.utils.formatEther(await web3Provider.getBalance(address))
    )*/

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI
      // signer
    )

    // const minted = await contract.balanceOf(address)
    // setMinted(Number(minted))

    // const bigintsupply = await contract.totalSupply()
    setSupply(0)

    setAvailable(MAX_AVAIL - minted)

    // const greet = (await contract.greet()).toString()
    // setGreet(greet)
    // TODO: review get balance for signer

    dispatch({
      type: 'SET_WEB3_PROVIDER',
      provider,
      web3Provider,
      address,
      // network: network.name,
      // chainId: network.chainId,
      network: 'mainnet',
      chainId: 0,
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
        window.location.reload()
      }

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload()
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log('disconnect', error)
        disconnect()
        window.location.reload()
      }

      // window.ethereum.on('accountsChanged', handleAccountsChanged)

      /*provider.on('accountsChanged', handleAccountsChanged)
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
      }*/
    }
  }, [provider, disconnect])

  return (
    <div className={styles.description}>
      <Grid container={true} spacing={10} direction="column">
        <Grid item={true} />
        <Grid item={true}>
          <Button onClick={disconnect}>Disconect</Button>
        </Grid>
        <Grid item={true}>
          {false ? (
            <Button onClick={connect}>Connect</Button>
          ) : (
            <div>
              <Grid
                container={true}
                direction="row"
                spacing={15}
                className={styles.mintcontent}
              >
                <Grid item={true}>
                  <InfoCard
                    elem={
                      <div>
                        <h1>Total minted</h1>
                        <h1>{supply}</h1>
                      </div>
                    }
                  />
                </Grid>
                <Grid item={true}>
                  <InfoCard
                    elem={
                      <div>
                        <h1>You Own</h1>
                        <h1>{balance}</h1>
                      </div>
                    }
                  />
                </Grid>
                <Grid item={true}>
                  <InfoCard
                    elem={
                      <div>
                        <h1>Available</h1>
                        <h1>{available}</h1>
                      </div>
                    }
                  />
                </Grid>
              </Grid>
              <Grid
                container={true}
                direction="row"
                spacing={15}
                className={styles.mintcontent}
              >
                <Grid item={true}>
                  <h1> Your Address</h1>
                  0x06012c8cf97BEaD5deAe237070F9587f8E7A266d
                </Grid>
                <Grid item={true}>
                  <h1>Contract Address</h1>
                  {CONTRACT_ADDRESS}
                </Grid>
              </Grid>
              <p />
              <div>
                Please make sure that the contract address is correct when
                approving the mint transaction.
              </div>
              <p />
              <Grid
                container={true}
                direction="row"
                spacing={20}
                className={styles.mintcontent}
              >
                <Grid item={true}>
                  <MintModal
                    provider={web3Provider}
                    contract={contract}
                    signer={signer}
                  />
                </Grid>
                <Grid item={true}>
                  <Button onClick={disconnect}>Disconect</Button>
                </Grid>
              </Grid>
            </div>
          )}
        </Grid>
        <Grid item={true} />
      </Grid>
    </div>
  )
}
