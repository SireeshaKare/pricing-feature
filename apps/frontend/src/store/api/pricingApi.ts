import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pricingApi = createApi({
  reducerPath: "pricingApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  endpoints: (builder) => ({
    getProductsBySupplier: builder.query({
      query: (supplierId: string) => ({
        url: `/product/${supplierId}`,
        method: "GET",
      }),
    }),
    calculatePricing: builder.mutation({
      query: (body) => ({
        url: "/pricing-profile/calculate-prices",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetProductsBySupplierQuery, useCalculatePricingMutation } =
  pricingApi;
