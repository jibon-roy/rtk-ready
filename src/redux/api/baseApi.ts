// src/api/baseApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';

// Utility function to handle the base API URL
const baseApiHandler = () => {
  // You can configure this based on your environment or other needs
  const apiUrl = process.env.API_BASE_URL || 'https://api.example.com'; // Default API URL
  return apiUrl;
};

// Define the base API using RTK Query
export const baseApi = createApi({
  reducerPath: 'api', // Unique name for the API slice
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiHandler(), // Base URL from the utility function
    prepareHeaders: (headers, { getState }) => {
      // Access the token from the Redux state
      const token = (getState() as RootState).auth.token;
      if (token) {
        // If token exists, add it to the Authorization header
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({
    // Also can add builder here like endpoints: (builder) => ({}),
    // Add other API endpoints as needed
  }),
  tagTypes: [
    'USER', // Example tag type for cache invalidation
  ],
});
