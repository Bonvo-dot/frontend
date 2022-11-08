import { ethers, utils } from "ethers";
import React, { useEffect, useContext, useState } from "react";
import { uuidv4 } from "./AddPropertyForm";
import ContractABI from "../abi/ContractABI.json";
import ContextWeb3 from "./ContextWeb3";

const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : process.env.REACT_APP_API_URL;
const contractAddress =
  `${process.env.REACT_APP_CONTRACT_ADDRESS}` ||
  "0x9708d21637376a0325d01DA6A2079Cf250Be78e7";

const Profile = () => {
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
      //   .then(loadPosts())
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
          utils.getAddress("0x9708d21637376a0325d01da6a2079cf250be78e7"),
          ContractABI,
          signer
        );
        const example = {
          idUser: utils.getAddress(
            "0xd6dd6C7e69D5Fa4178923dAc6A239F336e3c40e3"
          ),
          firstName: "Matias",
          lastName: "Palomo",
          isoCountry: "",
          reputation: 0,
          image:
            "https://storage.googleapis.com/bonvo-bucket/81991bc2-fadb-4b18-bd56-d3151b61c61a_post.jpeg",
        };
        const transaction = await contract
          .createUser(
            utils.getAddress("0xd6dd6C7e69D5Fa4178923dAc6A239F336e3c40e3"),
            profile
          )
          .then((response) => {
            console.log("transaction", transaction);
          })
          .catch((error) => {
            console.log("error", error);
          });
        const approveTxSigned = await signer.signTransaction(transaction);
        console.log("mining", transaction.hash);
        await transaction.wait();
        console.log("mined", transaction.hash);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="ltn__myaccount-tab-content-inner">
      <div className="ltn__form-box">
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
                style={{ width: "200px", height: "200px", borderRadius: "50%" }}
              />
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImage}
                className="btn theme-btn-3 ltn__custom-icon"
                style={{
                  width: "50px",
                  height: "50px",
                  paddingRight: 0,
                  paddingLeft: 0,
                  top: 0,
                }}
              />
            </div>
            <div className="col-md-6">
              <label>Nombre:</label>
              <div className="input-item input-item-textarea ltn__custom-icon">
                <input type="text" name="firstName" onChange={handleChange} />
              </div>
            </div>
            <div className="col-md-6">
              <label>Apellido:</label>
              <div className="input-item input-item-textarea ltn__custom-icon">
                <input type="text" name="lastName" onChange={handleChange} />
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
