import React, { useContext } from "react";
import { LanguageContext } from "../../../src/index";
import { LOCALES } from "../../i18n/constants";

const Social = () => {
    const { locale, setLocale } = useContext(LanguageContext);

    return (
        <div className="ltn__social-media">
            <ul>
                <li>
                    <button
                        className="btn btn-small btn-effect-2 white-color"
                        onClick={() => setLocale(LOCALES.ENGLISH)}
                    >
                        En
                    </button>
                </li>
                <li>
                    <button
                        className="btn btn-small btn-effect-2 white-color"
                        onClick={() => setLocale(LOCALES.SPANISH)}
                    >
                        Es
                    </button>
                </li>
                <li>
                    <a href="https://www.facebook.com/BonvoMx" title="Facebook">
                        <i className="fab fa-facebook-f" />
                    </a>
                </li>
                <li>
                    <a href="https://twitter.com/BonvoOficial" title="Twitter">
                        <i className="fab fa-twitter" />
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.instagram.com/bonvo_oficial/"
                        title="Instagram"
                    >
                        <i className="fab fa-instagram" />
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Social;
