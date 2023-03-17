import Navbar from "./global-components/navbar";
import PageHeader from "./global-components/page-header";
import ProductSlider from "./shop-components/product-slider-v1";
import ShopDetails from "./shop-components/shop-details";
import Footer from "./global-components/footer";
import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ContextWeb3 from "../moonbeam/ContextWeb3";
import { ethers, utils, BigNumber } from "ethers";
import {
    bookProperty,
    checkAllowance,
    confirmRentalAsLandlord,
    confirmRentalAsTenant,
    getBookings,
    getPropertyInfo,
} from "./helpers/bonvoProperties";

const Product_Details = () => {
    const location = useLocation();
    const productDetailId = Number(location.pathname.split("/")[2]);
    const { state } = useContext(ContextWeb3);

    const [bookedProperties, setBookedProperties] = useState([]);
    const [owner, setOwner] = useState(false);
    const [asset, setAsset] = useState({
        timestamp: "",
        tokenId: "",
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

    /* Fecth Asset by id */
    useEffect(() => {
        const fetchAsset = async () => {
            if (state.address && asset.staticData.title === "") {
                try {
                    const { ethereum } = window;
                    if (ethereum) {
                        const propertyInfo = await getPropertyInfo(
                            productDetailId
                        );
                        if (propertyInfo) {
                            setAsset(propertyInfo);
                        }
                        const bookings = await getBookings(state.address);
                        if (bookings) {
                            setBookedProperties(bookings);
                        }
                    }
                } catch (error) {
                    console.log("error", error);
                }
            }
        };
        fetchAsset();
        if (
            state.address &&
            asset.owner !== "" &&
            utils.getAddress(state.address) === utils.getAddress(asset.owner)
        ) {
            setOwner(true);
        }
    }, [state, productDetailId, asset]);

    return (
        <div>
            <Navbar />
            <PageHeader id_page="property-details" customclass="mb-0" />
            <ProductSlider asset={asset} />
            <ShopDetails
                asset={asset}
                bookedProperties={bookedProperties}
                owner={owner}
            />
            <Footer />
        </div>
    );
};

export default Product_Details;
