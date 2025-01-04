// src/store/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { baseApi } from '../api/baseApi';
import authReducer from '../slices/authSlice';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';


const createNoopStorage = () => {
  return {
    getItem(): Promise<null> {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any): Promise<any> {
      return Promise.resolve(value);
    },
    removeItem(): Promise<void> {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();


// Persist configuration for the auth slice
const authPersistConfig = {
  key: 'auth',
  storage,
};

// Combine reducers, including persisted reducers
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: persistReducer(authPersistConfig, authReducer), // Persisted auth reducer
});

// Configure the Redux store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks for redux-persist compatibility
    }).concat(baseApi.middleware), // Include RTK Query middleware
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in non-production environments
});

// Create a persistor for managing persisted state
export const persistor = persistStore(store);

// Define TypeScript types for the store, dispatch, and state
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
