/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { providers, utils} from 'ethers'
import detectProvider from '@metamask/detect-provider';

const providerURL = 'https://rpc.api.moonbase.moonbeam.network';

const ConnectWallet = () => {
  const [account, setAccount] = useState();
  const [connected, setConnected] = useState(false);

  const provider = new providers.StaticJsonRpcProvider(providerURL, {
    chainId: 1287,
    name: 'moonbase-alphanet'
  });


  useEffect(async () => {
    // Check for changes in Metamask (account and chain)
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  const configureMoonbaseAlpha = async () => {
    const provider = await detectProvider({ mustBeMetaMask: true })
    if (provider) {
        console.log(provider, 'provider');
        try {
          const accounts = await provider.request({ method: "eth_requestAccounts"});
          await provider.request({
              method: "wallet_addEthereumChain",
              params: [
                  {
                      chainId: "0x507",
                      chainName: "Moonbase Alpha",
                      nativeCurrency: {
                          name: 'DEV',
                          symbol: 'DEV',
                          decimals: 18
                      },
                  rpcUrls: ["https://rpc.api.moonbase.moonbeam.network"],
                  blockExplorerUrls: ["https://moonbase.moonscan.io/"]
                  },
              ]
          })
          if (accounts) {
            console.log(`I -> ${accounts}`);
            setAccount(utils.getAddress(accounts[0]));
            setConnected(true);
            }
        } catch(e) {
            console.error(e);
            return e
        }  
    } else {
        console.error("Please install MetaMask");
        return "Please install MetaMask"
    }
}

  const onConnect = async () => {
     await configureMoonbaseAlpha()
  };

  return (
    <div>{connected ? (
      <div className="btn theme-btn-1 btn-effect-4 text-uppercase">
        Connected
      </div>
    ) : (
      <div className="btn theme-btn-1 btn-effect-4 text-uppercase" onClick={onConnect}>
        Connect MetaMask
      </div>
    )}</div>
  )
}

export default ConnectWallet