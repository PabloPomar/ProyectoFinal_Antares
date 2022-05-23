// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL_API } from "@env";
import { data } from "./pedidoData";

export const pedidoApi = createApi({
  reducerPath: "pedidoApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: URL_API + "/api/v1",
    baseUrl: "https://cb4d-190-246-205-106.ngrok.io/api/v1",
    prepareHeaders: (headers, { getState }) => {
      headers.set("accept", "application/octet-stream");
      headers.set("accept", "application/json");
      return headers;
    },
  }),
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (_body) => {
        return {
          url: `/Pedido/CrearPedido`,
          method: "POST",
          body: data,
        };
      },
    }),
    getOrderState: build.query({
      query: (arg) => {
        const { OrderId } = arg;
        console.log("id: ", OrderId);
        return {
          url: "/Pedido/getEstado",
          method: "GET",
          params: { OrderId },
        };
      },
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderStateQuery } = pedidoApi;
