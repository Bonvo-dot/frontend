import { ethers } from "ethers";

// TODO: Refactor to .env
export const bonvoPropertyContractAddress = ethers.utils.getAddress(
    "0xbA6287Eeda33a05c23a70152Cf82083a06565dE0"
);
export const bonvoEscrowContractAddress = ethers.utils.getAddress(
    "0xb08AE1b6e09e314Fd0E5C6c3437653CB67889021"
);
export const bonvoContractAddress = ethers.utils.getAddress(
    "0x7B9B40908ce6B559227B7FC9752B2b2CA5abe48b"
);
export const userReputationContractAddress = ethers.utils.getAddress(
    "0xDcA02b919f81844db12a4EAa4D7D915A7104577B"
);
export const badgeContractAddress = ethers.utils.getAddress(
    "0x561A3dE8A3a81d7a640E84202F8F6D109E9c7Ca1"
);

export const badges = {
    friendly: 'https://bafybeigap2cl3ykfkvbxcsjtvpjnxpm7nodw4j25df2bvmmpvqlyxjjj54.ipfs.w3s.link/friendly.png',
    comfy_bed: 'https://bafybeidizosqnolfaxbpnxwpue2tr7wfbvilxgyuzdill4uf4f77jfjbwm.ipfs.w3s.link/comfy-bed.png',
    punctual: 'https://bafybeibf6uneur2mk4vnyv7pkcfympjuxbzqa2f5vmxqzn6ykyfflbeg3a.ipfs.w3s.link/punctual.png',
    clean: 'https://bafybeidffeibg3ck55mmd6ezkkpg5urwtdg7zam7kovrc7rp5vjs7o2yam.ipfs.w3s.link/clean.png',
    good_location: 'https://bafybeiebmmzdogdh5hswugv676g7wer5vo6yxvvtlf4gducmwuwbsezuny.ipfs.w3s.link/good-location.png'
}