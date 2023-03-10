import React from "react";

const ProductSlider = (props) => {
    const images = props.asset.images;

    return (
        <div className="ltn__img-slider-area mb-90">
            <div className="container-fluid">
                <div className="row ltn__image-slider-5-active slick-arrow-1 slick-arrow-1-inner ltn__no-gutter-all">
                    {
                        images && images.map(image => {
                            return <div className="col-lg-12">
                                <div className="ltn__img-slide-item-4">
                                    <a
                                        href={image}
                                        data-rel="lightcase:myCollection"
                                    >
                                        <img
                                            src={image}
                                            alt="Imagen"
                                        />
                                    </a>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductSlider;
