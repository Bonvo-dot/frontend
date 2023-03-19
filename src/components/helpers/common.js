import axios from "axios";
import { ethers } from "ethers";
import { Web3Storage } from "web3.storage";

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
    const client = new Web3Storage({
        token: process.env.REACT_APP_WEB3STORAGE_APIKEY,
    });
    const jsn = JSON.stringify(object);
    const blob = new Blob([jsn], { type: "application/json" });
    const _file = new File([blob], "file.json");
    const rootCid = await client.put([_file]);
    const resp = await client.get(rootCid);
    const files = await resp.files();
    return `https://${files[0].cid}.ipfs.w3s.link`;
}

export function getSigner(address) {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(address);
        return signer;
    }
}