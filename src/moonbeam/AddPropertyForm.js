import { BigNumber, ethers, FixedNumber, utils } from "ethers";
import React, { useEffect, useContext, useState } from "react";
import ContextWeb3 from "./ContextWeb3";
import ContractABI from "../abi/ContractABI.json";
import { API_URL } from "./Profile";
import useGeoLocation from "../components/helpers/useGeoLocation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessageToast from "./MessageToast";
import axios from "axios";
import { Web3Storage } from "web3.storage";
import { FormattedMessage } from "react-intl";
import { LanguageContext } from "..";
import messages from "../i18n/messages";

const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
export const contractAddress = utils.getAddress(
  "0xdCa6d6E8f4E69C3Cf86B656f0bBf9b460727Bed9"
);

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
  const location = useGeoLocation();
  const stored_location = JSON.parse(localStorage.getItem("stored_location"));
  const { locale, setLocale } = useContext(LanguageContext);
  const texts = messages[locale];

  const [category] = useState([
    "Departamento",
    "Duplex",
    "Casa",
    "Industrial",
    "Terreno",
    "Oficina",
  ]);

  const [metadata, setMetadata] = useState({
    name: "",
    description: "",
    image: "",
    attributes: [],
  });

  const [image, setImage] = useState();

  const [attributes, setAttributes] = useState([
    {
      trait_type: "Rooms",
      value: 0,
    },
    {
      trait_type: "Size",
      value: 0,
    },
    {
      trait_type: "Category",
      value: "",
    },
  ]);

  const [property, setProperty] = useState({
    timestamp: BigNumber.from(new Date().getTime()),
    tokenId: 0,
    owner: "",
    price: "", //uint
    images: "",
    latitude: "", //int
    longitude: "", //int
    idCategory: "", //uint
    ISOCountry: "",
    staticData: {
      title: "",
      description: "",
      location: "",
      rooms: "", //uint
      size: "", //uint8
    },
  });

  useEffect(() => {
    if (state.address && property.owner === "") {
      setProperty({
        ...property,
        owner: state.address,
      });
    }
  }, [property, state.address, location, metadata]);

  const handleChange = (e) => {
    if (e.target.name === "idCategory") {
      setProperty({ ...property, [e.target.name]: parseInt(e.target.value) });
    } else if (e.target.name === "latitude" || e.target.name === "longitude") {
      console.log(e.target.value);
      if (
        e.target.value === "00" ||
        e.target.value === "0." ||
        e.target.value === ""
      ) {
        setProperty({ ...property, [e.target.name]: 0 });
      } else {
        setProperty({
          ...property,
          [e.target.name]: FixedNumber.from(`${e.target.value}`, "fixed128x18"),
        });
      }
    } else if (
      e.target.name === "title" ||
      e.target.name === "description" ||
      e.target.name === "location"
    ) {
      setProperty({
        ...property,
        staticData: { ...property.staticData, [e.target.name]: e.target.value },
      });
      if (e.target.name === "title") {
        setMetadata({
          ...metadata,
          name: e.target.value,
        });
      } else {
        setMetadata({
          ...metadata,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name === "price") {
      setProperty({
        ...property,
        [e.target.name]: BigNumber.from(parseInt(e.target.value)),
      });
    } else if (e.target.name === "rooms" || e.target.name === "size") {
      setProperty({
        ...property,
        staticData: {
          ...property.staticData,
          [e.target.name]: parseInt(e.target.value),
        },
      });
      if (e.target.name === "rooms") {
        setAttributes([
          {
            trait_type: "Rooms",
            value: parseInt(e.target.value),
          },
          {
            trait_type: "Size",
            value: attributes[1].value,
          },
          {
            trait_type: "Category",
            value: attributes[2].value,
          },
        ]);
      }
      if (e.target.name === "size") {
        setAttributes([
          {
            trait_type: "Rooms",
            value: attributes[0].value,
          },
          {
            trait_type: "Size",
            value: parseInt(e.target.value),
          },
          {
            trait_type: "Category",
            value: attributes[2].value,
          },
        ]);
      }
    } else {
      setProperty({ ...property, [e.target.name]: e.target.value });
    }
  };

  const handleLocation = (e) => {
    if (location.loaded && location.coordinates) {
      console.log("entro aca");
      // let lat = FixedNumber.from(`${location.coordinates.lat}`, "fixed128x18");
      // let lng = FixedNumber.from(`${location.coordinates.lng}`, "fixed128x18");
      setProperty({
        ...property,
        latitude: FixedNumber.from(
          `${location.coordinates.lat}`,
          "fixed128x18"
        ),
        longitude: FixedNumber.from(
          `${location.coordinates.lng}`,
          "fixed128x18"
        ),
      });
    }
    if (stored_location.ISOCountry !== "") {
      setProperty({
        ...property,
        latitude: FixedNumber.from(
          stored_location.latitude._value,
          "fixed128x18"
        ),
        longitude: FixedNumber.from(
          stored_location.longitude._value,
          "fixed128x18"
        ),
      });
    }
  };

  const handleChangeCategory = (e) => {
    setProperty({
      ...property,
      idCategory: parseInt(e.target.value),
    });
    setAttributes([
      {
        trait_type: "Rooms",
        value: attributes[0].value,
      },
      {
        trait_type: "Size",
        value: attributes[1].value,
      },
      {
        trait_type: "Category",
        value: category[e.target.value],
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      property.images === "" ||
      property.title === "" ||
      property.description === "" ||
      property.price === "" ||
      property.location === "" ||
      property.rooms === "" ||
      property.category === "" ||
      property.latitude === "" ||
      property.longitude === ""
    ) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    setMetadata((prev) => {
      return {
        ...prev,
        image: property.images,
        attributes: attributes,
      };
    });

    const form = new FormData();
    form.append("file", image);
    form.append("name", metadata.name);
    form.append("description", metadata.description);
    form.append("attributes", attributes);

    const id = toast.loading(
      "Transacción en progreso. Por favor, espere la confirmación...",
      {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );

    let sendProperty = property;
    await axios
      .post(`${API_URL}/nft-storage`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setProperty((prev) => {
          return {
            ...prev,
            images: [res.data],
          };
        });
        sendProperty.images = [res.data];
        return res.data;
      });

    console.log(sendProperty);

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

        const res = await (
          await contract.createAsset(sendProperty).then((tx) => {
            toast(<MessageToast txHash={tx.hash} />, {
              autoClose: 5000,
            });
          })
        ).wait();
        // .then((tx) => {
        //   console.log(tx);
        // })
        // .catch((error) => {
        //   console.log(error);
        // })

        toast.update(id, {
          render: `
          Transacción realizada correctamente! 🎉
          `,
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        console.log(res);
      }
      handleReset();
    } catch (error) {
      console.log("error", error);
    }
    return;
  };

  const handleImage = async (e) => {
    e.preventDefault();
    const client = new Web3Storage({
      token: process.env.REACT_APP_WEB3STORAGE_APIKEY,
    });
    const rootCid = await client.put(e.target.files);
    const info = await client.status(rootCid);
    const res = await client.get(rootCid);
    const files = await res.files();
    setProperty({
      ...property,
      images: ["https://" + files[0].cid + ".ipfs.w3s.link"],
    });
    setImage(files[0]);
    for (const file of files) {
      console.log(`${file.cid} ${file.name} ${file.size}`);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setProperty({
      timestamp: "",
      tokenId: 0,
      owner: "",
      price: "", //uint
      images: "",
      latitude: "", //int
      longitude: "", //int
      idCategory: "", //uint
      ISOCountry: "",
      staticData: {
        title: "",
        description: "",
        location: "",
        rooms: "", //uint
        size: "", //uint8
      },
    });
  };

  return (
    <div className="ltn__myaccount-tab-content-inner">
      <h1>
        <FormattedMessage id="myaccount-add-property-page-title" />
      </h1>
      <br />
      <h6>
        <FormattedMessage id="myaccount-add-property-details-title" />
      </h6>
      <div className="row">
        <div className="col-md-12">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="title"
              placeholder={messages["myaccount-add-property-title-field"]}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="input-item input-item-textarea ltn__custom-icon">
            <textarea
              name="description"
              placeholder={messages["myaccount-add-property-description-field"]}
              onChange={(e) => handleChange(e)}
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h6>
            <FormattedMessage id="myaccount-add-property-price-field" />
          </h6>
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
          <h6>
            <FormattedMessage id="myaccount-add-property-category-field" />
          </h6>
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
      <h6>
        <FormattedMessage id="myaccount-add-property-pictures-field" />
      </h6>
      <input
        type="file"
        id="myFile"
        name="images"
        className="btn theme-btn-3 mb-10"
        onChange={handleImage}
      />
      <br />
      <p>
        <small>
          <FormattedMessage id="myaccount-add-property-pictures-comments-1" />
        </small>
        <br />
        <small>
          <FormattedMessage id="myaccount-add-property-pictures-comments-2" />
        </small>
        <br />
        <small>
          <FormattedMessage id="myaccount-add-property-pictures-comments-3" />
        </small>

        {/* <FormattedMessage id="myaccount-add-property-pictures-comments" /> */}
      </p>
      <h6>
        <FormattedMessage id="myaccount-add-property-location-title" />
      </h6>
      <div className="row">
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="location"
              placeholder={messages["myaccount-add-property-address-field"]}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="ISOCountry"
              placeholder={messages["myaccount-add-property-country-field"]}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="ltn__name"
              placeholder={messages["myaccount-add-property-state-field"]}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="ltn__name"
              placeholder={messages["myaccount-add-property-city-field"]}
            />
          </div>
        </div>
        {/* <div className="col-lg-12">
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
        </div> */}

        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="latitude"
              value={property.latitude}
              placeholder={messages["myaccount-add-property-lat-field"]}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="longitude"
              value={property.longitude}
              placeholder={messages["myaccount-add-property-lon-field"]}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="col-md-6" style={{ marginBottom: "1rem" }}>
          <label className="checkbox-inline">
            <input
              type="checkbox"
              disabled={!location.coordinates}
              onChange={(e) => handleLocation(e)}
            />
            &nbsp;{" "}
            <FormattedMessage id="myaccount-add-property-load-automatically" />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="rooms"
              placeholder={messages["myaccount-add-property-rooms-field"]}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="size"
              placeholder={messages["myaccount-add-property-size-field"]}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="bathrooms"
              placeholder={messages["myaccount-add-property-bathrooms-field"]}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="garages"
              placeholder={messages["myaccount-add-property-garages-field"]}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="basement"
              placeholder={messages["myaccount-add-property-basement-field"]}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="terrace"
              placeholder={messages["myaccount-add-property-balcony-field"]}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </div>

      <div className="btn-wrapper text-center--- mt-30">
        <button
          className="btn theme-btn-1 btn-effect-1 text-uppercase"
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          <FormattedMessage id="myaccount-add-property-save-button" />
        </button>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default AddPropertyForm;
