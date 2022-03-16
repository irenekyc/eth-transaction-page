export type TransactionStatusType =
  | typeof TRANSACTION_STATUS_COMPLETED
  | typeof TRANSACTION_STATUS_FAILED
  | typeof TRANSACTION_STATUS_LOADING
  | typeof TRANSACTION_STATUS_INITIAL;

export type TransactionDataType = {
  sender: string;
  receiver: string;
  amount: number;
  transactionId: number;
  timestamp: number;
  message: string;
  keyword: string;
};
