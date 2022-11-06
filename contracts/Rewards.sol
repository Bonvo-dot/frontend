// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Rewards is AccessControl {
    uint256 public CREATE_ASSET_REWARD = 2_000_000_000_000_000_000;
    uint256 public RATE_REWARD = 2_000_000_000_000_000_000;
    uint256 public RENT_REWARD = 2_000_000_000_000_000_000;

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function setCreateAssetReward(uint256 reward)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        CREATE_ASSET_REWARD = reward;
    }

    function setRateReward(uint256 reward) public onlyRole(DEFAULT_ADMIN_ROLE) {
        RATE_REWARD = reward;
    }

    function setRentReward(uint256 reward) public onlyRole(DEFAULT_ADMIN_ROLE) {
        RENT_REWARD = reward;
    }
}
