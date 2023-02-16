import { ethers } from "ethers";
import { bonvoPropertyContractAddress, bonvoEscrowContractAddress } from "../../utils/constants";
import escrowContractABI from "../../abi/bonvoEscrowContractABI.json";
import bonvoPropertyContractABI from "../../abi/bonvoPropertyContractABI.json";
import axios from "axios";

export async function getAllListings() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const escrowContract = new ethers.Contract(bonvoEscrowContractAddress, escrowContractABI, provider);
    let listedProperties = await escrowContract.getAllListings();
    let propertyAssets = [];
    if (listedProperties && listedProperties.length) {
        listedProperties = listedProperties.filter(listedProperty => listedProperty.propertyId.toNumber() > 4);
        propertyAssets = Promise.all(
            listedProperties.map(async (listedProperty) => {
                const propertyId = listedProperty.propertyId.toNumber();
                const metadataJSON = await getMetadataJSON(listedProperty.propertyMetadataUri);

                const propAsset = {
                    tokenId: propertyId,
                    price: ethers.utils.formatEther(listedProperty.pricePerDay),
                    ...fillPropertyAssetFromJsonMetadata(metadataJSON),
                };
                return propAsset;
            })
        );
    }

    return propertyAssets;
}

export function fillPropertyAssetFromJsonMetadata(metadataJSON) {
    return {
        timestamp: new Date(
            metadataJSON.timestamp
        ).toLocaleDateString(),
        idCategory: metadataJSON.idCategory,
        ISOCountry: metadataJSON.ISOCountry,
        owner: metadataJSON.owner,
        images: metadataJSON.images,
        staticData: {
            title: metadataJSON.staticData.title,
            description: metadataJSON.staticData.description,
            rooms: metadataJSON.staticData.rooms,
            location: metadataJSON.staticData.location,
            size: metadataJSON.staticData.size,
        }
    }
}

export async function getPropertyInfo(propertyId) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const bonvoPropertyContract = new ethers.Contract(bonvoPropertyContractAddress, bonvoPropertyContractABI, provider);

    const propertyInfo = await bonvoPropertyContract.getAllInfo(propertyId);
    const metadataJSON = await getMetadataJSON(propertyInfo.metadataURI);
    return { ...propertyInfo, ...metadataJSON };
}

export async function getMetadataJSON(propertyMetadataUri) {
    const metadataResponse = await axios.get(propertyMetadataUri, {
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/pdf'
        }
    });
    const metadataBlob = metadataResponse.data;
    const metadataJSON = JSON.parse(await metadataBlob.text());
    return metadataJSON;
}