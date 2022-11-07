import React, { Component } from "react";

class AboutV3 extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    return (
      <div className="ltn__about-us-area pt-115 pb-100 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div className="about-us-img-wrap about-img-left">
                <img
                  src={publicUrl + "assets/img/bonvo-01.png"}
                  alt="About Us"
                />
              </div>
            </div>
            <div className="col-lg-6 align-self-center">
              <div className="about-us-info-wrap">
                <div className="section-title-area ltn__section-title-2--- mb-30">
                  <h6 className="section-subtitle section-subtitle-2--- ltn__secondary-color">
                    Nosotros
                  </h6>
                  <h1 className="section-title">¿Que es bonvo oracle?</h1>
                  <p>
                    Bonvo es un oráculo desarrollado en la red de Moonbean
                    enfocado en brindar información en tiempo real, a través de
                    APIs de la industria inmobiliaria o real state, se brinda
                    información sobre el alquiler y la compra y venta de casas,
                    apartamentos y terrenos. <br />
                    <br />
                    Esto se lleva a cabo mediante un smart contract que trae
                    información off-chain a la blockchain, recolectando
                    información y actualizando al instante. Se creará un token,
                    con un max supply de 100 millones. <br />
                    <br />
                    Este token se entregará como recompensa a aquellos que
                    carguen información o brinden información a la red, que
                    cumplan con el propósito del proyecto. Crear pools en varios
                    Dexs con liquidez del token, para incentivar su uso.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <img
              src={publicUrl + "assets/img/gallery/roadmap.png"}
              alt="Roadmap"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AboutV3;
