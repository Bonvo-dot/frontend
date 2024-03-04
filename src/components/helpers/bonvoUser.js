import { checkAllowance } from "./bonvoProperties";
import { getMetadataJSON, uploadJson } from "./common";
import {
    getBonvoPlatformContract,
    getUserReputationContract,
} from "./contracts";

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
    const bonvoPlatformContract = getBonvoPlatformContract();
    const isUser = await bonvoPlatformContract.getIsUser(address);
    return isUser;
}

export async function registerUser(signer, userData) {
    const bonvoPlatformContract = getBonvoPlatformContract(signer);

    const hasAllowance = await checkAllowance(signer);

    const metadataURI = await uploadJson(userData);
    const tx = await bonvoPlatformContract.registerUser(
        metadataURI,
        signer._address,
        {
            gasLimit: 500000,
        }
    );
    const receipt = await tx.wait();

    if (receipt && receipt.status === 1) {
        return true;
    } else {
        console.log("Error addProperty");
        return false;
    }
}
