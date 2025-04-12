import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ImageApi = createApi({
    reducerPath: "imageApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token")
            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }

            return headers
        }
    }),
    endpoints: (builder) => ({ 
        getAllImages: builder.query({
            query: () => "/image/images",
        })
        ,
        getBySectionAllImages: builder.query({
            query: (section) => `/image?section=${section}`,
        })
        ,
        createImage: builder.mutation({
            query: (imgData) => ({
                url: '/image',
                method: 'POST',
                body: imgData,

            }),
        }),

        deleteImage: builder.mutation({
            query: (id) => ({
                url: `/image/${id}`,
                method: 'DELETE',

            }),
        })
    }),
})


export const { useCreateImageMutation, useDeleteImageMutation, useGetAllImagesQuery, useGetBySectionAllImagesQuery } = ImageApi