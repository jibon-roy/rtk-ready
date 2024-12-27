// src/store/persistor.ts
import { persistStore } from 'redux-persist';
import { store } from './store'; // Import the store to create the persistor

// Create and export the persistor
export const persistor = persistStore(store);
