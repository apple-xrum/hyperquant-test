import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BotType } from "@types";

interface DataResponse {
  trading_capital: number;
  trading_capital_currency: string;
  balance: number;
  on_hold: number;
  bots: BotType[];
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/database" }),
  endpoints: (builder) => ({
    getData: builder.query<DataResponse, void>({
      query: () => "data.min.json",
    }),
  }),
});

export const { useLazyGetDataQuery } = apiSlice;
