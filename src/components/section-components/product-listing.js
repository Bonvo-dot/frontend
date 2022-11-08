import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductListingV1 extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";

    return (
      <div>
        <div className="ltn__product-slider-area ltn__product-gutter pt-115 pb-70">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title-area ltn__section-title-2--- text-center">
                  <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">
                    Property
                  </h6>
                  <h1 className="section-title">Más recientes</h1>
                </div>
              </div>
            </div>
            <div className="row ltn__product-slider-item-three-active--- slick-arrow-1">
              {/* ltn__product-item */}
              {[...Array(9).keys()].map((x) => {
                //map this to the array that is retrieved from the API
                return (
                  <div className="col-xl-4 col-sm-6 col-12">
                    <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5 text-center---">
                      <div className="product-img go-top">
                        <Link to="/product-details">
                          <img
                            src={publicUrl + "assets/img/product-3/1.jpg"}
                            alt="#"
                          />
                        </Link>
                        <div className="real-estate-agent">
                          <div className="agent-img">
                            <Link to="/team-details">
                              <img
                                src={publicUrl + "assets/img/blog/author.jpg"}
                                alt="#"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="product-info">
                        <div className="product-badge">
                          <ul>
                            <li className="sale-badg">Alquiler</li>
                          </ul>
                        </div>
                        <h2 className="product-title go-top">
                          <Link to="/product-details">
                            Apartamento nuevo con hermosa vista
                          </Link>
                        </h2>
                        <div className="product-img-location">
                          <ul>
                            <li>
                              <Link to="/contact">
                                <i className="flaticon-pin" /> Montevideo,
                                Uruguay
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <ul className="ltn__list-item-2--- ltn__list-item-2-before--- ltn__plot-brief">
                          <li>
                            <span>3 </span>
                            Camas
                          </li>
                          <li>
                            <span>2 </span>
                            Baños
                          </li>
                          <li>
                            <span>3450 </span>
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
                                to="/product-details"
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
                            $34,900<label>/Month</label>
                          </span>
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
                  <Link to="/shop" className="theme-btn-1 btn btn-effect-1">
                    Ver todas
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductListingV1;
