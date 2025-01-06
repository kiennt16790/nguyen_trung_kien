import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { TransactionStatus } from '@/constant/quote';

export const TransactionStatusIcon = ({
  status,
}: {
  status?: TransactionStatus;
}) => {
  return (
    <>
      {status === TransactionStatus.LOADING && (
        <Loader2 className="w-4 h-4 animate-spin" />
      )}
      {status === TransactionStatus.SUCCESS && (
        <CheckCircle className="w-4 h-4 text-green-500" />
      )}
      {status === TransactionStatus.ERROR && (
        <XCircle className="w-4 h-4 text-red-500" />
      )}
    </>
  );
};
