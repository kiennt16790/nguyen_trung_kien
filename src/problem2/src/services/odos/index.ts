import request from '../request';
import { CHAIN_ID } from '../../constant/chain';
import {
  TokensResponse,
  WalletBalanceResponse,
  Balance,
  QuoteResponse,
  QuoteRequestParams,
  AssembleRequestParams,
  AssembleResponse,
} from './type';

const API_URL = import.meta.env.VITE_ODOS_ENDPOINT;

export const fetchTokens = async (): Promise<TokensResponse> => {
  const response = await request.get<TokensResponse>(
    `${API_URL}/info/tokens/${CHAIN_ID}`,
  );

  return response.data;
};

export const fetchWalletBalance = async (
  address: string,
): Promise<Balance[]> => {
  const response = await request.get<WalletBalanceResponse>(
    `${API_URL}/balances/${address}/${CHAIN_ID}`,
  );

  return response.data?.balances || [];
};

export const fetchQuote = async (
  params: QuoteRequestParams,
): Promise<QuoteResponse> => {
  const response = await request.post<QuoteResponse>(
    `${API_URL}/sor/quote/v2`,
    params,
  );

  return response.data;
};

export const fetchAssemble = async (params: AssembleRequestParams) => {
  const response = await request.post<AssembleResponse>(
    `${API_URL}/sor/assemble`,
    params,
  );

  return response.data;
};
