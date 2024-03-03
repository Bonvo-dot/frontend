import { ethers } from "ethers";
import { toast } from "react-toastify";
import { getMetadataJSON } from "./common";
import MessageToast from "../../moonbeam/MessageToast";
import {
    getBonvoPlatformContract,
    getBonvoPropertyContract,
    getBonvoTokenContract,
} from "./contracts";
import { bonvoPlatformContractAddress } from "../../utils/constants";
import { getUserByAddress } from "../helpers/bonvoUser";
import nftstorage from "../../utils/nftstorage";

export async function getAllListings() {
    const bonvoPlatformContract = getBonvoPlatformContract();
    let listedProperties = await bonvoPlatformContract.getAllListings();
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

export async function getRecentListings() {
    const propertyAssets = await getAllListings();

    return propertyAssets.slice(0, 3);
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
    const bonvoPlatformContract = getBonvoPlatformContract(signer);
    try {
        const tx = await bonvoPlatformContract.listProperty(
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
        bonvoPlatformContractAddress
    );
    const minAllowance = ethers.utils.parseUnits("5000", "18");
    if (allowance.lt(minAllowance)) {
        const transaction = await bonvoTokenContract.approve(
            bonvoPlatformContractAddress,
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
    const bonvoPlatformContract = getBonvoPlatformContract(signer);
    const tx = await bonvoPlatformContract.book(propertyId, dates);
    const receipt = await tx.wait();
    if (receipt && receipt.status === 1) {
        const bookingId = await bonvoPlatformContract.getTotalBookings();
        return { bookingId, receipt };
    }
    return { bookingId: -1 };
}

export async function confirmRentalAsTenant(signer, bookingId) {
    const bonvoPlatformContract = getBonvoPlatformContract(signer);
    const tx = await bonvoPlatformContract.confirmRentalAsTenant(bookingId);
    const receipt = await tx.wait();
    if (receipt && receipt.status === 1) {
        return receipt;
    }
}

export async function confirmRentalAsLandlord(signer, bookingId) {
    const bonvoPlatformContract = getBonvoPlatformContract(signer);
    const tx = await bonvoPlatformContract.confirmRentalAsLandlord(bookingId);
    const receipt = await tx.wait();
    if (receipt && receipt.status === 1) {
        return receipt;
    }
}

export async function giveBadgeToTenant(signer, bookingId, badgeType) {
    const bonvoPlatformContract = getBonvoPlatformContract(signer);
    const tx = await bonvoPlatformContract.giveBadgeToTenant(
        bookingId,
        badgeType
    );
    const receipt = await tx.wait();
    if (receipt && receipt.status === 1) {
        return receipt;
    }
}

export async function giveBadgeToProperty(signer, bookingId, badgeType) {
    const bonvoPlatformContract = getBonvoPlatformContract(signer);
    const tx = await bonvoPlatformContract.giveBadgeToProperty(
        bookingId,
        badgeType
    );
    const receipt = await tx.wait();
    if (receipt && receipt.status === 1) {
        return receipt;
    }
}

export async function giveBadgeToLandlord(signer, bookingId, badgeType) {
    const bonvoPlatformContract = getBonvoPlatformContract(signer);
    const tx = await bonvoPlatformContract.giveBadgeToLandlord(
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
    const bonvoPlatformContract = getBonvoPlatformContract();
    const isFinished = await bonvoPlatformContract.isBookingFinished(bookingId);
    return isFinished;
}

export async function getBookingsForTenant(address) {
    const bonvoPlatformContract = getBonvoPlatformContract();
    const bookings = await bonvoPlatformContract.getBookingsForTenant(address);
    return bookings;
}

async function getBookingsForLandlord(address) {
    const bonvoPlatformContract = getBonvoPlatformContract();
    const bookings = await bonvoPlatformContract.getBookingsForLandlord(
        address
    );
    return bookings;
}

export async function getAllBookingsWithDetails(address) {
    const allBookings = await getAllBookings(address);

    let propertyAssets = [];
    if (allBookings.landlordBookings && allBookings.landlordBookings.length) {
        propertyAssets = propertyAssets.concat(
            await Promise.all(
                allBookings.landlordBookings.map(async (booking) => {
                    const isFinished = await isBookingFinished(
                        booking.bookingId
                    );
                    return {
                        ...(await getBookingDetails(booking)),
                        type: "landlord",
                        isFinished,
                    };
                })
            )
        );
    }

    if (allBookings.tenantBookings && allBookings.tenantBookings.length) {
        propertyAssets = propertyAssets.concat(
            await Promise.all(
                allBookings.tenantBookings.map(async (booking) => {
                    const isFinished = await isBookingFinished(
                        booking.bookingId
                    );
                    return {
                        ...(await getBookingDetails(booking)),
                        type: "tenant",
                        isFinished,
                    };
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
    const bonvoPlatformContract = getBonvoPlatformContract(signer);

    const client = new nftstorage();

    const jsn = JSON.stringify(sendProperty);
    const blob = new Blob([jsn], { type: "application/json" });
    const _file = new File([blob], "file.json");
    const rootCid = await client.put([_file]);
    const resp = await client.get(rootCid);
    const files = await resp.files();

    debugger;
    const transactionRequest =
        await bonvoPlatformContract.populateTransaction.addProperty(
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
