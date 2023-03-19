import { FixedNumber } from "ethers";
import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { getRecentListings } from "../helpers/bonvoProperties";
import ContextWeb3 from "../../moonbeam/ContextWeb3";
import useGeoLocation from "../helpers/useGeoLocation";
import { FormattedMessage } from "react-intl";

const ProductListingV1 = () => {
    let publicUrl = process.env.PUBLIC_URL + "/";
    const { state } = useContext(ContextWeb3);
    const location = useGeoLocation();
    const [locationUser, setLocationUser] = useState({
        latitude: 0,
        longitude: 0,
        ISOCountry: "",
    });

    useEffect(() => {
        if (location?.coordinates?.lat && locationUser.latitude === 0) {
            setLocationUser({
                latitude: FixedNumber.from(
                    `${location.coordinates.lat}`,
                    "fixed128x18"
                ),
                longitude: FixedNumber.from(
                    `${location.coordinates.lng}`,
                    "fixed128x18"
                ),
                ISOCountry: location.countryName,
            });
        }
    }, [location]);

    const [assets, setAssets] = useState([]);
    /* Fecth Asset by id */
    useEffect(() => {
        const fetchAssets = async () => {
            if (state.address && assets.length === 0) {
                try {
                    const listedProperties = await getRecentListings();
                    setAssets(listedProperties);
                } catch (error) {
                    console.log("error", error);
                }
            }
        };
        fetchAssets();
    }, [state, locationUser]);

    return (
        <div>
            <div className="ltn__product-slider-area ltn__product-gutter pt-115 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title-area ltn__section-title-2--- text-center">
                                <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">
                                    <FormattedMessage id="properties" />
                                </h6>
                                <h1 className="section-title">
                                    <FormattedMessage id="more-recent" />
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="row ltn__product-slider-item-three-active--- slick-arrow-1">
                        {/* ltn__product-item */}
                        {assets.map((asset) => {
                            //map this to the array that is retrieved from the API
                            return (
                                <div className="col-xl-4 col-sm-6 col-12">
                                    <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5 text-center---">
                                        <div className="product-img go-top">
                                            <Link
                                                to={`/product-details/${asset.tokenId}`}
                                            >
                                                <img
                                                    src={
                                                        asset.images !== "" &&
                                                        !asset.images[0]
                                                            .split("/")
                                                            .includes(
                                                                "undefined"
                                                            )
                                                            ? asset.images[0]
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
                                                    <img
                                                        src={
                                                            publicUrl +
                                                            "assets/img/user.webp"
                                                        }
                                                        alt="#"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-info">
                                            <div className="product-badge">
                                                <ul>
                                                    <li className="sale-badg">
                                                        Alquiler
                                                    </li>
                                                </ul>
                                            </div>
                                            <h2 className="product-title go-top">
                                                <Link
                                                    to={`/product-details/${asset.tokenId}`}
                                                >
                                                    {asset.staticData.title}
                                                </Link>
                                            </h2>
                                            <div className="product-img-location go-top">
                                                <ul>
                                                    <li>
                                                        <Link to="/contact">
                                                            <i className="flaticon-pin" />
                                                            {
                                                                asset.staticData
                                                                    .location
                                                            }
                                                            , {asset.ISOCountry}
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <ul className="ltn__list-item-2--- ltn__list-item-2-before--- ltn__plot-brief">
                                                <li>
                                                    <span className="ltn__secondary-color"></span>{" "}
                                                    {asset.staticData.rooms}{" "}
                                                    Habitaciones
                                                </li>
                                                <li>
                                                    <span>
                                                        {" "}
                                                        {
                                                            asset.staticData
                                                                .size
                                                        }{" "}
                                                    </span>
                                                    m2
                                                </li>
                                            </ul>
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
                                                U$D {asset.price}
                                                <label>/Mes</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {/*  */}
                    </div>
                    <div className="row">
                        <div className="col-lg-12 align-self-center text-center">
                            <div className="btn-wrapper animated go-top">
                                <Link
                                    to="/shop"
                                    className="theme-btn-1 btn btn-effect-1"
                                >
                                    <FormattedMessage id="product-listing-see-all" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListingV1;
