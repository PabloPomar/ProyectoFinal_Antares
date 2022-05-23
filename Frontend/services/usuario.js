// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL_API } from "@env";

export const usuarioApi = createApi({
  reducerPath: "usuarioApi",
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
    userLogin: build.mutation({
      query: (body) => {
        return {
          url: `/Usuario/token`,
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});

export const { useUserLoginMutation } = usuarioApi;
