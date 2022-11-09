import { ethers, utils } from "ethers";
import React, { useEffect, useContext, useState } from "react";
import { contractAddress, uuidv4 } from "./AddPropertyForm";
import ContractABI from "../abi/ContractABI.json";
import ContextWeb3 from "./ContextWeb3";

const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
export const API_URL = process.env.REACT_APP_API_URL;

const Profile = ({ user }) => {
  let publicUrl = process.env.PUBLIC_URL + "/";
  const { state } = useContext(ContextWeb3);
  const [profile, setProfile] = useState({
    idUser: "",
    firstName: "",
    lastName: "",
    isoCountry: "",
    reputation: 0,
    image: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (state.address && profile.idUser === "") {
      setProfile({ ...profile, idUser: utils.getAddress(`${state.address}`) });
    }
  }, [profile, state]);

  useEffect(() => {
    if (user.lastName.length > 0 && user.firstName.length > 0) {
      setProfile({
        ...profile,
        lastName: user.lastName,
        firstName: user.firstName,
      });
    }
    if (
      user.lastName.length > 0 &&
      user.firstName.length > 0 &&
      user.image.length > 0
    ) {
      setProfile({
        ...profile,
        lastName: user.lastName,
        firstName: user.firstName,
        image: user.image,
      });
    }
    if (
      user.lastName.length > 0 &&
      user.firstName.length > 0 &&
      user.image.length > 0 &&
      user.isoCountry.length > 0
    ) {
      setProfile({
        ...profile,
        lastName: user.lastName,
        firstName: user.firstName,
        image: user.image,
        isoCountry: user.isoCountry,
      });
    }
  }, [user]);

  const handleImage = (e) => {
    const postId = uuidv4();
    const file = e.target.files[0];
    const blob = file.slice(0, file.size, "image/jpeg");
    const newFile = new File([blob], `${postId}_post.jpeg`, {
      type: "image/jpeg",
    });
    const formData = new FormData();
    formData.append("image", newFile);
    console.log(formData);
    fetch(`${API_URL}/upload_profile`, {
      method: "POST",
      body: formData,
      mode: "no-cors",
    })
      .then((response) => console.log(response))
      .then((data) => {
        console.log(data);
        setProfile({ ...profile, image: IMAGE_URL + newFile.name });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          .createUser(profile.idUser, profile)
          .then((response) => {
            console.log("transaction", transaction);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="ltn__myaccount-tab-content-inner">
      <div className="ltn__form-box">
        <h6>Editar tu Perfil</h6>
        <form action="#" onSubmit={handleSubmit}>
          <div className="row mb-50">
            <div className="author-img">
              <img
                src={
                  !profile.image || profile.image === ""
                    ? `${publicUrl + "assets/img/user.webp"}`
                    : profile.image
                }
                alt="Author"
                style={{ height: "200px", width: "200px", borderRadius: "50%" }}
              />
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImage}
                className="btn theme-btn-3 ltn__custom-icon"
                style={{
                  paddingRight: 0,
                  paddingLeft: 0,
                  top: 0,
                }}
              />
            </div>
            <div className="col-md-6">
              <label>Nombre:</label>
              <div className="input-item input-item-textarea ltn__custom-icon">
                <input
                  type="text"
                  name="firstName"
                  placeholder={profile.firstName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label>Apellido:</label>
              <div className="input-item input-item-textarea ltn__custom-icon">
                <input
                  type="text"
                  name="lastName"
                  placeholder={profile.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label>Pais:</label>
              <div className="input-item input-item-textarea ltn__custom-icon">
                <input
                  type="text"
                  name="isoCountry"
                  placeholder={profile.isoCountry}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="btn-wrapper">
            <button
              type="submit"
              className="btn theme-btn-1 btn-effect-1 text-uppercase"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
