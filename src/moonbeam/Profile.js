import { ethers, utils } from "ethers";
import React, { useEffect, useContext, useState } from "react";
import { uuidv4 } from "./AddPropertyForm";
import ContextWeb3 from "./ContextWeb3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormattedMessage } from "react-intl";
import { registerUser } from "../components/helpers/bonvoUser";
import { checkAllowance } from "../components/helpers/bonvoProperties";
import nftstorage from "../utils/nftstorage";
import Pinata from "../utils/pinata";

const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
export const API_URL =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.REACT_APP_API_URL;

const Profile = ({ user }) => {
    let publicUrl = process.env.PUBLIC_URL + "/";
    const { state, dispatch } = useContext(ContextWeb3);
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        isoCountry: "",
        reputation: 0,
        image: "",
        address: "",
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (state.address && profile.address === "") {
            setProfile({
                ...profile,
                address: utils.getAddress(`${state.address}`),
            });
        }
    }, [profile, state]);

    useEffect(() => {
        setProfile({
            ...profile,
            user,
        });
    }, [user]);

    const handleImage = async (e) => {
        e.preventDefault();
        try {
            const client = new Pinata();

            const rootCid = await client.put(e.target.files);
            const res = await client.get(rootCid);
            const files = await res.files();
            setProfile({
                ...profile,
                image: ["https://" + files[0].cid + ".ipfs.w3s.link"],
            });
            for (const file of files) {
                console.log(`${file.cid} ${file.name} ${file.size}`);
            }
        } catch (ex) {
            debugger;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = toast.loading("User register will start soon. Cost 1 BNV", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        try {
            if (window.ethereum) {
                debugger;
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                const signer = provider.getSigner(state.address);
                const receipt = await registerUser(signer, profile);
                if (receipt && receipt.status === 1) {
                    dispatch({
                        type: "SET_USER",
                        user,
                    });

                    toast.update(id, {
                        render: `Completed`,
                        type: "success",
                        isLoading: false,
                    });
                }
            }
        } catch (error) {
            toast.update(id, {
                render: "Algo salió mal",
                type: "error",
                isLoading: false,
            });
        }
    };

    return (
        <div className="ltn__myaccount-tab-content-inner">
            <div className="ltn__form-box">
                <h6>
                    <FormattedMessage id="myaccount-profile-edit" />
                </h6>
                <form action="#" onSubmit={handleSubmit}>
                    <div className="row mb-50">
                        <div className="author-img">
                            <img
                                src={
                                    !profile.image || profile.image === ""
                                        ? `https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg`
                                        : profile.image
                                }
                                alt="Author"
                                style={{
                                    height: "200px",
                                    width: "200px",
                                    borderRadius: "50%",
                                    marginRight: "20px",
                                }}
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
                            <label>
                                <FormattedMessage id="myaccount-profile-name" />
                                :
                            </label>
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
                            <label>
                                <FormattedMessage id="myaccount-profile-lastname" />
                                :
                            </label>
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
                            <label>
                                <FormattedMessage id="myaccount-profile-country" />
                                :
                            </label>
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
                            <FormattedMessage id="myaccount-profile-save-changes" />
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
                </form>
            </div>
        </div>
    );
};

export default Profile;
