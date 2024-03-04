import axios, * as others from "axios";
const formData = require("form-data");
const pinataSDK = require("@pinata/sdk");
const fs = require("fs");
let fileReader = new FileReader();

// const JWT = `${}`;

export default class Pinata {
    constructor(apiKey) {
        this.pinata = new pinataSDK({
            pinataJWTKey: apiKey,
        });
    }

    async getByteArray(file) {
        return new Promise(function (resolve, reject) {
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = function (ev) {
                const array = new Uint8Array(ev.target.result);
                const fileByteArray = [];
                for (let i = 0; i < array.length; i++) {
                    fileByteArray.push(array[i]);
                }
                resolve(array); // successful
            };
            fileReader.onerror = reject; // call reject if error
        });
    }

    async put(values, JWT, contentType) {
        let file = values[0];
        if (!file) {
            return;
        }

        try {
            const data = new formData();

            data.append("file", file);
            const metadata = JSON.stringify({
                name: file.name ? file.name : "File uploaded from the web",
            });
            data.append("pinataMetadata", metadata);

            if (!contentType) {
                contentType = "multipart/form-data";
            }

            const res = await axios.post(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data,
                {
                    maxBodyLength: Infinity,
                    headers: {
                        "Content-Type": ``,
                        Authorization: "Bearer " + JWT,
                    },
                }
            );
            const resObject = res.data;
            const hash = resObject.IpfsHash;
            console.log(hash);
            return hash;

            // const pinataSDK = require("@pinata/sdk");
            // const res2 = await this.pinata.testAuthentication();
            // console.log(res2);

            // //call pinata to pin the file
            // // const result = await this.pinata.pinFileToIPFS(file);
            // // console.log(result); //"AxiosError: Network Error\n    at XMLHttpRequest.handleError (http://localhost:3000/static/js/bundle.js:142710:14)"

            // // const fs = require("fs");
            // // const readableStreamForFile = fs.createReadStream("./yourfile.png");
            // const options = {
            //     pinataMetadata: {
            //         name: file.name,
            //         keyvalues: {
            //             customKey: "customValue",
            //             customKey2: "customValue2",
            //         },
            //     },
            //     pinataOptions: {
            //         cidVersion: 0,
            //     },
            // };

            // this.getByteArray(file).then(async (byteArray) => {
            //     function buildStream(data) {
            //         //depending on what data is and how it will be used, you may need to convert it
            //         //data = Uint8Array.from(data);

            //         return new ReadableStream({
            //             start(controller) {
            //                 // Add the data to the stream
            //                 controller.enqueue(data);
            //             },
            //             pull(controller) {
            //                 // nothing left to pull, so close
            //                 controller.close();
            //             },
            //             cancel() {
            //                 //nothing to do
            //             },
            //         });
            //     }

            //     const res = await this.pinata.pinFileToIPFS(
            //         buildStream(byteArray),
            //         options
            //     );
            //     console.log(res);
            //     console.log(byteArray);
            // });
        } catch (error) {
            console.log(error);
        }
    }

    async get(cid) {
        const res = await axios.get(
            `https://jade-improved-cobra-207.mypinata.cloud/ipfs/${cid}`
        );
        return res;
    }
}
