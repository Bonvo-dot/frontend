import { BigNumber } from "ethers";
import React from "react";
import { FormattedMessage } from "react-intl";

const Sidebar = (props) => {
    const { setAssets, filterByCategory, setFilterByCategory } = props;
    const handleFilterByCategory = (e) => {
        setFilterByCategory(BigNumber.from(parseInt(e.target.name)));
        setAssets([]);
    };

    let anchor = "#";

    let publicUrl = process.env.PUBLIC_URL + "/";
    return (
        <div className="col-lg-4  mb-100">
            <aside className="sidebar ltn__shop-sidebar">
                <h3 className="mb-10">
                    <FormattedMessage id="properties-information-title" />
                </h3>
                {/* Advance Information widget */}
                <div className="widget ltn__menu-widget">
                    <h4 className="ltn__widget-title">
                        <FormattedMessage id="properties-type-title" />
                    </h4>
                    <ul>
                        <li>
                            <label className="checkbox-item">
                                <FormattedMessage id="properties-house" />
                                <input
                                    type="checkbox"
                                    name="2"
                                    checked={filterByCategory === "2"}
                                    onChange={handleFilterByCategory}
                                />
                                <span className="checkmark" />
                            </label>
                            <span className="categorey-no">3,924</span>
                        </li>
                        <li>
                            <label className="checkbox-item">
                                <FormattedMessage id="properties-apartment" />
                                <input
                                    type="checkbox"
                                    name="0"
                                    checked={filterByCategory === "0"}
                                    onChange={handleFilterByCategory}
                                />
                                <span className="checkmark" />
                            </label>
                            <span className="categorey-no">3,610</span>
                        </li>
                        <li>
                            <label className="checkbox-item">
                                <FormattedMessage id="properties-office" />
                                <input
                                    type="checkbox"
                                    name="5"
                                    checked={filterByCategory === "5"}
                                    onChange={handleFilterByCategory}
                                />
                                <span className="checkmark" />
                            </label>
                            <span className="categorey-no">2,912</span>
                        </li>
                        <li>
                            <label className="checkbox-item">
                                <FormattedMessage id="properties-duplex" />
                                <input
                                    type="checkbox"
                                    name="1"
                                    checked={filterByCategory === "1"}
                                    onChange={handleFilterByCategory}
                                />
                                <span className="checkmark" />
                            </label>
                            <span className="categorey-no">2,687</span>
                        </li>
                        <li>
                            <label className="checkbox-item">
                                <FormattedMessage id="properties-industrial" />
                                <input
                                    type="checkbox"
                                    name="3"
                                    checked={filterByCategory === "3"}
                                    onChange={handleFilterByCategory}
                                />
                                <span className="checkmark" />
                            </label>
                            <span className="categorey-no">2,687</span>
                        </li>
                    </ul>
                    <hr />

                    <div className="widget--- ltn__price-filter-widget">
                        <h4 className="ltn__widget-title ltn__widget-title-border---">
                            <FormattedMessage id="properties-filter-price" />
                        </h4>
                        <div className="price_filter">
                            <div className="price_slider_amount">
                                <input
                                    type="submit"
                                    defaultValue="Your range:"
                                />
                                <input
                                    type="text"
                                    className="amount"
                                    name="price"
                                    placeholder="Ingresa el precio"
                                />
                            </div>
                            <div className="slider-range" />
                        </div>
                    </div>

                    <h4 className="ltn__widget-title">
                        <FormattedMessage id="properties-categories" />
                    </h4>
                    <ul>
                        <li>
                            <label className="checkbox-item">
                                <FormattedMessage id="properties-rent" />
                                <input type="checkbox" />
                                <span className="checkmark" />
                            </label>
                            <span className="categorey-no">3,610</span>
                        </li>
                    </ul>
                </div>

                {/* Price Filter Widget */}
                <div className="widget ltn__price-filter-widget d-none">
                    <h4 className="ltn__widget-title ltn__widget-title-border">
                        Filtrar por precio
                    </h4>
                    <div className="price_filter">
                        <div className="price_slider_amount">
                            <input type="submit" defaultValue="Your range:" />
                            <input
                                type="text"
                                className="amount"
                                name="price"
                                placeholder="Add Your Price"
                            />
                        </div>
                        <div className="slider-range" />
                    </div>
                </div>

                {/* Banner Widget */}
                <div className="widget ltn__banner-widget d-none">
                    <a href="shop.html">
                        <img src="img/banner/banner-2.jpg" alt="#" />
                    </a>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
