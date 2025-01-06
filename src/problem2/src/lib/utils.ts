import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const TOKEN_IMAGE_URL = 'https://assets.odos.xyz/tokens';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTokenImageUrl = (symbol: string) =>
  `${TOKEN_IMAGE_URL}/${symbol}.webp`;
