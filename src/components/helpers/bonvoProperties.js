import { ethers } from "ethers";
import { Web3Storage } from "web3.storage";
import { toast } from "react-toastify";
import { getMetadataJSON } from "./common";
import MessageToast from "../../moonbeam/MessageToast";
import {
    getBonvoEscrowContract,
    getBonvoPropertyContract,
    getBonvoTokenContract,
} from "./contracts";
import { bonvoEscrowContractAddress } from "../../utils/constants";
import { getUserByAddress } from "../helpers/bonvoUser";

export async function getAllListings() {
    const bonvoEscrowContract = getBonvoEscrowContract();
    let listedProperties = await bonvoEscrowContract.getAllListings();
    let propertyAssets = [];
    if (listedProperties && listedProperties.length) {
        propertyAssets = Promise.all(
            listedProperties.map(async (listedProperty) => {
                const propertyId = listedProperty.propertyId.toNumber();
                const propertyInfo = await getPropertyInfo(propertyId);
                delete propertyInfo.tokenId; // Remove tokenId from propertyInfo it comes as 0, and it is generating a bug

                const ownerData = await getUserByAddress(
                    listedProperty.landlord
                );

                const propAsset = {
                    tokenId: propertyId,
                    price: ethers.utils.formatEther(listedProperty.pricePerDay),
                    ownerData: ownerData,
                    ...propertyInfo,
                };
                return propAsset;
            })
        );
    }

    return propertyAssets;
}

export function fillPropertyAssetFromJsonMetadata(metadataJSON) {
    return {
        timestamp: new Date(metadataJSON.timestamp).toLocaleDateString(),
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
        },
    };
}

export async function getPropertyInfo(propertyId) {
    const bonvoPropertyContract = getBonvoPropertyContract();

    const propertyInfo = await bonvoPropertyContract.getAllInfo(propertyId);
    const _propertyInfo = {
        ...propertyInfo,
        cleanMedalCount: propertyInfo.cleanMedalCount.toNumber(),
        comfyBedMedalCount: propertyInfo.comfyBedMedalCount.toNumber(),
        friendlyMedalCount: propertyInfo.friendlyMedalCount.toNumber(),
        goodLocationMedalCount: propertyInfo.goodLocationMedalCount.toNumber(),
        punctualMedalCount: propertyInfo.punctualMedalCount.toNumber(),
    };
    const metadataJSON = await getMetadataJSON(propertyInfo.metadataURI);
    return { ..._propertyInfo, ...metadataJSON };
}

