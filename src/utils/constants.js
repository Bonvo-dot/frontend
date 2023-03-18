import { ethers } from "ethers";

// TODO: Refactor to .env
export const bonvoEscrowContractAddress = ethers.utils.getAddress(process.env.REACT_APP_BONVOESCROWCONTRACT);
export const bonvoPropertyContractAddress = ethers.utils.getAddress(process.env.REACT_APP_BONVOPROPERTYCONTRACT);
export const userReputationContractAddress = ethers.utils.getAddress(process.env.REACT_APP_USERREPUTATIONCONTRACT);
export const badgeContractAddress = ethers.utils.getAddress(process.env.REACT_APP_BADGECONTRACT);
export const bonvoTokenContractAddress = ethers.utils.getAddress(process.env.REACT_APP_BONVOTOKENCONTRACT);

export const badges = {
    friendly: 'https://bafybeigap2cl3ykfkvbxcsjtvpjnxpm7nodw4j25df2bvmmpvqlyxjjj54.ipfs.w3s.link/friendly.png',
    comfy_bed: 'https://bafybeidizosqnolfaxbpnxwpue2tr7wfbvilxgyuzdill4uf4f77jfjbwm.ipfs.w3s.link/comfy-bed.png',
    punctual: 'https://bafybeibf6uneur2mk4vnyv7pkcfympjuxbzqa2f5vmxqzn6ykyfflbeg3a.ipfs.w3s.link/punctual.png',
    clean: 'https://bafybeidffeibg3ck55mmd6ezkkpg5urwtdg7zam7kovrc7rp5vjs7o2yam.ipfs.w3s.link/clean.png',
    good_location: 'https://bafybeiebmmzdogdh5hswugv676g7wer5vo6yxvvtlf4gducmwuwbsezuny.ipfs.w3s.link/good-location.png'
}