import { ethers } from "ethers";
import { bonvoPropertyContractAddress, bonvoEscrowContractAddress, bonvoContractAddress } from "../../utils/constants";
import escrowContractABI from "../../abi/bonvoEscrowContractABI.json";
import bonvoPropertyContractABI from "../../abi/bonvoPropertyContractABI.json";
import erc20ABI from "../../abi/erc20ABI.json";
import axios from "axios";

const provider = new ethers.providers.Web3Provider(window.ethereum);

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

export async function listProperty(propertyId, pricePerDay, deposit, signer) {
    const bonvoEscrowContract = new ethers.Contract(bonvoEscrowContractAddress, escrowContractABI, signer);
    try {
        const tx = await bonvoEscrowContract.listProperty(propertyId, pricePerDay, deposit, {
            gasPrice: ethers.utils.parseUnits('20', 'gwei'),
            gasLimit: 200000,
        });
        const receipt = await tx.wait();
        if (receipt && receipt.status === 1) {
            return true;
        }
    } catch (err) {
        console.log(err.message);
    }
    return false;
}

export async function checkAllowance(signer) {
    const bonvoTokenContract = new ethers.Contract(bonvoContractAddress, erc20ABI, signer);
    const allowance = await bonvoTokenContract.allowance(signer._address, bonvoEscrowContractAddress);
    const minAllowance = ethers.utils.parseUnits('5000', '18');
    if (allowance.lt(minAllowance)) {
        const transaction = await bonvoTokenContract.approve(bonvoEscrowContractAddress, ethers.constants.MaxUint256);
        const receipt = await transaction.wait();
        if (!receipt || receipt.status !== 1) {
            throw new Error('Approve failed');
        }
    }
    return true;
}

export async function bookProperty(signer, propertyId, dates) {
    const bonvoEscrowContract = new ethers.Contract(bonvoEscrowContractAddress, escrowContractABI, signer);
    debugger;
    const tx = await bonvoEscrowContract.book(propertyId, dates);
    const receipt = await tx.wait();
    if (receipt && receipt.status === 1) {
        const bookingId = await bonvoEscrowContract.getTotalBookings();
        return { bookingId, receipt };
    }
    return { bookingId: -1 };
}
