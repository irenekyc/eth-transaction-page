import React, {
  InputHTMLAttributes,
  FunctionComponent,
  useState,
  ChangeEventHandler,
  useContext,
  useEffect,
} from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import Loader from "../loader";
import { TransactionContext } from "../../context/TransactionContext";
import { APP_STATUS_CONNECTED } from "../../constants/app";
import { FormData } from "../../typings/FormData";
import { isAddress } from "ethers/lib/utils";
import {
  TRANSACTION_STATUS_COMPLETED,
  TRANSACTION_STATUS_LOADING,
} from "../../constants/transaction";

const gridItemStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: FunctionComponent<InputProps> = ({ className, ...props }) => (
  <input
    {...props}
    className={`my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism ${className}}`}
  />
);

const Welcome = () => {
  const {
    connectWallet,
    appStatus,
    currentUserAddress,
    sendTransaction,
    transactionStatus,
  } = useContext(TransactionContext);

  const [formData, setFormData] = useState<FormData>({
    addressTo: "",
    eth: 0.0001,
    keyword: "",
    message: "",
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const { addressTo, eth, keyword } = formData;
    if (!addressTo || !eth || !keyword) {
      return;
    }
    const isValidAddress = isAddress(addressTo);
    if (!isValidAddress) {
      // set error
    } else {
      sendTransaction(formData);
    }
  };

  const renderStatus = (status = transactionStatus): JSX.Element => {
    switch (status) {
      case TRANSACTION_STATUS_COMPLETED:
        // do something
        return <span>Completed</span>;
      case TRANSACTION_STATUS_LOADING:
        // Loader
        return <Loader />;
      case TRANSACTION_STATUS_LOADING:
        // Loader
        return <span>ERROR</span>;
      default:
        return (
          <button
            type="button"
            onClick={handleSubmit}
            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor"
          >
            Send Now
          </button>
        );
    }
  };

  useEffect(() => {
    if (transactionStatus === TRANSACTION_STATUS_COMPLETED) {
      setFormData({
        addressTo: "",
        eth: 0.0001,
        keyword: "",
        message: "",
      });
    }
  }, [transactionStatus]);
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col md:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-white text-left mt-5 font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell crytocurrencies easily on
            Krypto
          </p>
          {appStatus !== APP_STATUS_CONNECTED && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] justify-center items-center"
            >
              <p className="text-white text-base font-bold">Connect Wallet</p>
            </button>
          )}
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${gridItemStyles}`}>
              <p>Reliability</p>
            </div>
            <div className={`${gridItemStyles}`}>
              <p>Security</p>
            </div>
            <div className={`rounded-tr-2xl ${gridItemStyles}`}>
              <p>Ethereum</p>
            </div>
            <div className={`rounded-bl-2xl ${gridItemStyles}`}>
              <p>Web 3.0</p>
            </div>
            <div className={`${gridItemStyles}`}>
              <p>Low fees</p>
            </div>
            <div className={`rounded-br-2xl ${gridItemStyles}`}>
              <p>Blockchain</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
          {/* credit card like */}
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorpism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {currentUserAddress || "no wallet connected"}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          {/*  Forms */}
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder="Address To"
              name="addressTo"
              id="addressTo"
              value={formData.addressTo}
              onChange={handleChange}
              type="text"
            />

            <Input
              placeholder="Eth"
              type="number"
              step="0.0001"
              value={formData.eth}
              id="eth"
              onChange={handleChange}
            />
            <Input
              placeholder="Keyword(GIF)"
              type="text"
              value={formData.keyword}
              id="keyword"
              onChange={handleChange}
            />
            <Input
              placeholder="Enter Message"
              type="text"
              value={formData.message}
              id="message"
              onChange={handleChange}
            />
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {renderStatus(transactionStatus)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
