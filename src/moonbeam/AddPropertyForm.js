import { ethers, FixedNumber } from "ethers";
import React, { useEffect, useContext, useState } from "react";
import ContextWeb3 from "./ContextWeb3";
import useGeoLocation from "../components/helpers/useGeoLocation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormattedMessage } from "react-intl";
import { LanguageContext } from "..";
import { Web3Storage } from "web3.storage";
import messages from "../i18n/messages";
import {
  addProperty,
  checkAllowance,
  isUser,
  registerUser,
} from "../components/helpers/bonvoProperties";

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
  const { locale } = useContext(LanguageContext);
  const texts = messages[locale];

  const [category] = useState([
    "Flat",
    "Duplex",
    "House",
    "Industrial",
    "Land",
    "Office",
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
    timestamp: new Date().getTime(),
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
      address: "",
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
    const attrChanged = e.target.name;
    const newValue = e.target.value;
    console.log("attrChanged", attrChanged);
    console.log("newValue", newValue);
    const matchAtr = (str) => str === attrChanged;

    if (["idCategory"].find(matchAtr)) {
      setProperty({ ...property, [attrChanged]: parseInt(newValue) });
    } else if (["latitude", "longitude"].find(matchAtr)) {
      if (["00", "0.", ""].find(newValue)) {
        setProperty({ ...property, [e.target.name]: 0 });
      } else {
        setProperty({
          ...property,
          [attrChanged]: FixedNumber.from(`${newValue}`, "fixed128x18"),
        });
      }
    } else if (["title", "description", "address"].find(matchAtr)) {
      setProperty({
        ...property,
        staticData: { ...property.staticData, [attrChanged]: newValue },
      });
      if (attrChanged === "title") {
        setMetadata({
          ...metadata,
          name: newValue,
        });
      } else {
        setMetadata({
          ...metadata,
          [attrChanged]: newValue,
        });
      }
    } else if (attrChanged === "price") {
      setProperty({
        ...property,
        [attrChanged]: newValue,
      });
    } else if (["rooms", "size"].find(matchAtr)) {
      setProperty({
        ...property,
        staticData: {
          ...property.staticData,
          [attrChanged]: parseInt(newValue),
        },
      });
      if (attrChanged === "rooms") {
        setAttributes([
          {
            trait_type: "Rooms",
            value: parseInt(newValue),
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
      if (attrChanged === "size") {
        setAttributes([
          {
            trait_type: "Rooms",
            value: attributes[0].value,
          },
          {
            trait_type: "Size",
            value: parseInt(newValue),
          },
          {
            trait_type: "Category",
            value: attributes[2].value,
          },
        ]);
      }
    } else {
      setProperty({ ...property, [attrChanged]: newValue });
    }
  };

  const handleLocation = (e) => {
    console.log("[handleLocation] e: ", e);

    if (location.loaded && location.coordinates) {
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
    console.log("[handleChangeCategory] e: ", e);
    const newValue = e.target.value;
    console.log("[handleChangeCategory] newValue: ", newValue);
    console.log("[handleChangeCategory] attributes: ", attributes);

    setProperty({
      ...property,
      idCategory: newValue,
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
    console.log("[handleSubmit] e: ", e);

    e.preventDefault();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(state.address);
    const hasAllowance = await checkAllowance(signer);
    if (!hasAllowance) {
      toast.error("Allowance failed");
      return;
    }

    if (
      property.images === "" ||
      property.staticData.title === "" ||
      property.staticData.description === "" ||
      property.staticData.address === "" ||
      property.staticData.rooms === "" ||
      property.price === "" ||
      property.idCategory === "" ||
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

    let sendProperty = { ...property };
    console.log(sendProperty);

    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(state.address);
        let _isUser = await isUser(state.address);
        if (!_isUser) {
          toast.update(id, {
            render: `Should register a new user. Price 1 BNV`,
            isLoading: false,
          });
          const receipt = await registerUser(signer, "");
          if (receipt && receipt.status === 1) {
            _isUser = true;
          }
        }

        if (_isUser) {
          const receipt = await addProperty(signer, sendProperty);
          if (receipt && receipt.status === 1) {
            toast.update(id, {
              render: `Transacción realizada correctamente! 🎉`,
              type: "success",
              isLoading: false,
              autoClose: 5000,
            });
          }
        }
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
        address: "",
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
            <FormattedMessage id={"myaccount-add-property-title-field"}>
              {(msg) => (
                <input
                  type="text"
                  name="title"
                  placeholder={`${msg}`}
                  onChange={(e) => handleChange(e)}
                />
              )}
            </FormattedMessage>
          </div>
          <div className="input-item input-item-textarea ltn__custom-icon">
            <FormattedMessage id={"myaccount-add-property-description-field"}>
              {(msg) => (
                <textarea
                  name="description"
                  placeholder={`${msg}`}
                  defaultValue={""}
                  onChange={(e) => handleChange(e)}
                />
              )}
            </FormattedMessage>
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
              name="idCategory"
              onChange={handleChangeCategory}
            >
              <FormattedMessage
                id="myaccount-add-property-select"
                tagName="option"
              />
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
            <FormattedMessage id={"myaccount-add-property-address-field"}>
              {(msg) => (
                <input
                  type="text"
                  name="address"
                  placeholder={`${msg}`}
                  onChange={(e) => handleChange(e)}
                />
              )}
            </FormattedMessage>
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <FormattedMessage id={"myaccount-add-property-country-field"}>
              {(msg) => (
                <input
                  type="text"
                  name="ISOCountry"
                  placeholder={`${msg}`}
                  onChange={(e) => handleChange(e)}
                />
              )}
            </FormattedMessage>
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <FormattedMessage id={"myaccount-add-property-state-field"}>
              {(msg) => (
                <input
                  type="text"
                  name="state__name"
                  placeholder={`${msg}`}
                  onChange={(e) => handleChange(e)}
                />
              )}
            </FormattedMessage>
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <FormattedMessage id={"myaccount-add-property-city-field"}>
              {(msg) => (
                <input
                  type="text"
                  name="city__name"
                  placeholder={`${msg}`}
                  onChange={(e) => handleChange(e)}
                />
              )}
            </FormattedMessage>
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
            <FormattedMessage id={"myaccount-add-property-lat-field"}>
              {(msg) => (
                <input
                  type="text"
                  name="latitude"
                  placeholder={`${msg}`}
                  value={property.latitude}
                  onChange={(e) => handleChange(e)}
                />
              )}
            </FormattedMessage>
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <FormattedMessage id={"myaccount-add-property-lon-field"}>
              {(msg) => (
                <input
                  type="text"
                  name="longitude"
                  placeholder={`${msg}`}
                  value={property.longitude}
                  onChange={(e) => handleChange(e)}
                />
              )}
            </FormattedMessage>
          </div>
        </div>
        <div className="col-md-6" style={{ marginBottom: "1rem" }}>
          <label className="checkbox-inline">
            <input
              type="checkbox"
              disabled={!location.coordinates}
              onChange={(e) => handleLocation(e)}
            />
            &nbsp;
            <FormattedMessage id="myaccount-add-property-load-automatically" />
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <FormattedMessage id={"myaccount-add-property-rooms-field"}>
              {(msg) => (
                <input
                  type="text"
                  name="rooms"
                  placeholder={`${msg}`}
                  onChange={(e) => handleChange(e)}
                />
              )}
            </FormattedMessage>
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <FormattedMessage id={"myaccount-add-property-size-field"}>
              {(msg) => (
                <input
                  type="text"
                  name="size"
                  placeholder={`${msg}`}
                  onChange={(e) => handleChange(e)}
                />
              )}
            </FormattedMessage>
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <FormattedMessage id={"myaccount-add-property-bathrooms-field"}>
              {(msg) => (
                <input
                  type="text"
                  name="bathrooms"
                  placeholder={`${msg}`}
                  onChange={(e) => handleChange(e)}
                />
              )}
            </FormattedMessage>
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <FormattedMessage id={"myaccount-add-property-garages-field"}>
              {(msg) => (
                <input
                  type="text"
                  name="garages"
                  placeholder={`${msg}`}
                  onChange={(e) => handleChange(e)}
                />
              )}
            </FormattedMessage>
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <FormattedMessage id={"myaccount-add-property-basement-field"}>
              {(msg) => (
                <input
                  type="text"
                  name="basement"
                  placeholder={`${msg}`}
                  onChange={(e) => handleChange(e)}
                />
              )}
            </FormattedMessage>
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <FormattedMessage id={"myaccount-add-property-balcony-field"}>
              {(msg) => (
                <input
                  type="text"
                  name="terrace"
                  placeholder={`${msg}`}
                  onChange={(e) => handleChange(e)}
                />
              )}
            </FormattedMessage>
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
