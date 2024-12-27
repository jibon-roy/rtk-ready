// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '../api/baseApi';
import authReducer from '../slices/authSlice'; // Import the authReducer

// Persist configuration for the auth slice
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Import the storage for persistence

// Persist configuration for the auth slice
const authPersistConfig = {
  key: 'auth',
  storage,
};

// Combine reducers, including persisted reducers
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer, // Base API reducer for RTK Query
  auth: persistReducer(authPersistConfig, authReducer), // Persisted auth reducer
});

export default rootReducer;
