/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { ethers, providers, utils } from "ethers";
import detectProvider from "@metamask/detect-provider";
import { Link } from "react-router-dom";

const providerURL = "https://rpc-mumbai.maticvigil.com";

const initialState = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      localStorage.setItem("address", action.address);
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      };
    case "SET_CHAIN_ID":
      return {
        ...state,
        chainId: action.chainId,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "RESET_WEB3_PROVIDER":
      localStorage.removeItem("address");
      return initialState;
    default:
      throw new Error();
  }
};

const ConnectWallet = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { provider, web3Provider, address, chainId } = state;

  useEffect(() => {
    const init = async () => {
      if (localStorage.getItem("address")) {
        PolygonChain();
      }
      // Check for changes in Metamask (account and chain)
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", (accounts) => {
          if (accounts.length > 0) {
            dispatch({
              type: "SET_ADDRESS",
              address: accounts[0],
            });
          } else {
            dispatch({
              type: "RESET_WEB3_PROVIDER",
            });
          }
        });
        window.ethereum.on("chainChanged", async (chainId) => {
          const provider = await detectProvider({ mustBeMetaMask: true });
          if (chainId !== "0x13881") {
            await provider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x13881" }],
            });
          }
        });
      }
    };
    init();
  }, []);

  const PolygonChain = useCallback(async () => {
    const provider = await detectProvider({ mustBeMetaMask: true });

    try {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x13881",
            chainName: "Polygon Mumbai Testnet",
            rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
            nativeCurrency: {
              name: "Mumbai Matic",
              symbol: "MATIC",
              decimals: 18,
            },
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
          },
        ],
      });

      const address = accounts[0];
      const web3Provider = new providers.StaticJsonRpcProvider(providerURL, {
        chainId: 80001,
        name: "mumbai",
      });

      dispatch({
        type: "SET_WEB3_PROVIDER",
        provider,
        web3Provider,
        address,
        chainId: 80001,
      });
    } catch (addError) {
      console.log(addError);
    }
  }, []);

  // const configureMoonbaseAlpha = async () => {
  //   const provider = await detectProvider({ mustBeMetaMask: true });
  //   if (provider) {
  //     console.log(provider, "provider");
  //     try {
  //       const accounts = await provider.request({
  //         method: "eth_requestAccounts",
  //       });
  //       await provider.request({
  //         method: "wallet_addEthereumChain",
  //         params: [
  //           {
  //             chainId: "0x507",
  //             chainName: "Moonbase Alpha",
  //             nativeCurrency: {
  //               name: "DEV",
  //               symbol: "DEV",
  //               decimals: 18,
  //             },
  //             rpcUrls: ["https://rpc.api.moonbase.moonbeam.network"],
  //             blockExplorerUrls: ["https://moonbase.moonscan.io/"],
  //           },
  //         ],
  //       });
  //       if (accounts) {
  //         console.log(`I -> ${accounts}`);
  //         setAccount(utils.getAddress(accounts[0]));
  //         setConnected(true);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //       return e;
  //     }
  //   } else {
  //     console.error("Please install MetaMask");
  //     return "Please install MetaMask";
  //   }
  // };

  const onConnect = useCallback(async () => {
    await PolygonChain();
  }, []);

  const disconnect = useCallback(
    async function () {
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      dispatch({
        type: "RESET_WEB3_PROVIDER",
      });
    },
    [provider]
  );

  useEffect(() => {
    if (provider?.on) {
      const handleDisconnect = (error) => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  return (
    <div>
      {address ? (
        <div className="ltn__drop-menu user-menu">
          <ul>
            <li>
              <div className="btn theme-btn-1 text-uppercase">
                {address?.slice(0, 6) + "..." + address?.slice(-4)}
              </div>
              <ul className="go-top">
                <li>
                  <Link to="/my-account">My Account</Link>
                </li>
                <li style={{ cursor: "pointer" }} onClick={disconnect}>
                  Disconnect
                </li>
              </ul>
            </li>
          </ul>
        </div>
      ) : (
        <button
          className="btn theme-btn-1 btn-effect-4 text-uppercase"
          onClick={onConnect}
          style={{ padding: "10px 40px" }}
        >
          Connect MetaMask
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
