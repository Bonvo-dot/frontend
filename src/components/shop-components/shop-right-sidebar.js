import { ethers, FixedNumber } from "ethers";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { contractAddress, escrowContractAddress } from "../../moonbeam/AddPropertyForm";
import escrowContractABI from "../../abi/escrowContract.json";
import ContextWeb3 from "../../moonbeam/ContextWeb3";
import ContractABI from "../../abi/ContractABI.json";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import Sidebar from "./shop-sidebar";
import useGeoLocation from "../helpers/useGeoLocation";
import messages from "../../i18n/messages";


const ShopGridV1 = () => {
  let publicUrl = process.env.PUBLIC_URL + "/";
  const { state } = useContext(ContextWeb3);
  const [assets, setAssets] = useState([]);
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
    const stored_location = JSON.parse(localStorage.getItem("stored_location"));
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
    const fetchAsset = async () => {
      if (state.address && assets.length === 0) {
        try {
          const { ethereum } = window;
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner(state.address);
            const contract = new ethers.Contract(
              contractAddress,
              ContractABI,
              signer
            );
            const escrowContract = new ethers.Contract(escrowContractAddress, escrowContractABI, signer);

            if (locationUser.latitude !== 0) {
              const listedProperties = await escrowContract.getAllListings();
              if (listedProperties && listedProperties.length) {
                listedProperties.map(async (listedProperty) => {
                  const propertyId = listedProperty.propertyId.toNumber();
                  if (propertyId > 4) {
                    const propertyMetadataUri = listedProperty.propertyMetadataUri;
                    const metadataResponse = await axios.get(propertyMetadataUri,
                      {
                        responseType: 'blob',
                        headers: {
                          'Content-Type': 'application/json',
                          'Accept': 'application/pdf'
                        }
                      });
                    const metadataBlob = metadataResponse.data;
                    const metadataJSON = JSON.parse(await metadataBlob.text());

                    const propAsset = {
                      tokenId: propertyId,
                      price: ethers.utils.formatEther(listedProperty.pricePerDay),
                      timestamp: new Date(
                        metadataJSON.timestamp
                      ).toLocaleDateString(),
                      idCategory: metadataJSON.idCategory,
                      ISOCountry: metadataJSON.ISOCountry,
                      owner: metadataJSON.owner,
                      images: metadataJSON.images,
                      staticData: {
                        title: metadataJSON.staticData.title,
                        description: metadataJSON.staticData.description,
                        rooms: metadataJSON.staticData.rooms,
                        location: metadataJSON.staticData.location,
                        size: metadataJSON.staticData.size,
                      },
                    };
                    setAssets((assets) => [...assets, propAsset]);
                    setPropLoaded((loaded) => [true]);
                  }
                });
              }
              // await contract
              //   .assetsNearMeNotCategory(
              //     locationUser.latitude,
              //     locationUser.longitude,
              //     locationUser.ISOCountry
              //   )
              //   .then(async (tx) => {
              //     tx.map(async (element) => {
              // const txAsset = {
              //   timestamp: new Date(
              //     element.timestamp.toNumber()
              //   ).toLocaleDateString(),
              //   tokenId: element.tokenId.toNumber(),
              //   price: element.price.toNumber(),
              //   idCategory: element.idCategory,
              //   ISOCountry: element.ISOCountry,
              //   owner: element.owner,
              //   images: element.images,
              //   staticData: {
              //     title: element.staticData.title,
              //     description: element.staticData.description,
              //     rooms: element.staticData.rooms.toNumber(),
              //     location: element.staticData.location,
              //     size: element.staticData.size.toNumber(),
              //   },
              // };
              // setAssets((asset) => [txAsset, ...asset]);
              // setPropLoaded((loaded) => [true]);
              //     });
              //   })
              //   .catch((error) => {
              //     console.log(error);
              //   });
            }
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    };
    fetchAsset();
  }, [state, locationUser]);

  useEffect(() => {
    const fetchAssetByCategory = async () => {
      if (state.address && filterByCategory !== "") {
        try {
          const { ethereum } = window;
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner(state.address);
            const contract = new ethers.Contract(
              contractAddress,
              ContractABI,
              signer
            );

            if (locationUser.latitude !== 0 && filterByCategory !== "") {
              console.log(filterByCategory);
              await contract
                .assetsNearMeCategory(
                  locationUser.latitude,
                  locationUser.longitude,
                  locationUser.ISOCountry,
                  filterByCategory
                )
                .then(async (tx) => {
                  console.log(tx);
                  tx.map(async (element) => {
                    const txAsset = {
                      timestamp: new Date(
                        element.timestamp.toNumber()
                      ).toLocaleDateString(),
                      tokenId: element.tokenId.toNumber(),
                      price: element.price.toNumber(),
                      idCategory: element.idCategory,
                      ISOCountry: element.ISOCountry,
                      owner: element.owner,
                      images: element.images,
                      staticData: {
                        title: element.staticData.title,
                        description: element.staticData.description,
                        rooms: element.staticData.rooms.toNumber(),
                        location: element.staticData.location,
                        size: element.staticData.size.toNumber(),
                      },
                    };
                    setAssets((asset) => [txAsset, ...asset]);
                  });
                })
                .catch((error) => {
                  console.log(error);
                });
            }
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
              <div className="ltn__shop-options">
                <ul className="justify-content-start">
                  <li>
                    <div className="ltn__grid-list-tab-menu ">
                      <div className="nav">
                        <a
                          className="active show"
                          data-bs-toggle="tab"
                          href="#liton_product_grid"
                        >
                          <i className="fas fa-th-large" />
                        </a>
                        <a data-bs-toggle="tab" href="#liton_product_list">
                          <i className="fas fa-list" />
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="d-none">
                    <div className="showing-product-number text-right">
                      <span>Showing 1–12 of 18 results</span>
                    </div>
                  </li>
                  <li>
                    <div className="short-by text-center">
                      <select className="nice-select">
                        <FormattedMessage
                          id="properties-sort-by"
                          tagName="option"
                        />
                        <FormattedMessage
                          id="properties-price"
                          tagName="option"
                        />
                        <FormattedMessage
                          id="properties-more-recent"
                          tagName="option"
                        />
                        <FormattedMessage
                          id="properties-popular"
                          tagName="option"
                        />
                      </select>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="tab-content">
                <div
                  className="tab-pane fade active show"
                  id="liton_product_grid"
                >
                  <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                    <div className="row">
                      <div className="col-lg-12">
                        {/* Search Widget */}
                        <div className="ltn__search-widget mb-30">
                          <form action="#">
                            <input
                              type="text"
                              name="search"
                              placeholder={messages["properties-filter"]}
                            />
                            <button type="submit">
                              <i className="fas fa-search" />
                            </button>
                          </form>
                        </div>
                      </div>
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
                              <Link to={`/product-details/${asset.tokenId}`}>
                                <img
                                  src={
                                    asset.images !== "" &&
                                      !asset.images[0]
                                        .split("/")
                                        .includes("undefined")
                                      ? asset.images[0]
                                      : publicUrl +
                                      "assets/img/houses/house" +
                                      (asset.tokenId + 1) + //(Math.floor(Math.random() * 5) + 1) +
                                      ".jpg"
                                  }
                                  alt="#"
                                />
                              </Link>
                              <div className="real-estate-agent">
                                <div className="agent-img">
                                  <Link to="/shop">
                                    <img
                                      src={publicUrl + "assets/img/user.webp"}
                                      alt="#"
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
                                <Link to={`/product-details/${asset.tokenId}`}>
                                  {asset.staticData.title}
                                </Link>
                              </h2>
                              <div className="product-img-location go-top">
                                <ul>
                                  <li>
                                    <Link to="/contact">
                                      <i className="flaticon-pin" />
                                      {asset.staticData.location},
                                      {asset.ISOCountry}
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                              <ul className="ltn__list-item-2--- ltn__list-item-2-before--- ltn__plot-brief">
                                <li>
                                  <span className="ltn__secondary-color rooms-card">
                                    {asset.staticData.rooms}
                                  </span>
                                  <FormattedMessage id="properties-rooms" />
                                </li>
                                <li>
                                  <span> {asset.staticData.size} </span>
                                  m2
                                </li>
                              </ul>
                              <div className="property-badges">
                                <div className="row">
                                  {[
                                    ...Array(Math.floor(Math.random() * 4)),
                                  ].map(() => (
                                    <div className="col-3">
                                      <img
                                        className="full-width"
                                        alt="nft-1"
                                        src={
                                          publicUrl +
                                          "assets/img/badges/" +
                                          (Math.floor(Math.random() * 14) + 1) +
                                          ".png"
                                        }
                                      />
                                    </div>
                                  ))}
                                </div>
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
                                  USD {asset.price}
                                  <label>
                                    /<FormattedMessage id="properties-month" />
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
                <div className="tab-pane fade" id="liton_product_list">
                  <div className="ltn__product-tab-content-inner ltn__product-list-view">
                    <div className="row">
                      <div className="col-lg-12">
                        {/* Search Widget */}
                        <div className="ltn__search-widget mb-30">
                          <form action="#">
                            <input
                              type="text"
                              name="search"
                              placeholder={messages["properties-filter"]}
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
