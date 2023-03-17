import { checkAllowance } from "./bonvoProperties";
import { getMetadataJSON, uploadJson } from "./common";
import { getBonvoEscrowContract, getUserReputationContract } from "./contracts";

export async function getUserByAddress(address) {
    const _isUser = await isRegisteredUser(address);
    if (!_isUser) return undefined;

    const userReputationContract = getUserReputationContract();
    const tokenId = await userReputationContract.getTokenIdForAddress(address);
    let user = {
        address,
        image: "",
        firstName: "",
        lastName: "",
        isoCountry: "",
        reputation: "",
    };

    if (tokenId) {
        const metadataURI = await userReputationContract.tokenURI(tokenId);
        if (metadataURI) {
            const userData = await getMetadataJSON(metadataURI);
            return { ...user, ...userData };
        }
    }

    return user;
}

export async function isRegisteredUser(address) {
    const bonvoEscrowContract = getBonvoEscrowContract();
    const isUser = await bonvoEscrowContract.getIsUser(address);
    return isUser;
}

export async function registerUser(signer, userData) {
    const bonvoEscrowContract = getBonvoEscrowContract(signer);

    const hasAllowance = await checkAllowance(signer);

    const metadataURI = await uploadJson(userData);
    const tx = await bonvoEscrowContract.registerUser(metadataURI, {
        gasLimit: 500000,
    });
    const receipt = await tx.wait();

    if (receipt && receipt.status === 1) {
        return true;
    } else {
        console.log("Error registerUser");
        return false;
    }
}

export async function editUser(signer, userData) {
    const bonvoEscrowContract = getBonvoEscrowContract(signer);

    const hasAllowance = await checkAllowance(signer);

    const metadataURI = await uploadJson(userData);
    const tx = await bonvoEscrowContract.editUser(metadataURI, {
        // not implemented yet
        gasLimit: 500000,
    });
    const receipt = await tx.wait();

    if (receipt && receipt.status === 1) {
        return true;
    } else {
        console.log("Error editUser");
        return false;
    }
}
