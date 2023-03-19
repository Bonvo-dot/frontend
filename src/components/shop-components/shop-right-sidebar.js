import { ethers, FixedNumber } from "ethers";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ContextWeb3 from "../../moonbeam/ContextWeb3";
import { FormattedMessage } from "react-intl";
import Sidebar from "./shop-sidebar";
import useGeoLocation from "../helpers/useGeoLocation";
import { getAllListings, getPropertyInfo } from "../helpers/bonvoProperties";
import messages from "../../i18n/messages";
import Medals from "../global-components/medals";
import './shop-right-sidebar.css';

const ShopGridV1 = () => {
    let publicUrl = process.env.PUBLIC_URL + "/";
    const { state } = useContext(ContextWeb3);
    const [assets, setAssets] = useState([]);
    const [assetsMedals, setAssetsMedals] = useState([]);
    const [propLoaded, setPropLoaded] = useState(false);
    const location = useGeoLocation();
    const [locationUser, setLocationUser] = useState({
        latitude: 0,
        longitude: 0,
        ISOCountry: "",
    });
    const [filterByCategory, setFilterByCategory] = useState("");
    const [filterByCountry, setFilterByCountry] = useState("");
    const [filterByPrice, setFilterByPrice] = useState("");
    const [filterByDistance, setFilterByDistance] = useState("");
    const [filterByReputation, setFilterByReputation] = useState("");
    const [filterByRating, setFilterByRating] = useState("");

    useEffect(() => {
        const stored_location = JSON.parse(
            localStorage.getItem("stored_location")
        );
        if (stored_location) {
            setLocationUser(stored_location);
        } else {
            if (location?.coordinates?.lat && locationUser.latitude === 0) {
                const location_to_storage = {
                    latitude: FixedNumber.from(
                        `${location.coordinates.lat}`,
                        "fixed128x18"
                    ),
                    longitude: FixedNumber.from(
                        `${location.coordinates.lng}`,
                        "fixed128x18"
                    ),
                    ISOCountry: location.countryName,
                };
                setLocationUser(location_to_storage);
                localStorage.setItem(
                    "stored_location",
                    JSON.stringify(location_to_storage)
                );
            }
        }
    }, [location]);

    /* Fecth Asset by id */
    useEffect(() => {
        const fetchAssets = async () => {
            if (state.address && assets.length === 0) {
                try {
                    const listedProperties = await getAllListings();
                    setAssets(listedProperties);
                    setPropLoaded((loaded) => [true]);
                } catch (error) {
                    console.log("error", error);
                }
            }
        };
        fetchAssets();
    }, [state, locationUser]);

    useEffect(() => {
        const fetchAssetByCategory = async () => {
            if (state.address && filterByCategory !== "") {
                try {
                    const { ethereum } = window;
                    if (ethereum) {
                        const provider = new ethers.providers.Web3Provider(
                            ethereum
                        );
                        const signer = provider.getSigner(state.address);
                    }
                } catch (error) {
                    console.log("error", error);
                }
            }
        };
        fetchAssetByCategory();
    }, [state, locationUser, filterByCategory]);

    return (
        <div>
            <div className="ltn__product-area ltn__product-gutter">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8  mb-100">
                            <div className="tab-content">
                                <div
                                    className="tab-pane fade active show"
                                    id="liton_product_grid"
                                >
                                    <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                                        <div className="row">
                                            {!propLoaded && !assets.length && (
                                                <FormattedMessage id="properties-helper-accept-location" />
                                            )}
                                            {propLoaded && !assets.length && (
                                                <FormattedMessage id="properties-helper-connected-network" />
                                            )}
                                            {/* ltn__product-item */}
                                            {assets.map((asset) => (
                                                <div
                                                    className="col-xl-6 col-sm-6 col-12"
                                                    key={asset.tokenId}
                                                >
                                                    <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5 text-center---">
                                                        <div className="product-img go-top">
                                                            <Link
                                                                to={`/product-details/${asset.tokenId}`}
                                                            >
                                                                <img
                                                                    src={
                                                                        asset.images !==
                                                                            "" &&
                                                                        !asset.images[0]
                                                                            .split(
                                                                                "/"
                                                                            )
                                                                            .includes(
                                                                                "undefined"
                                                                            )
                                                                            ? asset
                                                                                  .images[0]
                                                                            : publicUrl +
                                                                              "assets/img/houses/house" +
                                                                              (asset.tokenId +
                                                                                  1) + //(Math.floor(Math.random() * 5) + 1) +
                                                                              ".jpg"
                                                                    }
                                                                    alt="#"
                                                                />
                                                            </Link>

                                                            <div className="real-estate-agent">
                                                                <div className="agent-img">
                                                                    <Link to="/shop">
                                                                        <img
                                                                            src={
                                                                                asset.ownerData &&
                                                                                asset
                                                                                    .ownerData
                                                                                    .image !==
                                                                                    ""
                                                                                    ? asset
                                                                                          .ownerData
                                                                                          .image
                                                                                    : publicUrl +
                                                                                      "assets/img/user.webp"
                                                                            }
                                                                            alt={
                                                                                asset.ownerData &&
                                                                                asset
                                                                                    .ownerData
                                                                                    .firstName !==
                                                                                    ""
                                                                                    ? asset
                                                                                          .ownerData
                                                                                          .firstName
                                                                                    : asset
                                                                                          .ownerData
                                                                                          .address
                                                                            }
                                                                        />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="product-info">
                                                            <div className="product-badge">
                                                                <ul>
                                                                    <li className="sale-badg">
                                                                        <FormattedMessage id="properties-rent" />
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <h2 className="product-title go-top">
                                                                <Link
                                                                    to={`/product-details/${asset.tokenId}`}
                                                                >
                                                                    {
                                                                        asset
                                                                            .staticData
                                                                            .title
                                                                    }
                                                                </Link>
                                                            </h2>
                                                            <div className="product-img-location go-top">
                                                                <ul>
                                                                    <li>
                                                                        <Link to="/contact">
                                                                            <i className="flaticon-pin" />
                                                                            {
                                                                                asset
                                                                                    .staticData
                                                                                    .location
                                                                            }
                                                                            ,
                                                                            {
                                                                                asset.ISOCountry
                                                                            }
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <ul className="ltn__list-item-2--- ltn__list-item-2-before--- ltn__plot-brief">
                                                                <li>
                                                                    <span className="ltn__secondary-color rooms-card">
                                                                        {
                                                                            asset
                                                                                .staticData
                                                                                .rooms
                                                                        }
                                                                    </span>
                                                                    <FormattedMessage id="properties-rooms" />
                                                                </li>
                                                                <li>
                                                                    <span>
                                                                        {
                                                                            asset
                                                                                .staticData
                                                                                .size
                                                                        }
                                                                    </span>
                                                                    m2
                                                                </li>
                                                            </ul>
                                                            <div className="property-badges">
                                                                <Medals
                                                                    medals={
                                                                        asset
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="product-hover-action">
                                                                <ul>
                                                                    <li>
                                                                        <a
                                                                            href="#"
                                                                            title="Quick View"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#quick_view_modal"
                                                                        >
                                                                            <i className="flaticon-expand" />
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            href="#"
                                                                            title="Wishlist"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#liton_wishlist_modal"
                                                                        >
                                                                            <i className="flaticon-heart-1" />
                                                                        </a>
                                                                    </li>
                                                                    <li className="go-top">
                                                                        <Link
                                                                            to={`/product-details/${asset.tokenId}`}
                                                                            title="Product Details"
                                                                        >
                                                                            <i className="flaticon-add" />
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="product-info-bottom">
                                                            <div className="product-price">
                                                                <span>
                                                                    USD{" "}
                                                                    {
                                                                        asset.price
                                                                    }
                                                                    <label>
                                                                        /
                                                                        <FormattedMessage id="properties-month" />
                                                                    </label>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="liton_product_list"
                                >
                                    <div className="ltn__product-tab-content-inner ltn__product-list-view">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                {/* Search Widget */}
                                                <div className="ltn__search-widget mb-30">
                                                    <form action="#">
                                                        <input
                                                            type="text"
                                                            name="search"
                                                            placeholder={
                                                                messages[
                                                                    "properties-filter"
                                                                ]
                                                            }
                                                        />
                                                        <button type="submit">
                                                            <i className="fas fa-search" />
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                            </div>
                        </div>
                        <Sidebar
                            filterByCategory={filterByCategory}
                            setFilterByCategory={setFilterByCategory}
                            setAssets={setAssets}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopGridV1;
