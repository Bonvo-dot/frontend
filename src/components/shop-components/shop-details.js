import { ethers, BigNumber } from "ethers";
import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ContextWeb3 from "../../moonbeam/ContextWeb3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormattedMessage } from "react-intl";
import {
    bookProperty,
    checkAllowance,
    confirmRentalAsLandlord,
    confirmRentalAsTenant,
} from "../helpers/bonvoProperties";
import MessageToast from "../../moonbeam/MessageToast";
import { getMedalsByAddress } from "../helpers/bonvoMedals";
import Medals from "../global-components/medals";
import "./shop-details.css";
import { getUserByAddress } from "../helpers/bonvoUser";

const ShopDetails = (props) => {
    let publicUrl = process.env.PUBLIC_URL + "/";
    const { state } = useContext(ContextWeb3);
    const location = useLocation();
    const productDetailId = Number(location.pathname.split("/")[2]);
    const asset = props.asset;
    const bookedProperties = props.bookedProperties;
    const owner = props.owner;

    const [reviews, setReview] = useState([]);
    const [landlordData, setLandlordData] = useState({
        address: "",
        image: "",
        firstName: "",
        lastName: "",
        isoCountry: "",
        reputation: "",
    });
    const [landlordMedals, setLandlordMedals] = useState(emptyMedals);
    const [propertyMedals, setPropertyMedals] = useState(emptyMedals);

    const getLandlordMedals = async () => {
        const medals = await getMedalsByAddress(asset.owner);
        if (JSON.stringify(landlordMedals) !== JSON.stringify(medals)) {
            setLandlordMedals(medals);
        }
    };
    const getLandlordData = async () => {
        const userData = await getUserByAddress(asset.owner);
        if (JSON.stringify(landlordData) !== JSON.stringify(userData)) {
            setLandlordData(userData);
        }
    };
    if (asset.owner) {
        getLandlordMedals();
        getLandlordData();
    }
    if (asset) {
        const medals = {
            cleanMedalCount: asset.cleanMedalCount
                ? asset.cleanMedalCount.toNumber()
                : 0,
            comfyBedMedalCount: asset.comfyBedMedalCount
                ? asset.comfyBedMedalCount.toNumber()
                : 0,
            friendlyMedalCount: asset.friendlyMedalCount
                ? asset.friendlyMedalCount.toNumber()
                : 0,
            goodLocationMedalCount: asset.goodLocationMedalCount
                ? asset.goodLocationMedalCount.toNumber()
                : 0,
            punctualMedalCount: asset.punctualMedalCount
                ? asset.punctualMedalCount.toNumber()
                : 0,
        };
        medals.total =
            medals.cleanMedalCount +
            medals.comfyBedMedalCount +
            medals.friendlyMedalCount +
            medals.goodLocationMedalCount +
            medals.punctualMedalCount;
        if (JSON.stringify(propertyMedals) !== JSON.stringify(medals)) {
            setPropertyMedals(medals);
        }
    }

    const handleRent = async (e) => {
        e.preventDefault();

        const id = showToastProgress();
        try {
            const alreadyBooked = await hasBooked();
            if (alreadyBooked) {
                toast.update(id, {
                    render: "You have already booked this property",
                    type: "error",
                    isLoading: false,
                });
            }

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
                const startDateBn = BigNumber.from(
                    Math.floor(startDate.getTime() / 1000)
                );
                const dates = [
                    startDateBn,
                    startDateBn.add(24 * 60 * 60),
                    startDateBn.add(2 * 24 * 60 * 60),
                ];

                const { bookingId, receipt } = await bookProperty(
                    signer,
                    productDetailId,
                    dates,
                    { gasLimit: 400000 }
                );
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
                render: "Something went wrong",
                type: "error",
                isLoading: false,
            });
        }
    };

    const handleConfirmLandlord = async (e) => {
        const id = showToastProgress();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(state.address);
        const landlordReceipt = await confirmRentalAsLandlord(
            signer,
            productDetailId
        );

        if (landlordReceipt && landlordReceipt.status === 1) {
            updateToastSuccess(id);
        }
    };

    const handleConfirmTenant = async (e) => {
        const id = showToastProgress();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(state.address);
        const tenantReceipt = await confirmRentalAsTenant(
            signer,
            productDetailId
        );

        if (tenantReceipt && tenantReceipt.status === 1) {
            updateToastSuccess(id);
        }
    };

    const hasBooked = async () => {
        if (bookedProperties.length === 0) return false;
        const has = bookedProperties.some(
            (bp) => bp.propertyId == productDetailId
        );
        return has;
    };

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
    };

    const updateToastSuccess = (id) => {
        toast.update(id, {
            render: `
        Transacción realizada correctamente! 🎉
        `,
            type: "success",
            isLoading: false,
            autoClose: 5000,
        });
    };

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
                                        {new Intl.DateTimeFormat("en-US", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                        }).format(asset.timestamp)}
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <i className="far fa-comments" />0{" "}
                                            <FormattedMessage id="property-details-comments" />
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
                                <h1 style={{ marginTop: "15px" }}>
                                    {asset.staticData.title}
                                </h1>
                                {!owner && (
                                    <button
                                        className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                        onClick={handleRent}
                                    >
                                        <FormattedMessage id="property-details-rent-now" />
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
                                        src={landlordData.image || 'https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg'}
                                        alt={landlordData.address}
                                    />
                                    <h5 title={asset.owner}>
                                        {
                                            landlordData.firstName || landlordData.lastName ?
                                                landlordData.firstName + ' ' + landlordData.lastName :
                                                asset.owner.slice(0, 6) + '...' + asset.owner.slice(-4)
                                        }
                                    </h5>
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
                                                <a href="#">
                                                    &nbsp;(0 Reviews)
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <br />
                                    <div className="agent-badges landlord-badges">
                                        <Medals medals={landlordMedals} />
                                    </div>
                                    {
                                        landlordData.isoCountry &&
                                        <>
                                            <span className="ltn__secondary-color">
                                                <i className="flaticon-pin" />
                                            </span>{" "}
                                            {landlordData.isoCountry}
                                        </>
                                    }
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
                                                <a
                                                    href="https://www.youtube.com/@bonvooficial"
                                                    title="Youtube"
                                                >
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
                            {propertyMedals.total > 0 ? (
                                <Medals medals={propertyMedals} />
                            ) : (
                                <FormattedMessage id="property-details-no-badges" />
                            )}
                        </div>

                        <h4 className="title-2">
                            <FormattedMessage id="property-details-location" />
                        </h4>
                        <div className="property-details-google-map mb-60">
                            {asset.latitude && asset.longitude && (
                                <iframe
                                    src={`https://maps.google.com/maps?q=${asset.latitude?._value},${asset.longitude?._value}&hl=es;z=14&output=embed`}
                                    width="100%"
                                    height="100%"
                                    allowFullScreen
                                    aria-hidden="false"
                                    tabIndex={0}
                                    title="map"
                                />
                            )}
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
                                <div
                                    className="ltn__comment-area mb-30"
                                    key={idx}
                                >
                                    <div className="ltn__comment-inner">
                                        <ul>
                                            <li>
                                                <div className="ltn__comment-item clearfix">
                                                    <div className="ltn__commenter-img">
                                                        <img
                                                            src={
                                                                publicUrl +
                                                                "assets/img/user.webp"
                                                            }
                                                            alt="Imagen"
                                                        />
                                                    </div>
                                                    <div className="ltn__commenter-comment">
                                                        <h6>
                                                            <a href="#">
                                                                {review.rater.slice(
                                                                    0,
                                                                    10
                                                                )}
                                                                ...
                                                            </a>
                                                        </h6>

                                                        <div className="product-ratting">
                                                            {review.rate ===
                                                                1 && (
                                                                <ul
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        alignItems:
                                                                            "center",
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
                                                            {review.rate ===
                                                                2 && (
                                                                <ul
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        alignItems:
                                                                            "center",
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
                                                            {review.rate ===
                                                                3 && (
                                                                <ul
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        alignItems:
                                                                            "center",
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
                                                            {review.rate ===
                                                                4 && (
                                                                <ul
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        alignItems:
                                                                            "center",
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
                                                            {review.rate ===
                                                                5 && (
                                                                <ul
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        alignItems:
                                                                            "center",
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

const emptyMedals = {
    cleanMedalCount: 0,
    comfyBedMedalCount: 0,
    friendlyMedalCount: 0,
    goodLocationMedalCount: 0,
    punctualMedalCount: 0,
};
