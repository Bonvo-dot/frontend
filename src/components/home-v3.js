import React from "react";
import Navbar from "./global-components/navbar-v3";
import Banner from "./section-components/banner-v3";
import SearchForm from "./section-components/search-form";
import ProductListing from "./section-components/product-listing";
import Footer from "./global-components/footer";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Home_V3 = () => {
    return (
        <div>
            <Link to="/experiences"> experiences</Link>
            <Link to="/rentals"> Rentals</Link>
        </div>
    );
};

export default Home_V3;
