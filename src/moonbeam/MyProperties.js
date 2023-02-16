import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextWeb3 from "./ContextWeb3";
import { bonvoEscrowContractAddress, bonvoPropertyContractAddress } from "../utils/constants";
import { useCallback } from "react";
import {
    sendNftBack,
    sendNftToDest,
    updateContractsOnChainConfig,
} from "../utils/SendNFT";
import { FormattedMessage } from "react-intl";
import { fillPropertyAssetFromJsonMetadata, getAllListings, getPropertyInfo } from "../components/helpers/bonvoProperties";

const chains = require("../config/testnet.json");

export const MyProperties = ({ user }) => {
    let publicUrl = process.env.PUBLIC_URL + "/";
    const { state } = useContext(ContextWeb3);

    const [properties, setProperties] = useState([]);
    const [fetchAll, setFetchAll] = useState(false);
    const [fetchTokenId, setFetchTokenId] = useState(false);
    const [fetchProperties, setFetchProperties] = useState(false);
    const [tokenIds, setTokenIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [txhash, setTxhash] = useState("");
    const [owner, setOwner] = useState("");
    const [hasTransfer, setHasTransfer] = useState("");
    const [destTxHash, setDestTxHash] = useState("");
    const request = `https://api-moonbase.moonscan.io/api?module=account&action=tokennfttx&address=${state.address}&startblock=0&endblock=999999999&sort=asc`;
    useEffect(() => {
        const fetchProperties = async () => {
            if (state.address?.length > 0) {
                let tokenIds = [];
                let tokenIds2 = [];
                await fetch(request)
                    .then((res) => res.json())
                    .then((data) => {
                        let allTokens = data.result;
                        let hasTransfer = allTokens.filter(
                            (item) =>
                                item.contractAddress.toLowerCase() === bonvoPropertyContractAddress.toLowerCase() &&
                                item.from === state.address
                        );
                        if (hasTransfer.length > 0) {
                            tokenIds2 = hasTransfer.map((item) => item.tokenID);
                            setHasTransfer(tokenIds2);
                        }
                        let res = data.result.filter(
                            (item) =>
                                item.contractAddress.toLowerCase() === bonvoPropertyContractAddress.toLowerCase() &&
                                item.to === state.address
                        );
                        tokenIds = res.map((item) => item.tokenID);
                        tokenIds = tokenIds.filter(tid => tid > 4);
                        setTokenIds(tokenIds);
                        setFetchTokenId(true);
                    });
            }
        };
        if (!fetchTokenId) {
            fetchProperties();
        }
    }, [state.address, request, fetchTokenId, tokenIds]);

    /* Fetch Asset */
    useEffect(() => {
        const fetchAsset = async () => {
            if (state.address && user.idUser === "" && fetchTokenId) {
                try {
                    const { ethereum } = window;
                    if (ethereum) {
                        if (tokenIds.length > 0) {
                            let assets = [];
                            for (const tokenId of tokenIds) {
                                const propertyInfo = await getPropertyInfo(tokenId);                                
                                const propAsset = {
                                    tokenId: tokenId,
                                    ...fillPropertyAssetFromJsonMetadata(propertyInfo),
                                };
                                assets.push(propAsset);
                            }

                            setProperties(assets);
                        }
                    }
                } catch (error) {
                    console.log("error", error);
                }
            }
        };
        if (!fetchAll && !fetchProperties && fetchTokenId) {
            fetchAsset();
            if (tokenIds.length === properties.length) {
                console.log("fetchProperties");
                setFetchProperties(true);
            }
        }
    }, [
        user,
        state,
        tokenIds,
        fetchTokenId,
        fetchProperties,
        fetchAll,
        properties,
    ]);

    const fetchImages = useCallback(async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner(state.address);
                // const contract = new ethers.Contract(
                //   nftContractAddress,
                //   nftABI,
                //   signer
                // );
                // if (
                //   tokenIds.length > 0 &&
                //   properties.length > 0 &&
                //   !fetchAll &&
                //   fetchProperties
                // ) {
                //   let assets = [...properties];
                //   properties.map(async (item, idx) => {
                //     await contract.tokenURI(item.tokenId).then(async (tx) => {
                //       let res = await fetch(tx);
                //       let data = await res.json();
                //       if (data.image.split("/")[0] === "ipfs:") {
                //         let ipfs = data.image.split("/")[2];
                //         await fetch(
                //           `https://${ipfs}.ipfs.dweb.link/metadata.json`
                //         ).then(async (res) => {
                //           let data = await res.json();
                //           let cid = data.image.split("/")[2];
                //           let name = data.image.split("/")[3];
                //           assets[idx].image = `https://${cid}.ipfs.dweb.link/${name}`;
                //         });
                //       } else {
                //         assets[idx].image = data.image;
                //       }
                //     });
                //   });
                //   setProperties(assets);
                // }
                // if (
                //   tokenIds.length === 1 &&
                //   properties.length === 1 &&
                //   !fetchAll &&
                //   fetchProperties
                // ) {
                //   await contract.tokenURI(tokenIds).then(async (tx) => {
                //     let res = await fetch(tx);
                //     let data = await res.json();
                //     let newProperties = [...properties];
                //     newProperties[0].image = data.image;
                //     setProperties(newProperties);
                //   });
                // }
            }
        } catch (error) {
            console.log("error", error);
        }
    }, [tokenIds, properties, fetchAll, state, fetchProperties]);

    useEffect(() => {
        if (properties.length > 0 && !fetchAll && fetchTokenId && fetchProperties) {
            fetchImages();
            if (properties.length === tokenIds.length && properties[0].image !== "") {
                setFetchAll(true);
                console.log("fetchAll", fetchAll);
            }
        }
    }, [
        properties,
        fetchAll,
        fetchImages,
        fetchTokenId,
        fetchProperties,
        tokenIds,
    ]);

    const moonbeamChain = chains.find((chain) => chain.name === "Moonbeam");
    const polygonChain = chains.find((chain) => chain.name === "Polygon");

    async function handleSendSource(e, tokenId) {
        alert('No entiendo qué es esto.');
        return;
        updateContractsOnChainConfig(moonbeamChain, state.address);
        updateContractsOnChainConfig(polygonChain, state.address);
        e.preventDefault();
        setLoading(true);
        const id = toast.loading(
            "Transacción en progreso. Por favor, espere la confirmación...",
            {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }
        );
        const onSrcConfirmed = (txhash) => {
            setDestTxHash("");
            toast.update(id, {
                render: `
        Transacción realizada correctamente! 🎉
        `,
                type: "success",
                isLoading: false,
                autoClose: 5000,
            });
            setLoading(false);
            setTxhash(txhash);
        };

        const onSent = (owner) => {
            setOwner(owner);
            setLoading(false);
        };

        await sendNftToDest(onSrcConfirmed, onSent, tokenId);
    }

    async function handleSendBack(e, tokenId) {
        e.preventDefault();
        setLoading(true);
        const id = toast.loading(
            "Transacción en progreso. Por favor, espere la confirmación...",
            {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }
        );
        const onSrcConfirmed = (txhash) => {
            setDestTxHash("");
            toast.update(id, {
                render: `
        Transacción realizada correctamente! 🎉
        `,
                type: "success",
                isLoading: false,
                autoClose: 5000,
            });
            setTxhash(txhash);
            setLoading(false);
        };

        const onSent = (owner) => {
            setOwner(owner);
            setLoading(false);
        };

        await sendNftBack(onSrcConfirmed, onSent, tokenId);
    }

    return (
        <div className="ltn__myaccount-tab-content-inner">
            <div className="ltn__my-properties-table table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">
                                <FormattedMessage id="myaccount-my-props-title" />
                            </th>
                            <th scope="col" />
                            <th scope="col">
                                <FormattedMessage id="myaccount-my-props-date" />
                            </th>
                            <th scope="col">
                                <FormattedMessage id="myaccount-my-props-change-network" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchAll &&
                            properties?.map((property, index) => (
                                <tr key={index}>
                                    <td className="ltn__my-properties-table-img">
                                        <img
                                            src={property.image}
                                            alt="Property"
                                            width={100}
                                            height={100}
                                        />
                                    </td>
                                    <td className="ltn__my-properties-table-title">
                                        <h4>
                                            <Link to="/property-details">
                                                {property?.staticData.title}
                                            </Link>
                                        </h4>
                                        <span>{property?.staticData.location}</span>
                                    </td>
                                    <td className="ltn__my-properties-table-date">
                                        <span>{property?.timestamp}</span>
                                    </td>
                                    <td className="ltn__my-properties-table-red">
                                        {loading ? (
                                            <div
                                                className="spinner-border text-primary"
                                                role="status"
                                            >
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        ) : hasTransfer.includes(property?.tokenId.toString()) ? (
                                            <button
                                                className="btn
                      btn-primary btn-sm"
                                                onClick={(e) => handleSendBack(e, property?.tokenId)}
                                            >
                                                Traer de Polygon
                                            </button>
                                        ) : (
                                            <button
                                                className="btn
                    btn-primary btn-sm"
                                                onClick={(e) => handleSendSource(e, property?.tokenId)}
                                            >
                                                Enviar a Polygon
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className="ltn__pagination-area text-center">
                <div className="ltn__pagination">
                    <ul>
                        <li>
                            <Link to="#">
                                <i className="fas fa-angle-double-left" />
                            </Link>
                        </li>
                        <li>
                            <Link to="#">1</Link>
                        </li>
                        <li className="active">
                            <Link to="#">2</Link>
                        </li>
                        <li>
                            <Link to="#">3</Link>
                        </li>
                        <li>
                            <Link to="#">...</Link>
                        </li>
                        <li>
                            <Link to="#">10</Link>
                        </li>
                        <li>
                            <Link to="#">
                                <i className="fas fa-angle-double-right" />
                            </Link>
                        </li>
                    </ul>
                </div>
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </div>
    );
};
