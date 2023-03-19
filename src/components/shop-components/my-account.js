import React from "react";
import { useContext } from "react";
import ContextWeb3 from "../../moonbeam/ContextWeb3";
import Profile from "../../moonbeam/Profile";
import AddPropertyForm from "./../../moonbeam/AddPropertyForm";
import { MyProperties } from "../../moonbeam/MyProperties";
import { FormattedMessage } from "react-intl";
import { MyBookings } from "../../moonbeam/MyBookings";

function MyAccount() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    const { state } = useContext(ContextWeb3);

    return (
        <div className="liton__wishlist-area pb-70">
            <div className="container">
                <div className="row">
                    <div className="ltn__tab-menu-list mb-50">
                        <div className="col-lg-12">
                            {state.user ? (
                                <div className="ltn__product-tab-area">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="ltn__tab-menu-list mb-50">
                                                    <div className="nav">
                                                        <a
                                                            className="active show"
                                                            data-bs-toggle="tab"
                                                            href="#ltn_tab_1_2"
                                                        >
                                                            <FormattedMessage id="my-account-profile" />
                                                            <i className="fas fa-user" />
                                                        </a>
                                                        <a
                                                            data-bs-toggle="tab"
                                                            href="#ltn_tab_1_5"
                                                        >
                                                            <FormattedMessage id="myaccount-my-properties" />
                                                            <i className="fa-solid fa-list" />
                                                        </a>
                                                        <a
                                                            data-bs-toggle="tab"
                                                            href="#ltn_tab_1_6"
                                                        >
                                                            <FormattedMessage id="myaccount-property-bookings" />
                                                            <i className="fa-solid fa-heart" />
                                                        </a>
                                                        <a
                                                            data-bs-toggle="tab"
                                                            href="#ltn_tab_1_7"
                                                        >
                                                            <FormattedMessage id="myaccount-add-properties" />
                                                            <i className="fa-solid fa-map-location-dot" />
                                                        </a>
                                                        <a
                                                            data-bs-toggle="tab"
                                                            href="#ltn_tab_1_8"
                                                        >
                                                            <FormattedMessage id="myaccount-rewards" />
                                                            <i className="fa-solid fa-money-check-dollar" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className="tab-content">
                                                    <div
                                                        className="tab-pane active show"
                                                        id="ltn_tab_1_2"
                                                    >
                                                        <div className="ltn__myaccount-tab-content-inner">
                                                            {/* comment-area */}
                                                            <div className="ltn__comment-area mb-50">
                                                                <div className="ltn-author-introducing clearfix">
                                                                    <div className="author-img">
                                                                        <img
                                                                            src={
                                                                                state
                                                                                    .user
                                                                                    ?.image !==
                                                                                    "" &&
                                                                                state
                                                                                    .user
                                                                                    ?.image !==
                                                                                    undefined
                                                                                    ? state
                                                                                          .user
                                                                                          ?.image
                                                                                    : `https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg`
                                                                            }
                                                                            alt="Author"
                                                                            style={{
                                                                                borderRadius:
                                                                                    "50%",
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div className="author-info">
                                                                        <h6>
                                                                            <FormattedMessage id="myaccount-agent-label" />
                                                                        </h6>
                                                                        <h4>
                                                                            {state
                                                                                .user
                                                                                ?.firstName ||
                                                                            state
                                                                                .user
                                                                                ?.lastName
                                                                                ? state
                                                                                      .user
                                                                                      ?.firstName +
                                                                                  " " +
                                                                                  state
                                                                                      .user
                                                                                      ?.lastName
                                                                                : state
                                                                                      .user
                                                                                      ?.address}
                                                                        </h4>
                                                                        {state
                                                                            .user
                                                                            ?.isoCountry && (
                                                                            <div className="footer-address">
                                                                                <ul>
                                                                                    <li>
                                                                                        <div className="footer-address-icon">
                                                                                            <i className="icon-placeholder" />
                                                                                        </div>
                                                                                        <div className="footer-address-info">
                                                                                            <p>
                                                                                                {
                                                                                                    state
                                                                                                        .user
                                                                                                        ?.isoCountry
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="tab-pane fade"
                                                        id="ltn_tab_1_4"
                                                    >
                                                        <Profile
                                                            user={state.user}
                                                        />
                                                    </div>
                                                    <div
                                                        className="tab-pane fade"
                                                        id="ltn_tab_1_5"
                                                    >
                                                        <MyProperties
                                                            user={state.user}
                                                        />
                                                    </div>
                                                    <div
                                                        className="tab-pane fade"
                                                        id="ltn_tab_1_6"
                                                    >
                                                        <MyBookings />
                                                    </div>
                                                    <div
                                                        className="tab-pane fade"
                                                        id="ltn_tab_1_7"
                                                    >
                                                        <AddPropertyForm />
                                                    </div>
                                                    <div
                                                        className="tab-pane fade"
                                                        id="ltn_tab_1_8"
                                                    >
                                                        <div className="ltn__myaccount-tab-content-inner">
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="mt-50">
                                                                        <h4 className="title-2">
                                                                            Bonvo
                                                                            Balance
                                                                        </h4>
                                                                        <table className="table no-background">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>
                                                                                        1000
                                                                                        Bonv{" "}
                                                                                        <strong>
                                                                                            ×
                                                                                            2
                                                                                        </strong>
                                                                                    </td>
                                                                                    <td>
                                                                                        <a className="btn btn-effect-3 btn-white">
                                                                                            <FormattedMessage id="myaccount-rewards-send-button" />
                                                                                        </a>
                                                                                        <a className="btn btn theme-btn-1 btn-effect-1">
                                                                                            <FormattedMessage id="myaccount-rewards-receive-button" />
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="mt-50">
                                                                        <h4 className="title-2">
                                                                            <FormattedMessage id="myaccount-rewards-rewards-history" />
                                                                        </h4>
                                                                        <table className="table">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>
                                                                                        {" "}
                                                                                        <a href="#">
                                                                                            http://bonvo.com/propiedad-1
                                                                                        </a>{" "}
                                                                                    </td>
                                                                                    <td>
                                                                                        0.2222123
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        {" "}
                                                                                        <a href="#">
                                                                                            http://bonvo.com/propiedad-2
                                                                                        </a>{" "}
                                                                                    </td>
                                                                                    <td>
                                                                                        0.3124124
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-lg-12">
                                                                        <div className="mt-50">
                                                                            <h4 className="title-2">
                                                                                <FormattedMessage id="myaccount-rewards-badges" />
                                                                            </h4>
                                                                            <div className="row">
                                                                                <div className="col-lg-3 col-md-6 col-12">
                                                                                    <img
                                                                                        className="full-width"
                                                                                        alt="badge-1"
                                                                                        src={
                                                                                            publicUrl +
                                                                                            "assets/img/badges/13.png"
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                                <div className="col-lg-3 col-md-6 col-12">
                                                                                    <img
                                                                                        className="full-width"
                                                                                        alt="badge-2"
                                                                                        src={
                                                                                            publicUrl +
                                                                                            "assets/img/badges/14.png"
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                                <div className="col-lg-3 col-md-6 col-12">
                                                                                    <img
                                                                                        className="full-width"
                                                                                        alt="badge-3"
                                                                                        src={
                                                                                            publicUrl +
                                                                                            "assets/img/badges/15.png"
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-lg-12">
                                                                        <div className="mt-50">
                                                                            <h4 className="title-2">
                                                                                NFTs
                                                                            </h4>
                                                                            <div className="row">
                                                                                <div className="col-lg-3 col-md-6 col-12">
                                                                                    <img
                                                                                        className="full-width"
                                                                                        alt="nft-1"
                                                                                        src={
                                                                                            publicUrl +
                                                                                            "assets/img/badges/1.png"
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                                <div className="col-lg-3 col-md-6 col-12">
                                                                                    <img
                                                                                        className="full-width"
                                                                                        alt="nft-2"
                                                                                        src={
                                                                                            publicUrl +
                                                                                            "assets/img/badges/2.png"
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                                <div className="col-lg-3 col-md-6 col-12">
                                                                                    <img
                                                                                        className="full-width"
                                                                                        alt="nft-3"
                                                                                        src={
                                                                                            publicUrl +
                                                                                            "assets/img/badges/3.png"
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                                <div className="col-lg-3 col-md-6 col-12">
                                                                                    <img
                                                                                        className="full-width"
                                                                                        alt="nft-4"
                                                                                        src={
                                                                                            publicUrl +
                                                                                            "assets/img/badges/4.png"
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                                <div className="col-lg-3 col-md-6 col-12">
                                                                                    <img
                                                                                        className="full-width"
                                                                                        alt="nft-5"
                                                                                        src={
                                                                                            publicUrl +
                                                                                            "assets/img/badges/5.png"
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                                <div className="col-lg-3 col-md-6 col-12">
                                                                                    <img
                                                                                        className="full-width"
                                                                                        alt="nft-6"
                                                                                        src={
                                                                                            publicUrl +
                                                                                            "assets/img/badges/6.png"
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="ltn__product-tab-area">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="ltn__tab-menu-list mb-50">
                                                    <div className="nav">
                                                        <a
                                                            data-bs-toggle="tab"
                                                            href="#ltn_tab_1_4"
                                                        >
                                                            <FormattedMessage id="myaccount-register-account" />
                                                            <i className="fas fa-user" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className="tab-content">
                                                    <div
                                                        className="tab-pane fade"
                                                        id="ltn_tab_1_4"
                                                    >
                                                        <Profile
                                                            user={state.user}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyAccount;
