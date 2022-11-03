import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ContextWeb3 from "./ContextWeb3";

const AddPropertyForm = () => {
  const { state } = useContext(ContextWeb3);

  const [category] = useState([
    "Departamento",
    "Duplex",
    "Casa",
    "Industrial",
    "Terreno",
    "Oficina",
  ]);

  const [property, setProperty] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    location: "",
    owner: "",
    rooms: "",
    size: "",
    category: "",
    lat: "",
    long: "",
  });

  useEffect(() => {
    console.log(property);
    if (state.address && property.owner === "") {
      setProperty({
        ...property,
        owner: state.address,
      });
    }
  }, [property, state.address]);

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleChangeCategory = (e) => {
    setProperty({ ...property, category: category[e.target.value] });
  };

  return (
    <div className="ltn__myaccount-tab-content-inner">
      <h6>Descripcion de la propiedad</h6>
      <div className="row">
        <div className="col-md-12">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="name"
              placeholder="*Titulo*"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="input-item input-item-textarea ltn__custom-icon">
            <textarea
              name="description"
              placeholder="Descripcion"
              onChange={(e) => handleChange(e)}
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h6>Precio</h6>
          <div className="input-item  input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="price"
              placeholder="$"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <h6>Seleccionar Categoria</h6>
          <div className="input-item">
            <select
              className="nice-select"
              name="category"
              onChange={handleChangeCategory}
            >
              {category.map((cat, idx) => (
                <option key={idx} value={idx} name="category">
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <h6>Listing Media</h6>
      <input
        type="file"
        id="myFile"
        name="image"
        className="btn theme-btn-3 mb-10"
        onChange={(e) => handleChange(e)}
      />
      <br />
      <p>
        <small>* Ingrese al menos una imagen superior a 500x500px.</small>
        <br />
        <small>* Pueden ingresarse archivos PDF.</small>
        <br />
        <small>* Las imagenes pueden demorar en procesarse.</small>
      </p>
      {/* <h6>Video Option</h6>
      <div className="row">
        <div className="col-md-6">
          <div className="input-item">
            <select className="nice-select">
              <option>Video from</option>
              <option>vimeo</option>
              <option>youtube</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input type="text" name="ltn__name" placeholder="Embed Video ID" />
          </div>
        </div>
      </div>
      <h6>Virtual Tour</h6>
      <div className="input-item input-item-textarea ltn__custom-icon">
        <textarea
          name="ltn__message"
          placeholder="Virtual Tour:"
          defaultValue={""}
        />
      </div> */}
      <h6>Listing Location</h6>
      <div className="row">
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="location"
              placeholder="Dirección*"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input type="text" name="ltn__name" placeholder="País" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="ltn__name"
              placeholder="Provincia / Estado / Departamento"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input type="text" name="ltn__name" placeholder="Ciudad" />
          </div>
        </div>
        <div className="col-lg-12">
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
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="lat"
              placeholder="Latitud (Google Maps)"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="long"
              placeholder="Longitud (Google Maps)"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </div>
      <h6>Detalles de la publicación</h6>
      <div className="row">
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="size"
              placeholder="Tamaño en m2"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="rooms"
              placeholder="Ambientes"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="ltn__name"
              placeholder="Año de Construcción"
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="ltn__name"
              placeholder="Disponible desde..."
            />
          </div>
        </div>
      </div>

      <div className="btn-wrapper text-center--- mt-30">
        <button
          className="btn theme-btn-1 btn-effect-1 text-uppercase"
          type="submit"
        >
          Guardar propiedad
        </button>
      </div>
    </div>
  );
};

export default AddPropertyForm;
