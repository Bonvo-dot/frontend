import axios from "axios";
import { ethers } from "ethers";
import Pinata from "../../utils/pinata";

export async function getMetadataJSON(propertyMetadataUri) {
    const metadataResponse = await axios.get(propertyMetadataUri, {
        responseType: "blob",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/pdf",
        },
    });
    const metadataBlob = metadataResponse.data;
    const metadataJSON = JSON.parse(await metadataBlob.text());
    return metadataJSON;
}

export async function uploadJson(object) {
    const client = new Pinata(process.env.REACT_APP_IPFS_PINATA_APIKEY);
    const jsn = JSON.stringify(object);
    const blob = new Blob([jsn], { type: "application/json" });
    const _file = new File([blob], "file.json");
    const rootCid = await client.put(
        [_file],
        process.env.REACT_APP_IPFS_PINATA_APIKEY,
        "application/json"
    );

    return `https://jade-improved-cobra-207.mypinata.cloud/ipfs/${rootCid}`;
}

export function getSigner(address) {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(address);
        return signer;
    }
}
