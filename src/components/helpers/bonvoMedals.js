import { getUserReputationContract } from "./contracts";

export async function getMedalsByAddress(address) {
    let medals = {
        cleanMedalCount: 0,
        comfyBedMedalCount: 0,
        friendlyMedalCount: 0,
        goodLocationMedalCount: 0,
        punctualMedalCount: 0,
    };
    const userReputationContract = getUserReputationContract();
    const tokenId = await userReputationContract.getTokenIdForAddress(address);

    if (tokenId) {
        const _medals = await userReputationContract.getMedals(tokenId);
        medals = {
            cleanMedalCount: _medals.cleanMedalCount.toNumber(),
            comfyBedMedalCount: _medals.comfyBedMedalCount.toNumber(),
            friendlyMedalCount: _medals.friendlyMedalCount.toNumber(),
            goodLocationMedalCount: _medals.goodLocationMedalCount.toNumber(),
            punctualMedalCount: _medals.punctualMedalCount.toNumber(),
        };
    }

    return medals;
}
