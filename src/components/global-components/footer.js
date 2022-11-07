import React, { Component } from "react";
import { Link } from "react-router-dom";
import Social from "../section-components/social";
import Copyright from "./copyright";

class Footer_v1 extends Component {
  componentDidMount() {
    const $ = window.$;

    let publicUrl = process.env.PUBLIC_URL + "/";
    const minscript = document.createElement("script");
    minscript.async = true;
    minscript.src = publicUrl + "assets/js/main.js";

    document.body.appendChild(minscript);

    $(".go-top")
      .find("a")
      .on("click", function () {
        $(".bonvo-overlay").fadeIn(1);

        $(window).scrollTop(0);

        setTimeout(function () {
          $(".bonvo-overlay").fadeOut(300);
        }, 800);
      });

    $(document).on("click", ".theme-btn-1 ", function () {
      $("div").removeClass("modal-backdrop");
      $("div").removeClass("show");
      $("div").removeClass("fade");
      $("body").attr("style", "");
    });
  }

  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    let imgattr = "Footer logo";

    return (
      <footer className="ltn__footer-area  ">
        <div className="footer-top-area  section-bg-2 plr--5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-4 col-md-6 col-sm-6 col-12">
                <div className="footer-widget footer-about-widget">
                  <div className="footer-logo">
                    <div className="site-logo">
                      <img
                        src={publicUrl + "assets/img/logo-2_floating.png"}
                        alt="Logo"
                      />
                    </div>
                  </div>
                  <p>
                    Lorem Ipsum is simply dummy text of the and typesetting
                    industry. Lorem Ipsum is dummy text of the printing.
                  </p>
                  <div className="footer-address">
                    <ul>
                      <li>
                        <div className="footer-address-icon">
                          <i className="icon-placeholder" />
                        </div>
                        <div className="footer-address-info">
                          <p>Hackaton Polkadot Latam</p>
                        </div>
                      </li>
                      <li>
                        <div className="footer-address-icon">
                          <i className="icon-call" />
                        </div>
                        <div className="footer-address-info">
                          <p>
                            <a href="tel:+0123-456789">+0123-456789</a>
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="footer-address-icon">
                          <i className="icon-mail" />
                        </div>
                        <div className="footer-address-info">
                          <p>
                            <a href="mailto:example@example.com">
                              info@bonvo.com
                            </a>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="ltn__social-media mt-20">
                    <Social />
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-md-6 col-sm-6 col-12">
                <div className="footer-widget footer-menu-widget clearfix">
                  <h4 className="footer-title">Proyecto</h4>
                  <div className="footer-menu go-top">
                    <ul>
                      <li>
                        <Link to="/about">Nosotros</Link>
                      </li>
                      <li>
                        <Link to="/shop">Ver propiedades</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contacto</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-md-6 col-sm-6 col-12">
                <div className="footer-widget footer-menu-widget clearfix">
                  <h4 className="footer-title">Servicios</h4>
                  <div className="footer-menu go-top">
                    <ul>
                      <li>
                        <Link to="/cart">Carrito</Link>
                      </li>
                      <li>
                        <Link to="/wishlist">Favoritos</Link>
                      </li>
                      <li>
                        <Link to="/about">Terminos y condiciones</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6 col-sm-6 col-12">
                <div className="footer-widget footer-menu-widget clearfix">
                  <h4 className="footer-title">Servicio al cliente</h4>
                  <div className="footer-menu go-top">
                    <ul>
                      <li>
                        <Link to="/registrarse">Registrarse</Link>
                      </li>
                      <li>
                        <Link to="/login">Iniciar Sesion</Link>
                      </li>
                      <li>
                        <Link to="/my-account">Mi cuenta</Link>
                      </li>
                      <li>
                        <Link to="/add-listing">Agregar propiedad</Link>
                      </li>
                      <li>
                        <Link to="/faq">Reseñas</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contacto</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Copyright />
      </footer>
    );
  }
}

export default Footer_v1;
