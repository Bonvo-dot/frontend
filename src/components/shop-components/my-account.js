import { BigNumber, ethers, utils } from "ethers";
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ContextWeb3 from "../../moonbeam/ContextWeb3";
import ModalReview from "../../moonbeam/ModalReview";
import Profile from "../../moonbeam/Profile";
import AddPropertyForm, {
  contractAddress,
} from "./../../moonbeam/AddPropertyForm";
import ContractABI from "../../abi/ContractABI.json";

function MyAccount() {
  let publicUrl = process.env.PUBLIC_URL + "/";
  const { state } = useContext(ContextWeb3);

  const [user, setUser] = useState({
    idUser: "",
    firstName: "",
    lastName: "",
    isoCountry: "",
    reputation: "",
    image: "",
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

  const [assets, setAssets] = useState([]);

  const [asset, setAsset] = useState({
    title: "",
    owner: "",
    price: "",
    description: "",
    latitude: "",
    longitude: "",
    rooms: "",
    assetCategory: "",
    location: "",
    idCategory: "",
    ISOCountry: "",
  });

  /* Fetch Assets */
  let assetId = 1;
  useEffect(() => {
    const fetchAsset = async () => {
      if (state.address && asset.title === "") {
        try {
          const { ethereum } = window;
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner(state.address);
            const contract = new ethers.Contract(
              contractAddress,
              ContractABI,
              signer
            );
            const transaction = await contract
              .assetsByTokenId(assetId)
              .then(async (tx) => {
                const txAsset = {
                  title: tx.title,
                  owner: tx.owner,
                  price: tx.price.toNumber(),
                  description: tx.description,
                  latitude: tx.latitude.toNumber(),
                  longitude: tx.longitude.toNumber(),
                  rooms: tx.rooms.toNumber(),
                  assetCategory: tx.assetCategory,
                  location: tx.location,
                  idCategory: tx.idCategory.toNumber(),
                  ISOCountry: tx.ISOCountry,
                };
                setAssets((assets) => [...assets, txAsset]);
              })
              .catch((error) => {
                console.log(error);
              });
            await transaction?.wait();
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    };
    fetchAsset();
  }, [asset, state]);
  console.log(assets);

  /* Fetch User */
  useEffect(() => {
    const fetchUser = async () => {
      if (state.address && user.idUser === "") {
        try {
          const { ethereum } = window;
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner(state.address);
            const contract = new ethers.Contract(
              contractAddress,
              ContractABI,
              signer
            );
            const transaction = await contract
              .users(utils.getAddress(`${state.address}`))
              .then((tx) => {
                setUser({
                  ...user,
                  idUser: utils.getAddress(`${state.address}`),
                  firstName: tx.firstName,
                  lastName: tx.lastName,
                  isoCountry: tx.isoCountry,
                  reputation: tx.reputation, //BigNumber.from(tx.reputation),
                  image: tx.image,
                });
                console.log("tx", tx);
              })
              .catch((error) => {
                console.log(error);
              });
            await transaction?.wait();
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    };
    fetchUser();
  }, [user, state]);

  return (
    <div className="liton__wishlist-area pb-70">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* PRODUCT TAB AREA START */}
            <div className="ltn__product-tab-area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="ltn__tab-menu-list mb-50">
                      <div className="nav">
                        <a
                          className="active show"
                          data-bs-toggle="tab"
                          href="#ltn_tab_1_2"
                        >
                          Perfil <i className="fas fa-user" />
                        </a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_4">
                          Datos Personales <i className="fas fa-user" />
                        </a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_5">
                          Mis Propiedades <i className="fa-solid fa-list" />
                        </a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_6">
                          Historial de propiedades
                          <i className="fa-solid fa-heart" />
                        </a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_7">
                          Agregar Propiedad{" "}
                          <i className="fa-solid fa-map-location-dot" />
                        </a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_8">
                          Recompensas{" "}
                          <i className="fa-solid fa-money-check-dollar" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="tab-content">
                      <div className="tab-pane active show" id="ltn_tab_1_2">
                        <div className="ltn__myaccount-tab-content-inner">
                          {/* comment-area */}
                          <div className="ltn__comment-area mb-50">
                            <div className="ltn-author-introducing clearfix">
                              <div className="author-img">
                                <img
                                  src={
                                    user.image !== "" &&
                                    user.image !== undefined
                                      ? user.image
                                      : `${publicUrl + "assets/img/user.webp"}`
                                  }
                                  alt="Author"
                                  style={{
                                    borderRadius: "50%",
                                  }}
                                />
                              </div>
                              <div className="author-info">
                                <h6>Agente Inmobiliario</h6>
                                <h2>
                                  {user.firstName} {user.lastName}
                                </h2>
                                <div className="footer-address">
                                  <ul>
                                    <li>
                                      <div className="footer-address-icon">
                                        <i className="icon-placeholder" />
                                      </div>
                                      <div className="footer-address-info">
                                        <p>{user.isoCountry}</p>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="ltn_tab_1_4">
                        <Profile user={user} />
                      </div>
                      <div className="tab-pane fade" id="ltn_tab_1_5">
                        <div className="ltn__myaccount-tab-content-inner">
                          <div className="ltn__my-properties-table table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">Mis propiedades</th>
                                  <th scope="col" />
                                  <th scope="col">Fecha de ingreso</th>
                                  <th scope="col">Borrar</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[...Array(2).keys()].map((x) => {
                                  //map this to the array that is retrieved from the API
                                  return (
                                    <tr key={x}>
                                      <td className="ltn__my-properties-img go-top">
                                        <Link to="/product-details">
                                          <img
                                            src={
                                              publicUrl +
                                              "assets/img/houses/house" +
                                              (x + 3) +
                                              ".jpg"
                                            }
                                            alt="#"
                                          />
                                        </Link>
                                      </td>
                                      <td>
                                        <div className="ltn__my-properties-info">
                                          <h6 className="mb-10 go-top">
                                            <Link to="/product-details">
                                              Apartamento nuevo con hermosa
                                              vista
                                            </Link>
                                          </h6>
                                          <small>
                                            <i className="icon-placeholder" />{" "}
                                            Montevideo, Uruguay
                                          </small>
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
                                      </td>
                                      <td>Feb 22, 2022</td>
                                      <td>
                                        <Link to="#">
                                          <i className="fa-solid fa-trash-can" />
                                        </Link>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                          <div className="ltn__pagination-area text-center">
                            <div className="ltn__pagination">
                              <ul>
                                <li>
                                  <Link to="#">
                                    <i className="fas fa-angle-double-left" />
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">1</Link>
                                </li>
                                <li className="active">
                                  <Link to="#">2</Link>
                                </li>
                                <li>
                                  <Link to="#">3</Link>
                                </li>
                                <li>
                                  <Link to="#">...</Link>
                                </li>
                                <li>
                                  <Link to="#">10</Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <i className="fas fa-angle-double-right" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="ltn_tab_1_6">
                        <div className="ltn__myaccount-tab-content-inner">
                          <div className="ltn__my-properties-table table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">Propiedad</th>
                                  <th scope="col" />
                                  <th scope="col">Fecha Ingreso</th>
                                  <th scope="col">Acciones</th>
                                  <th scope="col">Borrar</th>
                                </tr>
                              </thead>
                              <tbody>
                                {assets.length > 0 &&
                                  assets.map((x, idx) => {
                                    //map this to the array that is retrieved from the API
                                    return (
                                      <tr key={x}>
                                        <td className="ltn__my-properties-img go-top">
                                          <Link to="/product-details">
                                            <img
                                              src={
                                                publicUrl +
                                                "assets/img/houses/house" +
                                                (x + 3) +
                                                ".jpg"
                                              }
                                              alt="#"
                                            />
                                          </Link>
                                        </td>
                                        <td>
                                          <div className="ltn__my-properties-info">
                                            <h6 className="mb-10 go-top">
                                              <Link
                                                to={`/product-details/${assetId}`}
                                              >
                                                {x.title}
                                              </Link>
                                            </h6>
                                            <small>
                                              <i className="icon-placeholder" />{" "}
                                              {x.ISOCountry}
                                            </small>
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
                                                  <a href="#">
                                                    {" "}
                                                    ( 95 Reviews )
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </td>
                                        <td>Feb 22, 2022</td>
                                        <td>
                                          <button
                                            className="btn reverse-color theme-btn-3 custom-review-btn"
                                            data-bs-toggle="modal"
                                            data-bs-target="#quick_view_modal"
                                          >
                                            <Link to="#">Dejar Reseña</Link>
                                          </button>
                                        </td>
                                        <td className="centered-tc-cell">
                                          <Link to="#">
                                            <i className="fa-solid fa-trash-can" />
                                          </Link>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                <ModalReview />
                              </tbody>
                            </table>
                          </div>
                          <div className="ltn__pagination-area text-center">
                            <div className="ltn__pagination">
                              <ul>
                                <li>
                                  <Link to="#">
                                    <i className="fas fa-angle-double-left" />
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">1</Link>
                                </li>
                                <li className="active">
                                  <Link to="#">2</Link>
                                </li>
                                <li>
                                  <Link to="#">3</Link>
                                </li>
                                <li>
                                  <Link to="#">...</Link>
                                </li>
                                <li>
                                  <Link to="#">10</Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <i className="fas fa-angle-double-right" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="ltn_tab_1_7">
                        <AddPropertyForm />
                      </div>
                      <div className="tab-pane fade" id="ltn_tab_1_8">
                        <div className="ltn__myaccount-tab-content-inner">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="mt-50">
                                <h4 className="title-2">Bonvo Balance</h4>
                                <table className="table no-background">
                                  <tbody>
                                    <tr>
                                      <td>
                                        1000 Bonv <strong>× 2</strong>
                                      </td>
                                      <td>
                                        <a className="btn btn-effect-3 btn-white">
                                          Enviar
                                        </a>
                                        <a className="btn btn theme-btn-1 btn-effect-1">
                                          Recibir
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="mt-50">
                                <h4 className="title-2">Historial</h4>
                                <table className="table">
                                  <tbody>
                                    <tr>
                                      <td>
                                        {" "}
                                        <a href="#">
                                          http://bonvo.com/propiedad-1
                                        </a>{" "}
                                      </td>
                                      <td>0.2222123</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        {" "}
                                        <a href="#">
                                          http://bonvo.com/propiedad-2
                                        </a>{" "}
                                      </td>
                                      <td>0.3124124</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="mt-50">
                                  <h4 className="title-2">NFT</h4>
                                  <p>Work in progress</p>
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
            {/* PRODUCT TAB AREA END */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
