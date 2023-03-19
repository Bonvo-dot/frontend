import { ethers } from "ethers";
import {
    bonvoPropertyContractAddress,
    bonvoEscrowContractAddress,
    bonvoTokenContractAddress,
    userReputationContractAddress,
} from "../../utils/constants";
import bonvoUserReputationABI from "../../abi/bonvoUserReputationABI.json";
import bonvoEscrowContractABI from "../../abi/bonvoEscrowContractABI.json";
import bonvoTokenContractABI from "../../abi/bonvoTokenContractABI.json";
import bonvoPropertyContractABI from "../../abi/bonvoPropertyContractABI.json";

export function getUserReputationContract(signer) {
    if (signer) {
        const bonvoPropertyContract = new ethers.Contract(
            userReputationContractAddress,
            bonvoUserReputationABI,
            signer
        );
        return bonvoPropertyContract;
    } else {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const bonvoPropertyContract = new ethers.Contract(
            userReputationContractAddress,
            bonvoUserReputationABI,
            provider
        );
        return bonvoPropertyContract;
    }
}

export function getBonvoEscrowContract(signer) {
    if (signer) {
        const bonvoEscrowContract = new ethers.Contract(
            bonvoEscrowContractAddress,
            bonvoEscrowContractABI,
            signer
        );
        return bonvoEscrowContract;
    } else {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const bonvoEscrowContract = new ethers.Contract(
            bonvoEscrowContractAddress,
            bonvoEscrowContractABI,
            provider
        );
        return bonvoEscrowContract;
    }
}

export function getBonvoTokenContract(signer) {
    if (signer) {
        const bonvoTokenContract = new ethers.Contract(
            bonvoTokenContractAddress,
            bonvoTokenContractABI,
            signer
        );
        return bonvoTokenContract;
    } else {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const bonvoTokenContract = new ethers.Contract(
            bonvoTokenContractAddress,
            bonvoTokenContractABI,
            provider
        );
        return bonvoTokenContract;
    }
}

export function getBonvoPropertyContract(signer) {
    if (signer) {
        const bonvoPropertyContract = new ethers.Contract(
            bonvoPropertyContractAddress,
            bonvoPropertyContractABI,
            signer
        );
        return bonvoPropertyContract;
    } else {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const bonvoPropertyContract = new ethers.Contract(
            bonvoPropertyContractAddress,
            bonvoPropertyContractABI,
            provider
        );
        return bonvoPropertyContract;
    }
}
