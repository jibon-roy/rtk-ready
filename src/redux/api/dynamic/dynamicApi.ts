import { baseApi } from '../baseApi';

type DynamicApiParams = {
  endpoint: string; // API endpoint
  // remove if do not needed the disabled explicit any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any; // Request body for POST/PUT requests
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | string; // Dynamic HTTP methods
  headers?: Record<string, string>; // Custom headers
  // remove if do not needed the disabled explicit any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invalidatesTags?: { type: any; id?: string | number }[]; // Cache invalidation tags
  // remove if do not needed the disabled explicit any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  providesTags?: { type: any; id?: string | number }[]; // Cache provision tags
};

const dynamicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Dynamic Mutation for POST, PUT, DELETE, etc.
    dynamic: builder.mutation({
      query: ({
        endpoint,
        data,
        method = 'POST', // Default to POST for mutations
        headers,
      }: DynamicApiParams) => ({
        url: endpoint,
        method: method.toUpperCase(), // Ensure uppercase HTTP method
        body: data || null, // Set body only when data exists
        headers: {
          'Content-Type': 'application/json', // Default header
          ...headers, // Merge custom headers
        },
      }),
      // Cache invalidation based on user-provided tags
      invalidatesTags: (result, error, { invalidatesTags }) =>
        invalidatesTags || [],
    }),

    // Dynamic Query for GET requests
    dynamicGet: builder.query({
      query: ({
        endpoint,
        method = 'GET', // Default to GET for queries
        headers,
      }: DynamicApiParams) => ({
        url: endpoint,
        method: method.toUpperCase(), // Ensure uppercase HTTP method
        headers: {
          'Content-Type': 'application/json', // Default header
          ...headers, // Merge custom headers
        },
      }),
      // Cache provision based on user-provided tags
      providesTags: (result, error, { providesTags }) => providesTags || [],
    }),
  }),
});

// Export hooks for using the endpoints in components
export const {
  useDynamicMutation,
  useDynamicGetQuery,
  useLazyDynamicGetQuery,
} = dynamicApi;

export default dynamicApi;
