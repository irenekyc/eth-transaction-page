import React, { useContext, FunctionComponent } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import { TransactionDataType } from "../../typings/Transaction";
import { shortenAddress } from "../../lib/shortenAddress";
import { formatUnits } from "ethers/lib/utils";
import useFetch from "../../hooks/useFetch";

interface TransactionCardProps {
  transaction: TransactionDataType;
}

const TransactionCard: FunctionComponent<TransactionCardProps> = ({
  transaction,
}: TransactionCardProps) => {
  const { currentUserAddress } = useContext(TransactionContext);

  const { sender, receiver, amount, keyword, message, timestamp } = transaction;
  const gifUrl = useFetch({ keyword });
  if (currentUserAddress?.toLowerCase() !== sender.toLowerCase()) return null;
  return (
    <div className="bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] flex-col p-3 rounded-md hover:shadow-2xl">
      <div className="flex flex-col items-center w-full mt-3">
        <div className="w-full mb-6 p-2">
          <a
            href={`https://ropsten.etherscan.io/address/${sender}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white text-base">
              From: {shortenAddress(sender)}
            </p>
          </a>
          <a
            href={`https://ropsten.etherscan.io/address/${receiver}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white text-base">
              To: {shortenAddress(receiver)}
            </p>
          </a>
          <p className="text-white text-base">
            Amount: {formatUnits(amount.toString(), "ether").toString()} ETH
          </p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl}
          alt="gif"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-2 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">
            {new Date(transaction.timestamp * 1000).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { allTransactions, currentUserAddress } = useContext(
    TransactionContext
  );
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        <h3 className="text-white text-3xl text-center my-2">
          {!currentUserAddress
            ? "Connect your account to see the latest transactions"
            : "Latest Transactions"}
        </h3>
        <div className="flex flex-wrap justify-center items-center mdt-10">
          {allTransactions.map((transaction: TransactionDataType) => (
            <TransactionCard
              key={transaction.transactionId}
              transaction={transaction}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
