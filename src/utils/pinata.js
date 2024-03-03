import axios, * as others from "axios";
const formData = require("form-data");
const pinataSDK = require("@pinata/sdk");
const fs = require("fs");

const JWT = `Bearer ${process.env.REACT_IPFS_PINATA_APIKEY}`;

export default class Pinata {
    constructor(apiKey) {
        this.apiKey = "123";
    }

    async put(values) {
        let file = values[0];
        if (!file) {
            return;
        }

        try {
            // const data = new formData();

            // data.append("file", file);
            // const metadata = JSON.stringify({
            //     name: values.name ? values.name : "File uploaded from the web",
            // });
            // data.append("pinataMetadata", metadata);

            // const res = await axios.post(
            //     "https://jade-improved-cobra-207.mypinata.cloud/pinning/pinFileToIPFS",
            //     data,
            //     {
            //         maxBodyLength: Infinity,
            //         headers: {
            //             "Content-Type": `multipart/form-data;`,
            //             Authorization: JWT,
            //         },
            //     }
            // );
            // const resObject = res.data;
            // const hash = resObject.IpfsHash;
            // console.log(hash);

            const pinataSDK = require("@pinata/sdk");
            const pinata = new pinataSDK({ pinataJWTKey: "yourPinataJWTKey" });
            const res = await pinata.testAuthentication();
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    async get(cid) {
        const res = await axios.get(
            `https://gateway.pinata.cloud/ipfs/${cid}`,
            {
                headers: {
                    Authorization: JWT,
                },
            }
        );
        return res;
    }
}
