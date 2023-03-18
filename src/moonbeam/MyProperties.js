import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextWeb3 from "./ContextWeb3";
import { bonvoPropertyContractAddress } from "../utils/constants";
import { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { fillPropertyAssetFromJsonMetadata, getAllListings, getPropertyInfo, listProperty } from "../components/helpers/bonvoProperties";

export const MyProperties = ({ user }) => {
    const { state } = useContext(ContextWeb3);

    const [properties, setProperties] = useState([]);
    const [fetchAll, setFetchAll] = useState(false);
    const [fetchTokenId, setFetchTokenId] = useState(false);
    const [fetchProperties, setFetchProperties] = useState(false);
    const [tokenIds, setTokenIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasTransfer, setHasTransfer] = useState("");
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
            if (state.address && fetchTokenId) {
                try {
                    const { ethereum } = window;
                    if (ethereum) {
                        if (tokenIds.length > 0) {
                            let assets = [];
                            let listedProperties = await getAllListings();
                            for (const tokenId of tokenIds) {
                                const isOnRent = listedProperties.some(lp => Number(lp.tokenId) === Number(tokenId));
                                const propertyInfo = await getPropertyInfo(tokenId);
                                const propAsset = {
                                    tokenId: tokenId,
                                    isOnRent,
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

    useEffect(() => {
        if (properties.length > 0 && !fetchAll && fetchTokenId && fetchProperties) {
            if (properties.length === tokenIds.length && properties[0].image !== "") {
                setFetchAll(true);
                console.log("fetchAll", fetchAll);
            }
        }
    }, [
        properties,
        fetchAll,
        fetchTokenId,
        fetchProperties,
        tokenIds,
    ]);

    async function handleRent(propertyId) {
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

        const pricePerDay = ethers.utils.parseEther('20');
        const deposit = ethers.utils.parseEther('10');
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(state.address);
        const success = await listProperty(propertyId, pricePerDay, deposit, signer);
        if (success) {
            toast.update(id, {
                render: `Property listed correctly`,
                type: "success",
                isLoading: false,
            });
            return;
        }
        toast.update(id, {
            render: `There was an error while listing the property`,
            type: "error",
            isLoading: false,
        });
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
                                <FormattedMessage id="myaccount-my-props-list-property" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchAll &&
                            properties?.map((property, index) => (
                                <tr key={index}>
                                    <td className="ltn__my-properties-table-img">
                                        <img
                                            src={property.images[0]}
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
                                        {
                                            loading ?
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                                :
                                                property?.isOnRent ?
                                                    <button className="btn btn-primary btn-sm">
                                                        Listed
                                                    </button>
                                                    :
                                                    <button className="btn btn-primary btn-sm" onClick={(e) => handleRent(property?.tokenId)}>
                                                        List Property
                                                    </button>
                                        }
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
