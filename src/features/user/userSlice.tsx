//manage sessions api will be handled here

import { apiSlice } from "../api/apiSlice";


export const manageSessionApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //Manage Session Get Patient
        getUserAds: builder.query({
            query: () => ({
                url: `/product/get/user/posted/ads`,
                method: "GET"
            }),
        }),

        //get logged in user purchased products
        getUserPurchased: builder.query({
            query: () => ({
                url: `/product/get/user/purchased`,
                method: "GET"
            }),
        }),

        //get user sold products
        getUserSold: builder.query({
            query: () => ({
                url: `/product/get/user/sold/products`,
                method: "GET"
            }),
        }), 

    }),
});

export const {
    useGetUserAdsQuery,
    useGetUserPurchasedQuery,
    useGetUserSoldQuery,
    //   useManageSessionGetProviderQuery,
    //   useGetManageSessionListQuery,
    //   useManageSessionStatusChangeMutation,
} = manageSessionApi;
