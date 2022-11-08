import { ethers } from "ethers";
import React, { useCallback, useEffect, useContext, useState } from "react";
import ContextWeb3 from "./ContextWeb3";
import ContractABI from "../abi/ContractABI.json";

const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
const contractAddress =
  process.env.REACT_APP_CONTRACT_ADDRESS ||
  "0x9708d21637376a0325d01DA6A2079Cf250Be78e7";

/* {   "assetId": "0xe75F9ae61926FF1d27d16403C938b4cd15c756d5",   "title": "Casa",   "owner": "0xd6dd6c7e69d5fa4178923dac6a239f336e3c40e3",   "price": 110,   "description": "casa",   "images": ["https://storage.googleapis.com/bonvo-bucket/adeeaa00-a262-4ef6-b39c-bc3745deef82_post.jpeg"],   "latitude": 45,   "longitude": 12,   "rooms": 2,   "size": 50,   "assetCategory": 5,   "location": "562 Angel Pisarello", "idCategory": 5 } */

export function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

const AddPropertyForm = () => {
  const { state } = useContext(ContextWeb3);
  const [signer, setSigner] = useState(null);
  console.log(IMAGE_URL);
  const getSigner = useCallback(async () => {
    if (state.web3Provider) {
      const signer = state.web3Provider.getSigner();
      console.log("signer", signer);
      setSigner(signer);
      return signer;
    }
  }, [state.web3Provider]);

  const [category] = useState([
    "Departamento",
    "Duplex",
    "Casa",
    "Industrial",
    "Terreno",
    "Oficina",
  ]);

  const [property, setProperty] = useState({
    assetId: 0xe75f9ae61926ff1d27d16403c938b4cd15c756d5,
    title: "",
    owner: "",
    price: "",
    description: "",
    images: "",
    location: "",
    rooms: "",
    size: "",
    assetCategory: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    console.log(property);
    if (state.address && property.owner === "") {
      setProperty({
        ...property,
        owner: state.address,
      });
    }
    getSigner();
  }, [property, state.address, getSigner]);

  const handleChange = (e) => {
    if (
      e.target.name === "price" ||
      e.target.name === "rooms" ||
      e.target.name === "size" ||
      e.target.name === "latitude" ||
      e.target.name === "longitude"
    ) {
      setProperty({ ...property, [e.target.name]: parseInt(e.target.value) });
    } else {
      setProperty({ ...property, [e.target.name]: e.target.value });
    }
  };

  const handleChangeCategory = (e) => {
    setProperty({ ...property, assetCategory: category[e.target.value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("images", property.images);
    fetch("http://localhost:8080/upload", {
      method: "POST",
      body: formData,
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then(() => {
        setProperty({
          ...property,
          images: [IMAGE_URL + property.images.name],
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    if (
      property.images.length > 0 &&
      property.title.length > 0 &&
      property.description.length > 0 &&
      property.price.length > 0 &&
      property.location.length > 0 &&
      property.rooms.length > 0 &&
      property.size.length > 0 &&
      property.category.length > 0 &&
      property.latitude.length > 0 &&
      property.longitude.length > 0
    ) {
    }

    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          ContractABI,
          signer
        );
        const transaction = await contract.createAsset(property);
        console.log("mining", transaction.hash);
        await transaction.wait();
        console.log("mined", transaction.hash);
      }
    } catch (error) {
      console.log("error", error);
    }
    // const contractInstance = new ethers.Contract(
    //   contractAddress,
    //   ContractABI,
    //   state.web3Provider
    // );
    // console.log(contractInstance);
    // try {
    //   await contractInstance.createAsset().then((res) => {
    //     console.log(res);
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    return;
  };

  const handleImage = (e) => {
    const postId = uuidv4();
    const file = e.target.files[0];
    const blob = file.slice(0, file.size, "image/jpeg");
    const newFile = new File([blob], `${postId}_post.jpeg`, {
      type: "image/jpeg",
    });
    setProperty({ ...property, images: newFile });
  };

  const handleLocation = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition((position) => {
      setProperty({
        ...property,
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setProperty({
      title: "",
      description: "",
      price: "",
      images: "",
      location: "",
      owner: "",
      rooms: "",
      size: "",
      category: "",
      lat: "",
      long: "",
    });
  };

  return (
    <div className="ltn__myaccount-tab-content-inner">
      <h6>Descripcion de la propiedad</h6>
      <div className="row">
        <div className="col-md-12">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="title"
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
        name="images"
        className="btn theme-btn-3 mb-10"
        onChange={handleImage}
      />
      <br />
      <p>
        <small>* Ingrese al menos una imagen superior a 500x500px.</small>
        <br />
        <small>* Pueden ingresarse archivos PDF.</small>
        <br />
        <small>* Las imagenes pueden demorar en procesarse.</small>
      </p>
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
              name="latitude"
              placeholder="Latitud (Google Maps)"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="longitude"
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
          onClick={(e) => handleSubmit(e)}
        >
          Guardar propiedad
        </button>
      </div>
    </div>
  );
};

export default AddPropertyForm;
