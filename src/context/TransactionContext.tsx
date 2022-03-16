import React, {
  useEffect,
  useState,
  createContext,
  FunctionComponent,
} from "react";

import { ethers, Contract } from "ethers";

import { contractAddress } from "../contracts";
import TransactionContractJSON from "../contracts/Transaction.json";
import {
  APP_STATUS_NO_META_MASK_FOUND,
  APP_STATUS_NO_USER_FOUND,
  APP_STATUS_ERROR,
  APP_STATUS_LOADING,
  APP_STATUS_CONNECTED,
} from "../constants/app";
import { FormData } from "../typings/FormData";
import { parse } from "path";
import {
  TransactionStatusType,
  TransactionDataType,
} from "../typings/Transaction";
import {
  TRANSACTION_STATUS_INITIAL,
  TRANSACTION_STATUS_LOADING,
  TRANSACTION_STATUS_COMPLETED,
} from "../constants/transaction";
import { fdatasync } from "fs";

declare let window: any;
interface TransactionContextType {
  appStatus: AppStatus;
  transactionContract: Contract | null;
  connectWallet: () => void;
  currentUserAddress: string | null;
  sendTransaction: (data: FormData) => void;
  transactionStatus: TransactionStatusType;
}

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

const { ethereum } = window;

type AppStatus =
  | typeof APP_STATUS_NO_META_MASK_FOUND
  | typeof APP_STATUS_NO_USER_FOUND
  | typeof APP_STATUS_CONNECTED
  | typeof APP_STATUS_ERROR
  | typeof APP_STATUS_LOADING;

export const TransactionProvider: FunctionComponent = ({ children }) => {
  const [appStatus, setAppStatus] = useState<AppStatus>(APP_STATUS_LOADING);
  const [
    transactionContract,
    setTransactionCountract,
  ] = useState<Contract | null>(null);

  const [currentUserAddress, setCurrentUserAddress] = useState<string | null>(
    null
  );

  const [
    transactionStatus,
    setTransactionStatus,
  ] = useState<TransactionStatusType>(TRANSACTION_STATUS_INITIAL);

  const [numOfTransactions, setNumOfTransactions] = useState<number>(0);
  const [allTransactions, setAllTransactions] = useState<TransactionDataType[]>(
    []
  );

  useEffect(() => {
    const init = async () => {
      if (!ethereum) {
        // do something
        setAppStatus(APP_STATUS_NO_META_MASK_FOUND);
      } else {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const transactionContract = new ethers.Contract(
          contractAddress,
          TransactionContractJSON.abi,
          signer
        );
        setTransactionCountract(transactionContract as Contract);
        const transactionCount = await transactionContract.transactionCount();
        setNumOfTransactions(transactionCount.toNumber());

        if (transactionCount.toNumber() !== 0) {
          let data: TransactionDataType[] = [];
          for (var i = 0; i <= transactionCount.toNumber(); i++) {
            const transaction = await transactionContract?.transactions(i);
            const {
              receiver,
              sender,
              amount,
              transactionId,
              timestamp,
              message,
              keyword,
            } = transaction;
            const transactionData: TransactionDataType = {
              sender,
              receiver,
              amount: amount.toNumber(),
              transactionId: transactionId.toNumber(),
              timestamp: timestamp.toNumber(),
              message,
              keyword,
            };
            data.push(transactionData);
          }
          setAllTransactions(data);
        }

        const accounts = await ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length > 0) {
          setAppStatus(APP_STATUS_CONNECTED);
          setCurrentUserAddress(accounts[0]);
        } else {
          setAppStatus(APP_STATUS_NO_USER_FOUND);
        }
      }
    };

    init();
  }, []);

  const connectWallet = async () => {
    if (!ethereum) return;
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        setAppStatus(APP_STATUS_CONNECTED);
        setCurrentUserAddress(accounts[0]);
      } else {
        setAppStatus(APP_STATUS_NO_USER_FOUND);
      }
    } catch (error) {
      setAppStatus(APP_STATUS_ERROR);
    }
  };

  const updateTransactions = async (newTransactionId: number) => {
    const transaction = await transactionContract?.transactions(
      newTransactionId
    );
    const {
      receiver,
      sender,
      amount,
      transactionId,
      timestamp,
      message,
      keyword,
    } = transaction;
    const transactionData: TransactionDataType = {
      sender,
      receiver,
      amount: amount.toNumber(),
      transactionId: transactionId.toNumber(),
      timestamp: timestamp.toNumber(),
      message,
      keyword,
    };
    setAllTransactions([...allTransactions, transactionData]);
  };

  const sendTransaction = async ({
    addressTo,
    message,
    keyword,
    eth,
  }: FormData) => {
    if (
      appStatus !== APP_STATUS_CONNECTED ||
      !ethereum ||
      !transactionContract
    ) {
      return;
    } else {
      const parsedAmount = ethers.utils.parseEther(eth.toString());

      // send transaction
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentUserAddress,
            to: addressTo,
            gas: "0x5208", // 21000 Gwei
            value: parsedAmount._hex,
          },
        ],
      });

      setTransactionStatus(TRANSACTION_STATUS_LOADING);

      const transactionHash = await transactionContract.createTransfer(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      await transactionHash.wait();
      setTransactionStatus(TRANSACTION_STATUS_COMPLETED);
      const transactionCount = await transactionContract.transactionCount();
      updateTransactions(transactionCount.toNumber());
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        appStatus,
        transactionContract,
        connectWallet,
        currentUserAddress,
        sendTransaction,
        transactionStatus,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
