import React from "react";
import { badges } from "../../utils/constants";

const Medals = (props) => {
    const medals = props.medals;

    return (
        <div className="row">
            {
                medals.friendlyMedalCount > 0 &&
                <>
                    {medals.friendlyMedalCount}x
                    <img
                        className="full-width max-width-200"
                        alt="nft-1"
                        src={badges.friendly}
                    />
                </>
            }
            {
                medals.comfyBedMedalCount > 0 &&
                <>
                    {medals.comfyBedMedalCount}x
                    <img
                        className="full-width max-width-200"
                        alt="nft-1"
                        src={badges.comfy_bed}
                    />
                </>
            }
            {
                medals.punctualMedalCount > 0 &&
                <>
                    {medals.punctualMedalCount}x
                    <img
                        className="full-width max-width-200"
                        alt="nft-1"
                        src={badges.punctual}
                    />
                </>
            }
            {
                medals.cleanMedalCount > 0 &&
                <>
                    {medals.cleanMedalCount}x
                    <img
                        className="full-width max-width-200"
                        alt="nft-1"
                        src={badges.clean}
                    />
                </>
            }
            {
                medals.goodLocationMedalCount > 0 &&
                <>
                    {medals.goodLocationMedalCount}x
                    <img
                        className="full-width max-width-200"
                        alt="nft-1"
                        src={badges.good_location}
                    />
                </>
            }
        </div>
    );
};

export default Medals;
