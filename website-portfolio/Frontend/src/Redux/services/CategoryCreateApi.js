import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const CategoryApi = createApi({
    reducerPath: "categoryApi",
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
        getCategories: builder.query({
            query: () => "/category",
        })
        ,
        createCategory: builder.mutation({
            query: (categData) => ({
                url: '/category',
                method: 'POST',
                body: categData,
            }),
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/category/${id}`,
                method: 'DELETE',

            }),
        })
    }),
})


export const { useCreateCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery } = CategoryApi