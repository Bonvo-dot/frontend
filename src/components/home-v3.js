import React from "react";
import Navbar from "./global-components/navbar-v3";
import Banner from "./section-components/banner-v3";
import SearchForm from "./section-components/search-form";
import ProductListing from "./section-components/product-listing";
import CallToActionV1 from "./section-components/call-to-action-v1";
import Footer from "./global-components/footer";

const Home_V3 = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <SearchForm />
      <ProductListing />
      <CallToActionV1 />
      <Footer />
    </div>
  );
};

export default Home_V3;
