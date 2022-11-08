import React from "react";
// import Img from "../../public/assets/img/home-demos/vu-anh-TiVPTYCG_3E-unsplash_11zon.webp";

const ModalReview = () => {
  let publicUrl = process.env.PUBLIC_URL + "/";
  return (
    <div className="ltn__modal-area ltn__quick-view-modal-area">
      <div className="modal fade" id="quick_view_modal" tabIndex={-1}>
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="ltn__quick-view-modal-inner">
                <div className="modal-product-item">
                  <div className="row">
                    <div
                      className="col-lg-4 col-12"
                      style={{ display: "flex" }}
                    >
                      <div className="modal-product-img">
                        <img
                          src={
                            publicUrl +
                            "assets/img/vu-anh-TiVPTYCG_3E-unsplash_11zon.webp"
                          }
                          alt="#"
                        />
                      </div>
                    </div>
                    <div className="col-lg-8 col-12">
                      <div className="modal-product-info">
                        <h3>Agregar Reseña</h3>
                        <div className="ltn__form-box contact-form-box box-shadow white-bg">
                          <h4 className="title-2">Describe tu experiencia</h4>
                          <form>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="input-item input-item-textarea ltn__custom-icon">
                                  <textarea
                                    name="review"
                                    placeholder="Reseña"
                                    defaultValue={""}
                                  />
                                </div>
                              </div>
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
                            </div>
                            <div className="btn-wrapper mt-0">
                              <button
                                className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                type="submit"
                              >
                                Enviar Reseña
                              </button>
                            </div>
                            <p className="form-messege mb-0 mt-20" />
                          </form>
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
  );
};

export default ModalReview;
