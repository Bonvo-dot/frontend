import { ethers } from "ethers";
import { userReputationContractAddress } from "../../utils/constants";
import bonvoUserReputationABI from "../../abi/bonvoUserReputationABI.json";

export function getUserReputationContract(signer) {
    if (signer) {
        const bonvoPropertyContract = new ethers.Contract(userReputationContractAddress, bonvoUserReputationABI, signer);
        return bonvoPropertyContract;
    } else {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const bonvoPropertyContract = new ethers.Contract(userReputationContractAddress, bonvoUserReputationABI, provider);
        return bonvoPropertyContract;
    }
}