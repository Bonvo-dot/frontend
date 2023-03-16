import { getMetadataJSON } from "./common";
import { getBonvoEscrowContract, getUserReputationContract } from "./contracts";

export async function getUserByAddress(address) {
    const _isUser = await isUser(address);
    if (!_isUser) return undefined;
    
    const userReputationContract = getUserReputationContract();
    const tokenId = await userReputationContract.getTokenIdForAddress(address);
    let user = {
        address
    }

    if (tokenId) {
        const metadataURI = await userReputationContract.tokenURI(tokenId);
        if (metadataURI) {
            return { ...user, ...getMetadataJSON(metadataURI) };
        }
    }

    return user;
}

export async function isUser(address) {
    const bonvoEscrowContract = getBonvoEscrowContract();
    const isUser = await bonvoEscrowContract.getIsUser(address);
    return isUser;
}

export async function registerUser(signer, metadataURI) {
    const bonvoEscrowContract = getBonvoEscrowContract(signer);
    const tx = await bonvoEscrowContract.registerUser(metadataURI, { gasLimit: 500000 });
    const receipt = await tx.wait();

    if (receipt && receipt.status === 1) {
        return true;
    } else {
        console.log('Error addProperty');
        return false;
    }
}