export async function listProperty(propertyId, pricePerDay, deposit, signer) {
    const bonvoEscrowContract = getBonvoEscrowContract(signer);
    try {
        const tx = await bonvoEscrowContract.listProperty(
            propertyId,
            pricePerDay,
            deposit,
            {
                gasPrice: ethers.utils.parseUnits("20", "gwei"),
                gasLimit: 200000,
            }
        );
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
    const bonvoTokenContract = getBonvoTokenContract(signer);
    const allowance = await bonvoTokenContract.allowance(
        signer._address,
        bonvoEscrowContractAddress
    );
    const minAllowance = ethers.utils.parseUnits("5000", "18");
    if (allowance.lt(minAllowance)) {
        const transaction = await bonvoTokenContract.approve(
            bonvoEscrowContractAddress,
            ethers.constants.MaxUint256
        );
        const receipt = await transaction.wait();
        if (!receipt || receipt.status !== 1) {
            throw new Error("Approve failed");
        }
    }
    return true;
}

export async function bookProperty(signer, propertyId, dates) {
    const bonvoEscrowContract = getBonvoEscrowContract(signer);
    const tx = await bonvoEscrowContract.book(propertyId, dates);
    const receipt = await tx.wait();
    if (receipt && receipt.status === 1) {
        const bookingId = await bonvoEscrowContract.getTotalBookings();
        return { bookingId, receipt };
    }
    return { bookingId: -1 };
}

export async function confirmRentalAsTenant(signer, bookingId) {
    const bonvoEscrowContract = getBonvoEscrowContract(signer);
    const tx = await bonvoEscrowContract.confirmRentalAsTenant(bookingId);
    const receipt = await tx.wait();
    if (receipt && receipt.status === 1) {
        return receipt;
    }
}

export async function confirmRentalAsLandlord(signer, bookingId) {
    const bonvoEscrowContract = getBonvoEscrowContract(signer);
    const tx = await bonvoEscrowContract.confirmRentalAsLandlord(bookingId);
    const receipt = await tx.wait();
    if (receipt && receipt.status === 1) {
        return receipt;
    }
}

export async function giveBadgeToTenant(signer, bookingId, badgeType) {
    const bonvoEscrowContract = getBonvoEscrowContract(signer);
    const tx = await bonvoEscrowContract.giveBadgeToTenant(
        bookingId,
        badgeType
    );
    const receipt = await tx.wait();
    if (receipt && receipt.status === 1) {
        return receipt;
    }
}

export async function giveBadgeToProperty(signer, bookingId, badgeType) {
    const bonvoEscrowContract = getBonvoEscrowContract(signer);
    const tx = await bonvoEscrowContract.giveBadgeToProperty(
        bookingId,
        badgeType
    );
    const receipt = await tx.wait();
    if (receipt && receipt.status === 1) {
        return receipt;
    }
}

export async function giveBadgeToLandlord(signer, bookingId, badgeType) {
    const bonvoEscrowContract = getBonvoEscrowContract(signer);
    const tx = await bonvoEscrowContract.giveBadgeToLandlord(
        bookingId,
        badgeType
    );
    const receipt = await tx.wait();
    if (receipt && receipt.status === 1) {
        return receipt;
    }
}

export async function getAllBookings(address) {
    const tenantBookings = await getBookingsForTenant(address);
    const landlordBookings = await getBookingsForLandlord(address);
    return { tenantBookings, landlordBookings };
}

export async function isBookingFinished(bookingId) {
    const bonvoEscrowContract = getBonvoEscrowContract();
    const isFinished = await bonvoEscrowContract.isBookingFinished(bookingId);
    return isFinished;
}

export async function getBookingsForTenant(address) {
    const bonvoEscrowContract = getBonvoEscrowContract();
    const bookings = await bonvoEscrowContract.getBookingsForTenant(address);
    return bookings;
}

async function getBookingsForLandlord(address) {
    const bonvoEscrowContract = getBonvoEscrowContract();
    const bookings = await bonvoEscrowContract.getBookingsForLandlord(address);
    return bookings;
}

export async function getAllBookingsWithDetails(address) {
    const allBookings = await getAllBookings(address);

    let propertyAssets = [];
    if (allBookings.landlordBookings && allBookings.landlordBookings.length) {
        propertyAssets = propertyAssets.concat(
            await Promise.all(
                allBookings.landlordBookings.map(async (booking) => {
                    const isFinished = await isBookingFinished(booking.bookingId);
                    return { ...await getBookingDetails(booking), type: 'landlord', isFinished };
                })
            )
        );
    }
    
    if (allBookings.tenantBookings && allBookings.tenantBookings.length) {
        propertyAssets = propertyAssets.concat(
            await Promise.all(
                allBookings.tenantBookings.map(async (booking) => {
                    const isFinished = await isBookingFinished(booking.bookingId);
                    return { ...await getBookingDetails(booking), type: 'tenant', isFinished };
                })
            )
        );
    }

    return propertyAssets;
}

async function getBookingDetails(booking) {
    const propertyId = booking.propertyId.toNumber();
    const propertyInfo = await getPropertyInfo(propertyId);
    delete propertyInfo.tokenId; // Remove tokenId from propertyInfo it comes as 0, and it is generating a bug

    const ownerData = await getUserByAddress(booking.landlord);

    const propAsset = {
        ownerData,
        ...booking,
        ...propertyInfo,
    };
    return propAsset;
}

export async function addProperty(signer, sendProperty) {
    const bonvoEscrowContract = getBonvoEscrowContract(signer);

    const client = new Web3Storage({
        token: process.env.REACT_APP_WEB3STORAGE_APIKEY,
    });
    const jsn = JSON.stringify(sendProperty);
    const blob = new Blob([jsn], { type: "application/json" });
    const _file = new File([blob], "file.json");
    const rootCid = await client.put([_file]);
    const resp = await client.get(rootCid);
    const files = await resp.files();

    debugger;
    const transactionRequest =
        await bonvoEscrowContract.populateTransaction.addProperty(
            "https://" + files[0].cid + ".ipfs.w3s.link"
        );
    transactionRequest.gasLimit = 500000;
    const tx = await signer.sendTransaction(transactionRequest);
    toast(<MessageToast txHash={tx.hash} />, {
        autoClose: 5000,
    });
    const receipt = await tx.wait();
    return receipt;
}
