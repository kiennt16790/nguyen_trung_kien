import { useCallback, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TokenWithBalance } from '@/services/odos/type';
import {
  getContract,
  prepareContractCall,
  sendAndConfirmTransaction,
  prepareTransaction,
} from 'thirdweb';
import { toast } from 'react-toastify';
import { client, chain } from '@/config/thirdweb';
import { useActiveAccount } from 'thirdweb/react';
import { useAssemble } from '@/hooks/useAssemble';
import { TransactionStatus, MAX_INT256 } from '@/constant/quote';
import { TransactionStatusIcon } from './transaction-status';
import { Button } from '../ui/button';

type Props = {
  tokenIn?: TokenWithBalance;
  tokenOut?: TokenWithBalance;
  pathId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const TransactionExecution = ({
  pathId,
  tokenIn,
  tokenOut,
  open,
  onOpenChange,
}: Props) => {
  const [approveStatus, setApproveStatus] = useState<
    TransactionStatus | undefined
  >();
  const [swapStatus, setSwapStatus] = useState<TransactionStatus | undefined>();
  const isSwapFromNative = tokenIn?.protocolId === 'native';

  const activeAccount = useActiveAccount();
  const { data: assembleData, isSuccess } = useAssemble({
    userAddr: activeAccount?.address || '',
    pathId: pathId,
  });

  const approveToken = useCallback(
    async (address: string) => {
      try {
        setApproveStatus(TransactionStatus.LOADING);
        const erc20Contract = getContract({
          client,
          chain,
          address: address,
        });
        // TODO: check allowance, as the demo I skip check allowance step
        const approveTransaction = prepareContractCall({
          contract: erc20Contract,
          method: 'function approve(address spender, uint256 value)',
          params: [import.meta.env.VITE_ODOS_ROUTER_ADDRESS, MAX_INT256],
        });

        // send approve transaction
        await sendAndConfirmTransaction({
          transaction: approveTransaction,
          account: activeAccount!,
        });
        setApproveStatus(TransactionStatus.SUCCESS);
        return true;
      } catch (error) {
        console.error(error);
        toast.error('Failed to approve token');
        setApproveStatus(TransactionStatus.ERROR);
        return false;
      }
    },
    [activeAccount],
  );

  const swap = useCallback(async () => {
    if (!assembleData) return;

    let isApproved = true;
    // no need to approve native token
    if (!isSwapFromNative) {
      isApproved = await approveToken(
        assembleData?.inputTokens[0].tokenAddress,
      );
    }
    if (!isApproved) return;

    setSwapStatus(TransactionStatus.LOADING);
    try {
      // prepare swap transaction
      const swapTransaction = prepareTransaction({
        data: assembleData.transaction.data,
        chain,
        client,
        gasPrice: BigInt(assembleData.transaction.gasPrice),
        gas: BigInt(assembleData.transaction.gas),
        to: import.meta.env.VITE_ODOS_ROUTER_ADDRESS,
      });

      // send swap transaction
      await sendAndConfirmTransaction({
        transaction: swapTransaction,
        account: activeAccount!,
      });

      setSwapStatus(TransactionStatus.SUCCESS);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || 'Failed to swap the token');
      setSwapStatus(TransactionStatus.ERROR);
    }
  }, [assembleData, activeAccount, approveToken, isSwapFromNative]);

  useEffect(() => {
    // if assemble data is success, swap
    if (isSuccess) {
      swap();
    }
  }, [isSuccess, swap]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Swap {tokenIn?.symbol} for {tokenOut?.symbol}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {!isSwapFromNative && (
            <div className="flex items-center gap-2">
              <div>Approve {tokenIn?.symbol}</div>
              <TransactionStatusIcon status={approveStatus} />
            </div>
          )}
          <div className="flex items-center gap-2">
            <div>
              Swap {tokenIn?.symbol} for {tokenOut?.symbol}
            </div>
            <TransactionStatusIcon status={swapStatus} />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          {(approveStatus === TransactionStatus.ERROR ||
            swapStatus === TransactionStatus.ERROR) && (
            <Button variant="outline" onClick={swap}>
              Retry
            </Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
