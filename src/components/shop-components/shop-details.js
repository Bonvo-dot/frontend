import { ethers, utils, BigNumber } from "ethers";
import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ContextWeb3 from "../../moonbeam/ContextWeb3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormattedMessage } from "react-intl";
import { bookProperty, checkAllowance, confirmRentalAsLandlord, confirmRentalAsTenant, getBookings, getPropertyInfo } from "../helpers/bonvoProperties";
import MessageToast from "../../moonbeam/MessageToast";
import { badges } from "../../utils/constants";

const ShopDetails = (props) => {
    let publicUrl = process.env.PUBLIC_URL + "/";
    const { state } = useContext(ContextWeb3);
    const location = useLocation();
    const productDetailId = Number(location.pathname.split("/")[2]);
    const asset = props.asset;

    const [bookedProperties, setBookedProperties] = useState([]);
    const [owner, setOwner] = useState(false);
    const [reviews, setReview] = useState([]);

    const handleRent = async (e) => {
        e.preventDefault();
        const id = showToastProgress();
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner(state.address);

                const hasAllowance = await checkAllowance(signer);
                if (!hasAllowance) {
                    toast.error("Allowance failed");
                    return;
                }

                let startDate = new Date();
                startDate.setDate(startDate.getDate() - 10);
                startDate.setUTCHours(0, 0, 0, 0);
                const startDateBn = BigNumber.from(Math.floor(startDate.getTime() / 1000));
                const dates = [startDateBn, startDateBn.add(24 * 60 * 60), startDateBn.add(2 * 24 * 60 * 60)];

                const { bookingId, receipt } = await bookProperty(signer, productDetailId, dates, { gasLimit: 400000 });
                if (bookingId > -1) {
                    updateToastSuccess(id);
                    toast(<MessageToast txHash={receipt.transactionHash} />, {
                        autoClose: 5000,
                    });
                }
            }
        } catch (error) {
            console.log("error", error);
            toast.update(id, {
                render: "Algo salió mal",
                type: "error",
                isLoading: false,
            });
        }
    };

    const handleConfirmLandlord = async (e) => {
        const id = showToastProgress();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(state.address);
        const landlordReceipt = await confirmRentalAsLandlord(signer, productDetailId);

        if (landlordReceipt && landlordReceipt.status === 1) {
            updateToastSuccess(id);
        }
    }

    const handleConfirmTenant = async (e) => {
        const id = showToastProgress();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(state.address);
        const tenantReceipt = await confirmRentalAsTenant(signer, productDetailId);

        if (tenantReceipt && tenantReceipt.status === 1) {
            updateToastSuccess(id);
        }
    }

    const hasBooked = async (type) => {
        if (bookedProperties.length === 0) return false;
        const has = bookedProperties.some(bp => bp[type].toLowerCase() === state.address.toLowerCase());
        return has;
    }

    const showToastProgress = () => {
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
        return id;
    }

    const updateToastSuccess = (id) => {
        toast.update(id, {
            render: `
        Transacción realizada correctamente! 🎉
        `,
            type: "success",
            isLoading: false,
            autoClose: 5000,
        });
    }

    return (
        <div className="ltn__shop-details-area pb-10">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-12">
                        <div className="ltn__shop-details-inner ltn__page-details-inner mb-60">
                            <div className="ltn__blog-meta">
                                <ul>
                                    <li className="ltn__blog-category">
                                        <Link to="#">
                                            <FormattedMessage id="property-details-featured-badge" />
                                        </Link>
                                    </li>
                                    <li className="ltn__blog-category">
                                        <Link className="bg-orange" to="#">
                                            <FormattedMessage id="property-details-rent-badge" />
                                        </Link>
                                    </li>
                                    <li className="ltn__blog-date">
                                        <i className="far fa-calendar-alt" />
                                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(asset.timestamp)}
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <i className="far fa-comments" />
                                            35 <FormattedMessage id="property-details-comments" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <h1 style={{ marginTop: "15px" }}>{asset.staticData.title}</h1>
                                {!owner && (
                                    <button
                                        className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                        onClick={handleRent}
                                    >
                                        <FormattedMessage id="property-details-rent-now" />
                                    </button>
                                )}
                                {owner && hasBooked('landlord') && (
                                    <button
                                        className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                        onClick={handleConfirmLandlord}
                                    >
                                        <FormattedMessage id="property-details-confirm-landlord" />
                                    </button>
                                )}
                                {!owner && hasBooked('landlord') && (
                                    <button
                                        className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                        onClick={handleConfirmTenant}
                                    >
                                        <FormattedMessage id="property-details-confirm-tenant" />
                                    </button>
                                )}
                            </div>
                            <label>
                                <span className="ltn__secondary-color">
                                    <i className="flaticon-pin" />
                                </span>{" "}
                                {asset.staticData.location}, {asset.ISOCountry}
                            </label>
                            <label style={{ marginLeft: "1rem" }}>
                                <span className="ltn__secondary-color">
                                    {asset.staticData.rooms}
                                </span>{" "}
                                <FormattedMessage id="property-details-rooms" />
                            </label>
                            <label style={{ marginLeft: "1rem" }}>
                                <span className="ltn__secondary-color">
                                    {asset.staticData.size}
                                </span>{" "}
                                m2
                            </label>
                            <h4 className="title-2">
                                <FormattedMessage id="property-details-description" />
                            </h4>
                            <p>{asset.staticData.description}</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar---">
                            {/* Author Widget */}
                            <div className="widget ltn__author-widget">
                                <div className="ltn__author-widget-inner text-center">
                                    <img
                                        src={
                                            publicUrl +
                                            "assets/img/gallery/vendedora_inmobiliaria.jpg"
                                        }
                                        alt="Imagen"
                                    />
                                    <h5>Rosalina D. Willaimson</h5>
                                    <small>
                                        <FormattedMessage id="property-details-description" />
                                    </small>
                                    <div className="product-ratting">
                                        <ul>
                                            <li>
                                                <a href="#">
                                                    <i className="fas fa-star" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fas fa-star" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fas fa-star" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fas fa-star-half-alt" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="far fa-star" />
                                                </a>
                                            </li>
                                            <li className="review-total">
                                                {" "}
                                                <a href="#"> ( 1 Reviews )</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <br />
                                    <small>
                                        <FormattedMessage id="property-details-badges-agent" />
                                    </small>
                                    <div className="agent-badges">
                                        <div className="row">
                                            {[...(Array(Math.floor(Math.random() * 7)) + 1)].map(
                                                () => (
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
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <p>
                                        <FormattedMessage id="property-details-seller-description" />
                                    </p>
                                    <div className="ltn__social-media">
                                        <ul>
                                            <li>
                                                <a
                                                    href="https://www.facebook.com/BonvoMx"
                                                    title="Facebook"
                                                >
                                                    <i className="fab fa-facebook-f" />
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="https://twitter.com/BonvoOficial"
                                                    title="Twitter"
                                                >
                                                    <i className="fab fa-twitter" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" title="Youtube">
                                                    <i className="fab fa-youtube" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                    <div className="col-lg-12">
                        <h4 className="title-2">
                            <FormattedMessage id="property-details-badges-property" />
                        </h4>
                        <div className="agent-badges mb-60">
                            <div className="row">
                                {
                                    asset.friendlyMedalCount > 0 &&
                                    <>
                                        {asset.friendlyMedalCount}x
                                        <img
                                            className="full-width max-width-200"
                                            alt="nft-1"
                                            src={badges.friendly}
                                        />
                                    </>
                                }
                                {
                                    asset.comfyBedMedalCount > 0 &&
                                    <>
                                        {asset.comfyBedMedalCount}x
                                        <img
                                            className="full-width max-width-200"
                                            alt="nft-1"
                                            src={badges.comfy_bed}
                                        />
                                    </>
                                }
                                {
                                    asset.punctualMedalCount > 0 &&
                                    <>
                                        {asset.punctualMedalCount}x
                                        <img
                                            className="full-width max-width-200"
                                            alt="nft-1"
                                            src={badges.punctual}
                                        />
                                    </>
                                }
                                {
                                    asset.cleanMedalCount > 0 &&
                                    <>
                                        {asset.cleanMedalCount}x
                                        <img
                                            className="full-width max-width-200"
                                            alt="nft-1"
                                            src={badges.clean}
                                        />
                                    </>
                                }
                                {
                                    asset.goodLocationMedalCount > 0 &&
                                    <>
                                        {asset.goodLocationMedalCount}x
                                        <img
                                            className="full-width max-width-200"
                                            alt="nft-1"
                                            src={badges.good_location}
                                        />
                                    </>
                                }
                            </div>
                        </div>

                        <h4 className="title-2">
                            <FormattedMessage id="property-details-location" />
                        </h4>
                        <div className="property-details-google-map mb-60">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9334.271551495209!2d-73.97198251485975!3d40.668170674982946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b0456b5a2e7%3A0x68bdf865dda0b669!2sBrooklyn%20Botanic%20Garden%20Shop!5e0!3m2!1sen!2sbd!4v1590597267201!5m2!1sen!2sbd"
                                width="100%"
                                height="100%"
                                frameBorder={0}
                                allowFullScreen
                                aria-hidden="false"
                                tabIndex={0}
                                title="map"
                            />
                        </div>
                        <div className="ltn__shop-details-tab-content-inner--- ltn__shop-details-tab-inner-2 ltn__product-details-review-inner mb-60">
                            <h4 className="title-2">
                                <FormattedMessage id="property-details-reviews" />
                            </h4>
                            <div className="product-ratting general">
                                <ul>
                                    <li>
                                        <i className="fas fa-star" />
                                    </li>
                                    <li>
                                        <i className="fas fa-star" />
                                    </li>
                                    <li>
                                        <i className="fas fa-star" />
                                    </li>
                                    <li>
                                        <i className="fas fa-star-half-alt" />
                                    </li>
                                    <li>
                                        <i className="far fa-star" />
                                    </li>
                                    <li className="review-total">
                                        {reviews.length}{" "}
                                        <FormattedMessage id="property-details-reviews" />{" "}
                                    </li>
                                </ul>
                            </div>
                            <hr />
                            {/* comment-area */}
                            {reviews.map((review, idx) => (
                                <div className="ltn__comment-area mb-30" key={idx}>
                                    <div className="ltn__comment-inner">
                                        <ul>
                                            <li>
                                                <div className="ltn__comment-item clearfix">
                                                    <div className="ltn__commenter-img">
                                                        <img
                                                            src={publicUrl + "assets/img/user.webp"}
                                                            alt="Imagen"
                                                        />
                                                    </div>
                                                    <div className="ltn__commenter-comment">
                                                        <h6>
                                                            <a href="#">{review.rater.slice(0, 10)}...</a>
                                                        </h6>

                                                        <div className="product-ratting">
                                                            {review.rate === 1 && (
                                                                <ul
                                                                    style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        gap: "0.5rem",
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <i className="fas fa-star" />
                                                                    </li>
                                                                    <li>
                                                                        <i className="far fa-star" />
                                                                    </li>
                                                                    <li>
                                                                        <i className="far fa-star" />
                                                                    </li>
                                                                    <li>
                                                                        <i className="far fa-star" />
                                                                    </li>
                                                                    <li>
                                                                        <i className="far fa-star" />
                                                                    </li>
                                                                </ul>
                                                            )}
                                                            {review.rate === 2 && (
                                                                <ul
                                                                    style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        gap: "0.5rem",
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <i className="fas fa-star" />
                                                                    </li>
                                                                    <li>
                                                                        <i className="fas fa-star" />
                                                                    </li>
                                                                    <li>
                                                                        <i className="far fa-star" />
                                                                    </li>
                                                                    <li>
                                                                        <i className="far fa-star" />
                                                                    </li>
                                                                    <li>
                                                                        <i className="far fa-star" />
                                                                    </li>
                                                                </ul>
                                                            )}
                                                            {review.rate === 3 && (
                                                                <ul
                                                                    style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        gap: "0.5rem",
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <i className="fas fa-star" />
                                                                    </li>
                                                                    <li>
                                                                        <i className="fas fa-star" />
                                                                    </li>
                                                                    <li>
                                                                        <i className="fas fa-star" />
                                                                    </li>
                                                                    <li>
                                                                        <i className="far fa-star" />
                                                                    </li>
                                                                    <li>
                                                                        <i className="far fa-star" />
                                                                    </li>
                                                                </ul>
                                                            )}
                                                            {review.rate === 4 && (
                                                                <ul
                                                                    style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        gap: "0.5rem",
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <i className="fas fa-star" />
                                                                    </li>
                                                                    <li>
                                                                        <i className="fas fa-star" />
                                                                    </li>
                                                                    <li>
                                                                        <i className="fas fa-star" />
                                                                    </li>
                                                                    <li>
                                                                        <i className="fas fa-star" />
                                                                    </li>
                                                                    <li>
                                                                        <i className="far fa-star" />
                                                                    </li>
                                                                </ul>
                                                            )}
                                                            {review.rate === 5 && (
                                                                <ul
                                                                    style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        gap: "0.5rem",
                                                                    }}
                                                                >
                                                                    <li>
                                                                        <i className="fas fa-star" />
                                                                    </li>
                                                                    <li>
                                                                        <i className="fas fa-star" />
                                                                    </li>
                                                                    <li>
                                                                        <i className="fas fa-star" />
                                                                    </li>
                                                                    <li>
                                                                        <i className="fas fa-star" />
                                                                    </li>
                                                                    <li>
                                                                        <i className="fas fa-star" />
                                                                    </li>
                                                                </ul>
                                                            )}
                                                        </div>
                                                        <p>{review.argue}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
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
        </div>
    );
};

export default ShopDetails;
