import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const UserApi = createApi({
    reducerPath: "userApi",
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
        // auth endpoints
        register: builder.mutation({
            query: (registerData) => ({
                url: '/auth/register',
                method: 'POST',
                body: registerData,
            }),
        }),
        login: builder.mutation({
            query: (loginData) => ({
                url: '/auth/login',
                method: 'POST',
                body: loginData,
            }),
        }),
        verify: builder.mutation({
            query: (verifyData) => ({
                url: '/auth/verify',
                method: 'POST',
                body: verifyData,
            }),
        }),
        // get all users
        getAllUsers: builder.query({
            query: () => ({
                url: '/auth',
                method: 'GET',
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/auth/${id}`,
                method: 'DELETE',
            }), 
        }),
    }),
})


export const { useRegisterMutation, useLoginMutation, useVerifyMutation, useDeleteUserMutation, useGetAllUsersQuery } = UserApi