// src/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for the login user and auth state
export interface LoginUser {
  email: string;
  name: string;
  id: string;
  role: string;
  phone?: string;
}

export interface AuthState {
  user: LoginUser | null;
  isAuthenticated: boolean;
  isError: boolean;
  loginLoading: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

// Initial state for the auth slice
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isError: false,
  loginLoading: false,
  isLoading: true,
  error: null,
  token: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      const { user, token: accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;

// Export the AuthState type to make it available in other files

