import { Wallet } from "ethers";

function getWallet() {
    const privateKey = process.env.REACT_APP_PRIVATE_KEY;
    return new Wallet(privateKey);
}

export const wallet = getWallet();

export const NFT_STORAGE_KEY = process.env.REACT_IPFS_NFTSTORAGE_APIKEY;
