import React, { Component } from "react";
import { Link } from "react-router-dom";

class ShopDetails extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";

    return (
      <div className="ltn__shop-details-area pb-10">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="ltn__shop-details-inner ltn__page-details-inner mb-60">
                <div className="ltn__blog-meta">
                  <ul>
                    <li className="ltn__blog-category">
                      <Link to="#">Featured</Link>
                    </li>
                    <li className="ltn__blog-category">
                      <Link className="bg-orange" to="#">
                        Alquiler
                      </Link>
                    </li>
                    <li className="ltn__blog-date">
                      <i className="far fa-calendar-alt" />
                      May 19, 2021
                    </li>
                    <li>
                      <Link to="#">
                        <i className="far fa-comments" />
                        35 Comments
                      </Link>
                    </li>
                  </ul>
                </div>
                <h1>Diamond Manor Apartment</h1>
                <label>
                  <span className="ltn__secondary-color">
                    <i className="flaticon-pin" />
                  </span>{" "}
                  Montevideo, Uruguay
                </label>
                <h4 className="title-2">Description</h4>
                <p>
                  Massa tempor nec feugiat nisl pretium. Egestas fringilla
                  phasellus faucibus scelerisque eleifend donec Porta nibh
                  venenatis cras sed felis eget velit aliquet. Neque volutpat ac
                  tincidunt vitae semper quis lectus. Turpis in eu mi bibendum
                  neque egestas congue quisque. Sed elementum tempus egestas sed
                  sed risus pretium quam. Dignissim sodales ut eu sem. Nibh
                  mauris cursus mattis molestee iaculis at erat pellentesque. Id
                  interdum velit laoreet id donec ultrices tincidunt.
                </p>
                <p>
                  To the left is the modern kitchen with central island, leading
                  through to the unique breakfast family room which feature
                  glass walls and doors out onto the garden and access to the
                  separate utility room.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar---">
                {/* Author Widget */}
                <div className="widget ltn__author-widget">
                  <div className="ltn__author-widget-inner text-center">
                    <img
                      src={publicUrl + "assets/img/team/4.jpg"}
                      alt="Imagen"
                    />
                    <h5>Rosalina D. Willaimson</h5>
                    <small>Traveller/Photographer</small>
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
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Veritatis distinctio, odio, eligendi suscipit
                      reprehenderit atque.
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
              <h4 className="title-2">Location</h4>
              <div className="property-details-google-map mb-60">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9334.271551495209!2d-73.97198251485975!3d40.668170674982946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b0456b5a2e7%3A0x68bdf865dda0b669!2sBrooklyn%20Botanic%20Garden%20Shop!5e0!3m2!1sen!2sbd!4v1590597267201!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  frameBorder={0}
                  allowFullScreen
                  aria-hidden="false"
                  tabIndex={0}
                />
              </div>
              <div className="ltn__shop-details-tab-content-inner--- ltn__shop-details-tab-inner-2 ltn__product-details-review-inner mb-60">
                <h4 className="title-2">Customer Reviews</h4>
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
                      <a href="#"> ( 95 Reviews )</a>
                    </li>
                  </ul>
                </div>
                <hr />
                {/* comment-area */}
                <div className="ltn__comment-area mb-30">
                  <div className="ltn__comment-inner">
                    <ul>
                      <li>
                        <div className="ltn__comment-item clearfix">
                          <div className="ltn__commenter-img">
                            <img
                              src={publicUrl + "assets/img/testimonial/1.jpg"}
                              alt="Imagen"
                            />
                          </div>
                          <div className="ltn__commenter-comment">
                            <h6>
                              <a href="#">Adam Smit</a>
                            </h6>
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
                              </ul>
                            </div>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Doloribus, omnis fugit corporis
                              iste magnam ratione.
                            </p>
                            <span className="ltn__comment-reply-btn">
                              September 3, 2020
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="ltn__comment-item clearfix">
                          <div className="ltn__commenter-img">
                            <img
                              src={publicUrl + "assets/img/testimonial/3.jpg"}
                              alt="Imagen"
                            />
                          </div>
                          <div className="ltn__commenter-comment">
                            <h6>
                              <a href="#">Adam Smit</a>
                            </h6>
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
                              </ul>
                            </div>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Doloribus, omnis fugit corporis
                              iste magnam ratione.
                            </p>
                            <span className="ltn__comment-reply-btn">
                              September 2, 2020
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="ltn__comment-item clearfix">
                          <div className="ltn__commenter-img">
                            <img
                              src={publicUrl + "assets/img/testimonial/2.jpg"}
                              alt="Imagen"
                            />
                          </div>
                          <div className="ltn__commenter-comment">
                            <h6>
                              <a href="#">Adam Smit</a>
                            </h6>
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
                              </ul>
                            </div>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Doloribus, omnis fugit corporis
                              iste magnam ratione.
                            </p>
                            <span className="ltn__comment-reply-btn">
                              September 2, 2020
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* comment-reply */}
                <div className="ltn__comment-reply-area ltn__form-box mb-30">
                  <form action="#">
                    <h4>Add a Review</h4>
                    <div className="mb-30">
                      <div className="add-a-review">
                        <h6>Your Ratings:</h6>
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
                                <i className="fas fa-star" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="fas fa-star" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="input-item input-item-textarea ltn__custom-icon">
                      <textarea
                        placeholder="Type your comments...."
                        defaultValue={""}
                      />
                    </div>
                    <div className="input-item input-item-name ltn__custom-icon">
                      <input type="text" placeholder="Type your name...." />
                    </div>
                    <div className="input-item input-item-email ltn__custom-icon">
                      <input type="email" placeholder="Type your email...." />
                    </div>
                    <div className="input-item input-item-website ltn__custom-icon">
                      <input
                        type="text"
                        name="website"
                        placeholder="Type your website...."
                      />
                    </div>
                    <label className="mb-0">
                      <input type="checkbox" name="agree" /> Save my name,
                      email, and website in this browser for the next time I
                      comment.
                    </label>
                    <div className="btn-wrapper">
                      <button
                        className="btn theme-btn-1 btn-effect-1 text-uppercase"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShopDetails;
