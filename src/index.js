import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import HomeV3 from "./components/home-v3";
import ContextProviderWeb3 from "./moonbeam/ContextProviderWeb3";
import About from "./components/about";
import Shop from "./components/shop";
import ProdductDetails from "./components/product-details";
import Contact from "./components/contact";
import MyAccount from "./components/my-account";
import AddListing from "./components/add-listing";
import { I18nPropvider, LOCALES } from "./i18n/";

function Root() {
  const [locale, setLocale] = useState(LOCALES.ENGLISH);

  return (
    <I18nPropvider locale={locale}>
      <button onClick={() => setLocale(LOCALES.ENGLISH)}>English</button>
      <button onClick={() => setLocale(LOCALES.SPANISH)}>Español</button>
      <ContextProviderWeb3>
        <HashRouter basename="/">
          <div>
            <Switch>
              <Route exact path="/" component={HomeV3} />

              <Route path="/about" component={About} />
              <Route path="/shop" component={Shop} />
              <Route path="/contact" component={Contact} />
              <Route path="/my-account" component={MyAccount} />
              <Route path="/add-listing" component={AddListing} />
              <Route path="/product-details" component={ProdductDetails} />
            </Switch>
          </div>
        </HashRouter>
      </ContextProviderWeb3>
    </I18nPropvider>
  );
}

export default Root;

ReactDOM.render(<Root />, document.getElementById("bonvo"));
