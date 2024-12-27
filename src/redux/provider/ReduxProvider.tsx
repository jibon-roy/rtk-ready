// src/ReduxProvider.tsx
'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store'; // Import the store you have created

interface ReduxProviderProps {
  children: React.ReactNode;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
