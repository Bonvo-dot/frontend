import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const BannerV3 = () => {
    let publicUrl = process.env.PUBLIC_URL + "/";

    return (
        <div className="ltn__slider-area ltn__slider-3  section-bg-2">
            <div className="ltn__slide-one-active slick-slide-arrow-1 slick-slide-dots-1">
                {/* ltn__slide-item */}
                <div
                    className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-3-normal--- ltn__slide-item-3 bg-image bg-overlay-theme-black-60"
                    data-bs-bg={
                        publicUrl + "assets/img/houses-ai/home/home_1.png"
                    }
                >
                    <div className="ltn__slide-item-inner text-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 align-self-center">
                                    <div className="slide-item-info">
                                        <div className="slide-item-info-inner ltn__slide-animation">
                                            <div className="slide-video mb-50 d-none">
                                                <a
                                                    className="ltn__video-icon-2 ltn__video-icon-2-border"
                                                    href="https://www.youtube.com/embed/tlThdr3O5Qo"
                                                    data-rel="lightcase:myCollection"
                                                >
                                                    <i className="fa fa-play" />
                                                </a>
                                            </div>
                                            <h6 className="slide-sub-title white-color--- animated">
                                                <span>
                                                    <i className="fas fa-home" />
                                                </span>{" "}
                                                <FormattedMessage id="home-banner-sales-rep" />
                                            </h6>
                                            <h1 className="slide-title animated ">
                                                <FormattedMessage id="home-banner-ideal-home" />
                                            </h1>
                                            <div className="slide-brief animated">
                                                <p>
                                                    <FormattedMessage id="home-banner-help-you" />
                                                </p>
                                            </div>
                                            <div className="btn-wrapper animated go-top">
                                                <Link
                                                    to="/shop"
                                                    className="theme-btn-1 btn btn-effect-1"
                                                >
                                                    <FormattedMessage id="home-banner-see-propperties" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ltn__slide-item */}
                <div
                    className="ltn__slide-item ltn__slide-item-2  ltn__slide-item-3-normal--- ltn__slide-item-3 bg-image bg-overlay-theme-black-60"
                    data-bs-bg={
                        publicUrl + "assets/img/houses-ai/home/home_2.png"
                    }
                >
                    <div className="ltn__slide-item-inner  text-right text-end">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 align-self-center">
                                    <div className="slide-item-info">
                                        <div className="slide-item-info-inner ltn__slide-animation">
                                            <h6 className="slide-sub-title white-color--- animated">
                                                <span>
                                                    <i className="fas fa-home" />
                                                </span>{" "}
                                                <FormattedMessage id="home-banner-sales-rep" />
                                            </h6>
                                            <h1 className="slide-title animated ">
                                                <FormattedMessage id="home-banner-ideal-home" />
                                            </h1>
                                            <div className="slide-brief animated">
                                                <p>
                                                    <FormattedMessage id="home-banner-see-propperties" />
                                                </p>
                                            </div>
                                            <div className="btn-wrapper animated go-top">
                                                <Link
                                                    to="/shop"
                                                    className="theme-btn-1 btn btn-effect-1"
                                                >
                                                    <FormattedMessage id="home-banner-see-propperties" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ltn__slide-item */}
                <div
                    className="ltn__slide-item ltn__slide-item-2  ltn__slide-item-3-normal--- ltn__slide-item-3 bg-image bg-overlay-theme-black-60"
                    data-bs-bg={
                        publicUrl + "assets/img/houses-ai/home/home_3.png"
                    }
                >
                    <div className="ltn__slide-item-inner  text-left">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 align-self-center">
                                    <div className="slide-item-info">
                                        <div className="slide-item-info-inner ltn__slide-animation">
                                            <h6 className="slide-sub-title white-color--- animated">
                                                <span>
                                                    <i className="fas fa-home" />
                                                </span>{" "}
                                                <FormattedMessage id="home-banner-sales-rep" />
                                            </h6>
                                            <h1 className="slide-title animated ">
                                                <FormattedMessage id="home-banner-ideal-home" />
                                            </h1>
                                            <div className="slide-brief animated">
                                                <p>
                                                    <FormattedMessage id="home-banner-see-propperties" />
                                                </p>
                                            </div>
                                            <div className="btn-wrapper animated go-top">
                                                <Link
                                                    to="/shop"
                                                    className="theme-btn-1 btn btn-effect-1"
                                                >
                                                    <FormattedMessage id="home-banner-see-propperties" />
                                                </Link>
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
    );
};
export default BannerV3;
