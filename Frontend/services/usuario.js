// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL_API } from "@env";

export const usuarioApi = createApi({
  reducerPath: "usuarioApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL_API + "/api/v1" }),
  endpoints: (build) => ({
    userLogin: build.mutation({
        query: (body) => {
          return {
            url: `/Usuario/token`,
            method: 'POST',
            body: body,
          }
        },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUserLoginMutation } = usuarioApi;
