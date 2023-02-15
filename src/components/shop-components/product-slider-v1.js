import React, { Component } from "react";

class ProductSliderV1 extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";

    return (
      <div className="ltn__img-slider-area mb-90">
        <div className="container-fluid">
          <div className="row ltn__image-slider-5-active slick-arrow-1 slick-arrow-1-inner ltn__no-gutter-all">
            <div className="col-lg-12">
              <div className="ltn__img-slide-item-4">
                <a
                  href={publicUrl + "assets/img/houses-ai/pdd/1.png"}
                  data-rel="lightcase:myCollection"
                >
                  <img
                    src={publicUrl + "assets/img/houses-ai/pdd/1.png"}
                    alt="Imagen"
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="ltn__img-slide-item-4">
                <a
                  href={publicUrl + "assets/img/houses-ai/pdd/2.png"}
                  data-rel="lightcase:myCollection"
                >
                  <img
                    src={publicUrl + "assets/img/houses-ai/pdd/2.png"}
                    alt="Imagen"
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="ltn__img-slide-item-4">
                <a
                  href={publicUrl + "assets/img/houses-ai/pdd/3.png"}
                  data-rel="lightcase:myCollection"
                >
                  <img
                    src={publicUrl + "assets/img/houses-ai/pdd/3.png"}
                    alt="Imagen"
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="ltn__img-slide-item-4">
                <a
                  href={publicUrl + "assets/img/houses-ai/pdd/4.png"}
                  data-rel="lightcase:myCollection"
                >
                  <img
                    src={publicUrl + "assets/img/houses-ai/pdd/4.png"}
                    alt="Imagen"
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="ltn__img-slide-item-4">
                <a
                  href={publicUrl + "assets/img/houses-ai/pdd/5.png"}
                  data-rel="lightcase:myCollection"
                >
                  <img
                    src={publicUrl + "assets/img/houses-ai/pdd/5.png"}
                    alt="Imagen"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductSliderV1;
