import { createSlice } from "@reduxjs/toolkit";

// Define the interface for the document
export interface CoinDocument {
  code: string;
  name: string;
  rate: number;
  volume?: number;
  cap?: number;
  symbol?: string;
  color?: string;
}

type CoinState = {
  tableData: CoinDocument[];
  selectedCoin: string;
};

const initialState: CoinState = {
  tableData: [],
  selectedCoin: "BTC",
};

export const todo = createSlice({
  name: "coins",
  initialState,
  reducers: {
    fetchCoins: (state, action) => {},
  },
});

export const { fetchCoins } = todo.actions;
export default todo.reducer;
