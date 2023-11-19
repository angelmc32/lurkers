// // SPDX-License-Identifier: MIT

// pragma solidity ^0.8.18;

// import {HubRestricted} from "lens/HubRestricted.sol";
// import {Types} from "lens/Types.sol";
// import {IPublicationActionModule} from "./interfaces/IPublicationActionModule.sol";
// import {IModuleGlobals} from "./interfaces/IModuleGlobals.sol";

// import {IERC20} from "openzeppelin/contracts/token/ERC20/IERC20.sol";
// import {IERC721} from "openzeppelin/contracts/token/ERC721/IERC721.sol";

// contract MintCollectibleOpenAction is HubRestricted, IPublicationActionModule {
//     mapping(uint256 profileId => mapping(uint256 pubId => address collection))
//         internal _collections;
//     mapping(uint256 profileId => mapping(uint256 pubId => address tipReceiver))
//         internal _tipReceivers;

//     error CurrencyNotWhitelisted();
//     error TipAmountCannotBeZero();
//     error CollectionAddressCannotBeZero();

//     IModuleGlobals public immutable MODULE_GLOBALS;

//     constructor(address hub, address moduleGlobals) HubRestricted(hub) {
//         MODULE_GLOBALS = IModuleGlobals(moduleGlobals);
//     }

//     function initializePublicationAction(
//         uint256 profileId,
//         uint256 pubId,
//         address /* transactionExecutor */,
//         bytes calldata data
//     ) external override onlyHub returns (bytes memory) {
//         (address collection, address tipReceiver) = abi.decode(
//             data,
//             (address, address)
//         );

//         _collections[profileId][pubId] = collection;
//         _tipReceivers[profileId][pubId] = tipReceiver;

//         return data;
//     }

//     function processPublicationAction(
//         Types.ProcessActionParams calldata params
//     ) external override onlyHub returns (bytes memory) {
//         (address currency, uint96 tipAmount) = abi.decode(
//             params.actionModuleData,
//             (address, uint96)
//         );

//         if (!MODULE_GLOBALS.isCurrencyWhitelisted(currency)) {
//             revert CurrencyNotWhitelisted();
//         }

//         if (tipAmount == 0) {
//             revert TipAmountCannotBeZero();
//         }

//         address tipReceiver = _tipReceivers[params.publicationActedProfileId][
//             params.publicationActedId
//         ];

//         address collection = _tipReceivers[params.publicationActedProfileId][
//             params.publicationActedId
//         ];

//         IERC20(currency).transferFrom(
//             params.transactionExecutor,
//             tipReceiver,
//             tipAmount
//         );

//         IERC721(collection).transferFrom(
//             params.transactionExecutor,
//             tipReceiver,
//             tipAmount
//         );

//         return abi.encode(tipReceiver, currency, tipAmount);
//     }
// }
