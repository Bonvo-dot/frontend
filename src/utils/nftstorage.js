const { NFTStorage, Blob } = require("nft.storage");
// const { NFT_STORAGE_KEY } = require("../config/constants");

const client = new NFTStorage({
    token: process.env.REACT_APP_IPFS_NFTSTORAGE_APIKEY,
});

// Store a file/*  */

export default class nftstorage {
    constructor(apiKey) {
        this.apiKey = "123";
    }

    async put() {
        const content = new Blob(["hello world"]);
        const cid = await client.storeBlob(content);

        console.log(`stored at ${cid}`);
    }

    // get a file
    async get(cid) {
        const content = await client.check(cid);
        console.log(await content.text());
    }
}
