/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  OperatorFilterRegistryErrorsAndEvents,
  OperatorFilterRegistryErrorsAndEventsInterface,
} from "../OperatorFilterRegistryErrorsAndEvents";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "AddressAlreadyFiltered",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "filtered",
        type: "address",
      },
    ],
    name: "AddressFiltered",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "AddressNotFiltered",
    type: "error",
  },
  {
    inputs: [],
    name: "AlreadyRegistered",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "subscription",
        type: "address",
      },
    ],
    name: "AlreadySubscribed",
    type: "error",
  },
  {
    inputs: [],
    name: "CannotCopyFromSelf",
    type: "error",
  },
  {
    inputs: [],
    name: "CannotFilterEOAs",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "registrant",
        type: "address",
      },
    ],
    name: "CannotSubscribeToRegistrantWithSubscription",
    type: "error",
  },
  {
    inputs: [],
    name: "CannotSubscribeToSelf",
    type: "error",
  },
  {
    inputs: [],
    name: "CannotSubscribeToZeroAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "subscription",
        type: "address",
      },
    ],
    name: "CannotUpdateWhileSubscribed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "codeHash",
        type: "bytes32",
      },
    ],
    name: "CodeHashAlreadyFiltered",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "codeHash",
        type: "bytes32",
      },
    ],
    name: "CodeHashFiltered",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "codeHash",
        type: "bytes32",
      },
    ],
    name: "CodeHashNotFiltered",
    type: "error",
  },
  {
    inputs: [],
    name: "NotOwnable",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "registrant",
        type: "address",
      },
    ],
    name: "NotRegistered",
    type: "error",
  },
  {
    inputs: [],
    name: "NotSubscribed",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyAddressOrOwner",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "registrant",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "codeHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "filtered",
        type: "bool",
      },
    ],
    name: "CodeHashUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "registrant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32[]",
        name: "codeHashes",
        type: "bytes32[]",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "filtered",
        type: "bool",
      },
    ],
    name: "CodeHashesUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "registrant",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "filtered",
        type: "bool",
      },
    ],
    name: "OperatorUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "registrant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "operators",
        type: "address[]",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "filtered",
        type: "bool",
      },
    ],
    name: "OperatorsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "registrant",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "registered",
        type: "bool",
      },
    ],
    name: "RegistrationUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "registrant",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "subscription",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "subscribed",
        type: "bool",
      },
    ],
    name: "SubscriptionUpdated",
    type: "event",
  },
];

const _bytecode =
  "0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea2646970667358221220546d6c1e7c15d2852c9ae2a101466f72dd0f653f2500c1d2fec430034d6f82ca64736f6c634300080d0033";

export class OperatorFilterRegistryErrorsAndEvents__factory extends ContractFactory {
  constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(overrides?: Overrides & { from?: string | Promise<string> }): Promise<OperatorFilterRegistryErrorsAndEvents> {
    return super.deploy(overrides || {}) as Promise<OperatorFilterRegistryErrorsAndEvents>;
  }
  getDeployTransaction(overrides?: Overrides & { from?: string | Promise<string> }): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): OperatorFilterRegistryErrorsAndEvents {
    return super.attach(address) as OperatorFilterRegistryErrorsAndEvents;
  }
  connect(signer: Signer): OperatorFilterRegistryErrorsAndEvents__factory {
    return super.connect(signer) as OperatorFilterRegistryErrorsAndEvents__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OperatorFilterRegistryErrorsAndEventsInterface {
    return new utils.Interface(_abi) as OperatorFilterRegistryErrorsAndEventsInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): OperatorFilterRegistryErrorsAndEvents {
    return new Contract(address, _abi, signerOrProvider) as OperatorFilterRegistryErrorsAndEvents;
  }
}
