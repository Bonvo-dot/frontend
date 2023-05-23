import { ethers } from "ethers";
import {
    bonvoPropertyContractAddress,
    bonvoEscrowContractAddress,
    bonvoTokenContractAddress,
    userReputationContractAddress,
    bonvoExperienceDeployerContractAddress,
    bonvoExperienceDeployerHelperContractAddress,
    bonvoExperienceContractAddress,
} from "../../utils/constants";
import bonvoUserReputationABI from "../../abi/bonvoUserReputationABI.json";
import bonvoEscrowContractABI from "../../abi/bonvoEscrowContractABI.json";
import bonvoTokenContractABI from "../../abi/bonvoTokenContractABI.json";
import bonvoPropertyContractABI from "../../abi/bonvoPropertyContractABI.json";
import bonvoExperienceDeployerContractABI from "../../abi/bonvoExperienceDeployerContractABI.json";
import bonvoExperienceDeployerHelperContractABI from "../../abi/bonvoExperienceDeployerHelperContractABI.json";
import bonvoExperienceContractABI from "../../abi/bonvoExperienceContractABI.json";

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

export function getBonvoExperienceDeployerContract(signer) {
    if (signer) {
        const bonvoExperienceDeployerContract = new ethers.Contract(
            bonvoExperienceDeployerContractAddress,
            bonvoExperienceDeployerContractABI,
            signer
        );
        return bonvoExperienceDeployerContract;
    } else {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const bonvoExperienceDeployerContract = new ethers.Contract(
            bonvoExperienceDeployerContractAddress,
            bonvoExperienceDeployerContractABI,
            provider
        );
        return bonvoExperienceDeployerContract;
    }
}

export function getBonvoExperienceDeployerHelperContract(signer) {
    if (signer) {
        const bonvoExperienceDeployerHelperContract = new ethers.Contract(
            bonvoExperienceDeployerHelperContractAddress,
            bonvoExperienceDeployerHelperContractABI,
            signer
        );
        return bonvoExperienceDeployerHelperContract;
    } else {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const bonvoExperienceDeployerHelperContract = new ethers.Contract(
            bonvoExperienceDeployerHelperContractAddress,
            bonvoExperienceDeployerHelperContractABI,
            provider
        );
        return bonvoExperienceDeployerHelperContract;
    }
}

export function getBonvoExperienceContract(signer) {
    if (signer) {
        const bonvoExperienceContract = new ethers.Contract(
            bonvoExperienceContractAddress,
            bonvoExperienceContractABI,
            signer
        );
        return bonvoExperienceContract;
    } else {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const bonvoExperienceContract = new ethers.Contract(
            bonvoExperienceContractAddress,
            bonvoExperienceContractABI,
            provider
        );
        return bonvoExperienceContract;
    }
}
