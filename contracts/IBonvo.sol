// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IBonvo {
    struct Asset {
        address assetId;
        string title;
        address owner;
        uint256 price;
        string description;
        string[] images;
        int256 latitude;
        int256 longitude;
        uint256 rooms;
        uint256 size;
        uint8 assetCategory;
        string location;
        uint256 idCategory;
    }

    struct AssetCategory {
        uint256 idCategory;
        string name;
        string description;
    }

    struct User {
        address idUser;
        string firstName;
        string lastName;
        string isoCountry;
        int256 reputation;
        string image;
    }
    struct Rent {
        uint256 idRent;
        address assetId;
        address renter;
    }

    struct Rate {
        uint256 idRate;
        uint8 rate;
        string argue;
        address rater;
        address asset;
    }
}
