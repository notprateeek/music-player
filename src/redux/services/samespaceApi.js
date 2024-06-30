import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const samespaceApi = createApi({
  reducerPath: 'samespaceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://cms.samespace.com/',
  }),
  endpoints: (builder) => ({
    getSongs: builder.query({
      query: () => 'items/songs',
    }),
  }),
})

export const { useGetSongsQuery } = samespaceApi
