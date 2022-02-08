import React, { useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers"

import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contract"

declare var window: any

async function requestAccount() {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.log("error");
      console.error(error);
      alert("Login to Metamask first");
    }
  }

export default function Mint({}) {

    const [balance , setBalance] = useState(-1);
    const [account , setAccount] = useState("");
    const [network , setNetwork] = useState("");
    const [goerliSupply, setGoerliSupply] = useState(0);

    const [contractName, setContractName] = useState("");
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    let provider: Web3Provider

    React.useEffect(() => {
        window.ethereum ?
            provider = new ethers.providers.Web3Provider(window.ethereum) :
            console.log("Please install MetaMask")
        provider?.send("eth_requestAccounts", [])
        const account = provider?.getSigner()
        provider?.getNetwork().then(network => {
            setNetwork(network.name)

        })
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider?.getSigner())
        account?.getBalance
        account?.getBalance().then(balance => {
            setBalance(Number (ethers.utils.formatEther(balance)))
        })
        account?.getAddress().then(address => {
          setAccount(address)
        })
        contract.totalSupply().then( (supply: any) => {
            setGoerliSupply(Number(supply))
        })

        contract.name().then( (name: string) => {
            setContractName(name)
        })

     }, []);
    return(
        <div>
            <h1>Network</h1>
            {network}
            <h1>balance</h1>
            {balance}
            <h1>Address</h1>
            {account}

            <h1>Contract name</h1>
            {contractName}
            <h1>Contract Supply</h1>
            {goerliSupply}
        </div>
    )
}