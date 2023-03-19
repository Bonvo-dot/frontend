import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

class SearchForm extends Component {
    render() {
        return (
            <div className="ltn__car-dealer-form-area mt--65 mt-120 pb-115---">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ltn__car-dealer-form-tab">
                                <div className="tab-content bg-white box-shadow-1 position-relative pb-10">
                                    <div
                                        className="tab-pane fade active show"
                                        id="ltn__form_tab_1_1"
                                    >
                                        <div className="car-dealer-form-inner">
                                            <form
                                                action="#"
                                                className="ltn__car-dealer-form-box row"
                                            >
                                                <div className="ltn__car-dealer-form-item ltn__custom-icon---- ltn__icon-car---- col-lg-3 col-md-6">
                                                    <select className="nice-select">
                                                        <FormattedMessage
                                                            id="search-section-where"
                                                            tagName="option"
                                                        />
                                                        ?
                                                        <option>
                                                            Argentina
                                                        </option>
                                                        <option>Brasil</option>
                                                        <option>Bolivia</option>
                                                        <option>Chile</option>
                                                        <option>
                                                            Colombia
                                                        </option>
                                                        <option>Ecuador</option>
                                                        <option>Mexico</option>
                                                        <option>Peru</option>
                                                        <option>
                                                            Paraguay
                                                        </option>
                                                        <option>Uruguay</option>
                                                    </select>
                                                </div>
                                                <div className="ltn__car-dealer-form-item ltn__custom-icon---- ltn__icon-meter---- col-lg-3 col-md-6">
                                                    <select className="nice-select">
                                                        <FormattedMessage
                                                            id="search-operation-type"
                                                            tagName="option"
                                                        />
                                                        <FormattedMessage
                                                            id="search-operation-rental"
                                                            tagName="option"
                                                        />
                                                        <FormattedMessage
                                                            id="search-operation-temporary-rental"
                                                            tagName="option"
                                                        />
                                                    </select>
                                                </div>
                                                <div className="ltn__car-dealer-form-item ltn__custom-icon---- ltn__icon-calendar---- col-lg-3 col-md-6">
                                                    <select className="nice-select">
                                                        <FormattedMessage
                                                            id="search-property-type"
                                                            tagName="option"
                                                        />
                                                        <FormattedMessage
                                                            id="search-property-home"
                                                            tagName="option"
                                                        />
                                                        <FormattedMessage
                                                            id="search-property-apartment"
                                                            tagName="option"
                                                        />
                                                        <FormattedMessage
                                                            id="search-property-vila"
                                                            tagName="option"
                                                        />
                                                        <FormattedMessage
                                                            id="search-property-office"
                                                            tagName="option"
                                                        />
                                                    </select>
                                                </div>
                                                <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar col-lg-3 col-md-6">
                                                    <div className="btn-wrapper text-center mt-0 go-top">
                                                        {/* <button type="submit" class="btn theme-btn-1 btn-effect-1 text-uppercase">Search Inventory</button> */}
                                                        <Link
                                                            to="/shop"
                                                            className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                                        >
                                                            <FormattedMessage
                                                                id="menu-search"
                                                                tagName="option"
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="ltn__form_tab_1_2"
                                    >
                                        <div className="car-dealer-form-inner">
                                            <form
                                                action="#"
                                                className="ltn__car-dealer-form-box row"
                                            >
                                                <div className="ltn__car-dealer-form-item ltn__custom-icon---- ltn__icon-car---- col-lg-3 col-md-6">
                                                    <select className="nice-select">
                                                        <option>
                                                            <FormattedMessage id="search-section-where" />
                                                            ?
                                                        </option>
                                                        <option>
                                                            Argentina
                                                        </option>
                                                        <option>Brasil</option>
                                                        <option>Bolivia</option>
                                                        <option>Chile</option>
                                                        <option>
                                                            Colombia
                                                        </option>
                                                        <option>Ecuador</option>
                                                        <option>Mexico</option>
                                                        <option>Peru</option>
                                                        <option>
                                                            Paraguay
                                                        </option>
                                                        <option>Uruguay</option>
                                                    </select>
                                                </div>
                                                <div className="ltn__car-dealer-form-item ltn__custom-icon---- ltn__icon-meter---- col-lg-3 col-md-6">
                                                    <select className="nice-select">
                                                        <FormattedMessage
                                                            id="search-operation-type"
                                                            tagName="option"
                                                        />
                                                        <FormattedMessage
                                                            id="search-operation-rental"
                                                            tagName="option"
                                                        />
                                                        <FormattedMessage
                                                            id="search-operation-temporary-rental"
                                                            tagName="option"
                                                        />
                                                    </select>
                                                </div>
                                                <div className="ltn__car-dealer-form-item ltn__custom-icon---- ltn__icon-calendar---- col-lg-3 col-md-6">
                                                    <select className="nice-select">
                                                        <FormattedMessage
                                                            id="search-property-type"
                                                            tagName="option"
                                                        />
                                                        <FormattedMessage
                                                            id="search-property-home"
                                                            tagName="option"
                                                        />
                                                        <FormattedMessage
                                                            id="search-property-apartment"
                                                            tagName="option"
                                                        />
                                                        <FormattedMessage
                                                            id="search-property-vila"
                                                            tagName="option"
                                                        />
                                                        <FormattedMessage
                                                            id="search-property-office"
                                                            tagName="option"
                                                        />
                                                    </select>
                                                </div>
                                                <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar col-lg-3 col-md-6">
                                                    <div className="btn-wrapper text-center mt-0 go-top">
                                                        {/* <button type="submit" class="btn theme-btn-1 btn-effect-1 text-uppercase">Search Inventory</button> */}
                                                        <Link
                                                            to="/go-top"
                                                            className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                                        >
                                                            <FormattedMessage
                                                                id="menu-search"
                                                                tagName="option"
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchForm;
