import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const LogApi = createApi({
    reducerPath: "logApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token")
            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }
            headers.set("Content-Type", "application/json")
            return headers
        }
    }),
    endpoints: (builder) => ({
        getLogs: builder.query({
            query: () => "/log",
        })
        ,
        createLog: builder.mutation({
            query: (logdata) => ({
                url: '/log',
                method: 'POST',
                body: logdata,
            }),
        }),

    }),
})


export const { useCreateLogMutation,useGetLogsQuery } = LogApi