// src/index.ts

// Export the configured store
export { store, persistor } from './store/store';

// Export RootState and AppDispatch types
export type { RootState, AppDispatch } from './store/store';

// Export the base API configuration
export { baseApi } from './api/baseApi';

// Export the typed hooks for use throughout the application
export { useAppDispatch, useAppSelector } from './hooks';

// Export all slices (e.g., authSlice) for external usage
export { default as authReducer, setUser, logout } from './slices/authSlice';

// Export utility functions
export { default as baseApiHandler } from './utils/baseApiHandler';

export { default as ReduxProvider } from './provider/ReduxProvider'; // Export the ReduxProvider component
