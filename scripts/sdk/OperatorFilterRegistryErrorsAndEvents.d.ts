/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface OperatorFilterRegistryErrorsAndEventsInterface extends ethers.utils.Interface {
  functions: {};

  events: {
    "CodeHashUpdated(address,bytes32,bool)": EventFragment;
    "CodeHashesUpdated(address,bytes32[],bool)": EventFragment;
    "OperatorUpdated(address,address,bool)": EventFragment;
    "OperatorsUpdated(address,address[],bool)": EventFragment;
    "RegistrationUpdated(address,bool)": EventFragment;
    "SubscriptionUpdated(address,address,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CodeHashUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CodeHashesUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OperatorUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OperatorsUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RegistrationUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SubscriptionUpdated"): EventFragment;
}

export type CodeHashUpdatedEvent = TypedEvent<
  [string, string, boolean] & {
    registrant: string;
    codeHash: string;
    filtered: boolean;
  }
>;

export type CodeHashesUpdatedEvent = TypedEvent<
  [string, string[], boolean] & {
    registrant: string;
    codeHashes: string[];
    filtered: boolean;
  }
>;

export type OperatorUpdatedEvent = TypedEvent<
  [string, string, boolean] & {
    registrant: string;
    operator: string;
    filtered: boolean;
  }
>;

export type OperatorsUpdatedEvent = TypedEvent<
  [string, string[], boolean] & {
    registrant: string;
    operators: string[];
    filtered: boolean;
  }
>;

export type RegistrationUpdatedEvent = TypedEvent<[string, boolean] & { registrant: string; registered: boolean }>;

export type SubscriptionUpdatedEvent = TypedEvent<
  [string, string, boolean] & {
    registrant: string;
    subscription: string;
    subscribed: boolean;
  }
>;

export class OperatorFilterRegistryErrorsAndEvents extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: OperatorFilterRegistryErrorsAndEventsInterface;

  functions: {};

  callStatic: {};

  filters: {
    "CodeHashUpdated(address,bytes32,bool)"(
      registrant?: string | null,
      codeHash?: BytesLike | null,
      filtered?: boolean | null
    ): TypedEventFilter<[string, string, boolean], { registrant: string; codeHash: string; filtered: boolean }>;

    CodeHashUpdated(
      registrant?: string | null,
      codeHash?: BytesLike | null,
      filtered?: boolean | null
    ): TypedEventFilter<[string, string, boolean], { registrant: string; codeHash: string; filtered: boolean }>;

    "CodeHashesUpdated(address,bytes32[],bool)"(
      registrant?: string | null,
      codeHashes?: null,
      filtered?: boolean | null
    ): TypedEventFilter<[string, string[], boolean], { registrant: string; codeHashes: string[]; filtered: boolean }>;

    CodeHashesUpdated(
      registrant?: string | null,
      codeHashes?: null,
      filtered?: boolean | null
    ): TypedEventFilter<[string, string[], boolean], { registrant: string; codeHashes: string[]; filtered: boolean }>;

    "OperatorUpdated(address,address,bool)"(
      registrant?: string | null,
      operator?: string | null,
      filtered?: boolean | null
    ): TypedEventFilter<[string, string, boolean], { registrant: string; operator: string; filtered: boolean }>;

    OperatorUpdated(
      registrant?: string | null,
      operator?: string | null,
      filtered?: boolean | null
    ): TypedEventFilter<[string, string, boolean], { registrant: string; operator: string; filtered: boolean }>;

    "OperatorsUpdated(address,address[],bool)"(
      registrant?: string | null,
      operators?: null,
      filtered?: boolean | null
    ): TypedEventFilter<[string, string[], boolean], { registrant: string; operators: string[]; filtered: boolean }>;

    OperatorsUpdated(
      registrant?: string | null,
      operators?: null,
      filtered?: boolean | null
    ): TypedEventFilter<[string, string[], boolean], { registrant: string; operators: string[]; filtered: boolean }>;

    "RegistrationUpdated(address,bool)"(
      registrant?: string | null,
      registered?: boolean | null
    ): TypedEventFilter<[string, boolean], { registrant: string; registered: boolean }>;

    RegistrationUpdated(
      registrant?: string | null,
      registered?: boolean | null
    ): TypedEventFilter<[string, boolean], { registrant: string; registered: boolean }>;

    "SubscriptionUpdated(address,address,bool)"(
      registrant?: string | null,
      subscription?: string | null,
      subscribed?: boolean | null
    ): TypedEventFilter<[string, string, boolean], { registrant: string; subscription: string; subscribed: boolean }>;

    SubscriptionUpdated(
      registrant?: string | null,
      subscription?: string | null,
      subscribed?: boolean | null
    ): TypedEventFilter<[string, string, boolean], { registrant: string; subscription: string; subscribed: boolean }>;
  };

  estimateGas: {};

  populateTransaction: {};
}