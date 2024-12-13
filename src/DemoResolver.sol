// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {IAddrResolver} from "@ensdomains/ens-contracts/contracts/resolvers/profiles/IAddrResolver.sol";
//import {IAddressResolver} from "@ensdomains/ens-contracts/contracts/resolvers/profiles/IAddressResolver.sol";
import {ITextResolver} from "@ensdomains/ens-contracts/contracts/resolvers/profiles/ITextResolver.sol";

import "forge-std/console2.sol";

contract DemoResolver is IERC165, IAddrResolver, ITextResolver {
    address _addr;

    constructor(address a) {
        _addr = a;
    }

    function supportsInterface(bytes4 x) external pure returns (bool) {
        return
            x == type(IERC165).interfaceId ||
            x == type(IAddrResolver).interfaceId ||
            x == type(ITextResolver).interfaceId;
    }

    function addr(bytes32 node) external view returns (address payable) {
        console2.log("addr() called");
        console2.logBytes32(node);
        return payable(_addr);
    }

    function text(
        bytes32 node,
        string memory key
    ) external pure returns (string memory) {
        console2.log("text(%s) called", key);
        console2.logBytes32(node);
        return key; // echo the key
    }
}
