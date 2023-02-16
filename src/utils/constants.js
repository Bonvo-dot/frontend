import { ethers } from "ethers";

// TODO: Refactor to .env
export const bonvoPropertyContractAddress = ethers.utils.getAddress(
    "0xc7f53138f801d82c62e0cd8008fe41cd1d3131cf"
);
export const bonvoEscrowContractAddress = ethers.utils.getAddress(
    "0xa894BfCbA98d35940E2D181C88Fc52E1555070c3"
);
export const bonvoContractAddress = ethers.utils.getAddress(
    "0x7b9b40908ce6b559227b7fc9752b2b2ca5abe48b"
);