import React, { useContext } from "react";
import { Link } from "react-router-dom";
import messages from "./../../i18n/messages";
import { LanguageContext } from "../../../src/index";
import { FormattedMessage } from "react-intl";

const Page_header = (props) => {
    const { locale, setLocale } = useContext(LanguageContext);
    let publicUrl = process.env.PUBLIC_URL + "/";
    let CustomClass = props.customclass ? props.customclass : "";
    let Img = props.Img ? props.Img : "14.jpg";
    const texts = messages[locale];
    let HeaderTitle = texts[props.id_page + "-header"];
    let Subheader = texts[props.id_page + "-subheader"]
        ? texts[props.id_page + "subheader"]
        : HeaderTitle;

    return (
        <div
            className={
                "ltn__breadcrumb-area text-left bg-overlay-white-30 bg-image " +
                CustomClass
            }
            data-bs-bg={publicUrl + "assets/img/bg/14.jpg"}
        >
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ltn__breadcrumb-inner">
                            <h1 className="page-title">{HeaderTitle}</h1>
                            <div className="ltn__breadcrumb-list">
                                <ul>
                                    <li>
                                        <Link to="/">
                                            <span className="ltn__secondary-color">
                                                <i className="fas fa-home" />
                                            </span>
                                            <FormattedMessage id="home-page" />
                                        </Link>
                                    </li>
                                    <li>{Subheader}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page_header;
