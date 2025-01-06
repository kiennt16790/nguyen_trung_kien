import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { Settings } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const SLIPPAGE_OPTIONS = [0.1, 0.5, 1];

type Props = {
  slippage: number;
  onSlippageChange: (value: number) => void;
};

export const SlippageSetting = ({ slippage, onSlippageChange }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="cursor-pointer hover:bg-gray-600 rounded-full p-2">
          <Settings />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction Settings</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div>Slippage Tolerance</div>
          <div className="flex items-center gap-2 justify-between mt-2">
            <div className="flex items-center gap-2">
              {SLIPPAGE_OPTIONS.map((option) => (
                <div
                  key={option}
                  onClick={() => onSlippageChange(option)}
                  className={twMerge(
                    'cursor-pointer border border-gray-500 rounded-md p-2 w-16 text-center text-sm',
                    slippage === option && 'bg-gray-500',
                  )}
                >
                  {option}%
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Input
                className="w-16"
                value={slippage}
                onChange={(e) => onSlippageChange(Number(e.target.value))}
              />
              %
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
