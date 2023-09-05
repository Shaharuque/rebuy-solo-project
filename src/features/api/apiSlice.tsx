import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import useToken from "../../customhooks/useToken";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9100/api/",
    prepareHeaders: (headers, { }) => {
      const {token}=useToken();
      console.log(token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [],
  endpoints: (builder) => ({}),
});
