// src/store/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// src/api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
var baseApiHandler = () => {
  const apiUrl = process.env.API_BASE_URL || "https://api.example.com";
  return apiUrl;
};
var baseApi = createApi({
  reducerPath: "api",
  // Unique name for the API slice
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiHandler(),
    // Base URL from the utility function
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    // Define the API endpoints here
    // Example:
    // getUser: builder.query<User, void>({
    //   query: () => "/user",
    // }),
    // Add other API endpoints as needed
  }),
  tagTypes: [
    "USER"
    // Example tag type for cache invalidation
  ]
  // These are used for cache invalidation and re-fetching
});

// src/slices/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
var initialState = {
  user: null,
  isAuthenticated: false,
  isError: false,
  loginLoading: false,
  isLoading: true,
  error: null,
  token: null
};
var authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token: accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    }
  }
});
var { logout, setUser } = authSlice.actions;
var authSlice_default = authSlice.reducer;

// src/store/store.ts
var authPersistConfig = {
  key: "auth",
  storage
};
var rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: persistReducer(authPersistConfig, authSlice_default)
  // Persisted auth reducer
});
var store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
    // Disable serializable checks for redux-persist compatibility
  }).concat(baseApi.middleware),
  // Include RTK Query middleware
  devTools: process.env.NODE_ENV !== "production"
  // Enable Redux DevTools in non-production environments
});
var persistor = persistStore(store);

// src/hooks/index.ts
import { useDispatch, useSelector } from "react-redux";
var useAppDispatch = () => useDispatch();
var useAppSelector = useSelector;

// src/utils/baseApiHandler.ts
var baseApiHandler2 = () => {
  const nextMode = process.env.NEXT_PUBLIC_MODE;
  const prodLink = process.env.NEXT_PUBLIC_PROD_API_URL;
  const devLink = process.env.NEXT_PUBLIC_DEV_API_URL;
  if (!prodLink || !devLink) {
    throw new Error("API URLs are not properly defined in the environment.");
  }
  if (nextMode === "dev") {
    return devLink;
  }
  if (nextMode === "prod") {
    return prodLink;
  }
  throw new Error("mode is undefined, defaulting to production API.");
};
var baseApiHandler_default = baseApiHandler2;

// src/provider/ReduxProvider.tsx
import { Provider } from "react-redux";
import { jsx } from "react/jsx-runtime";
var ReduxProvider = ({ children }) => {
  return /* @__PURE__ */ jsx(Provider, { store, children });
};
var ReduxProvider_default = ReduxProvider;
export {
  ReduxProvider_default as ReduxProvider,
  authSlice_default as authReducer,
  baseApi,
  baseApiHandler_default as baseApiHandler,
  logout,
  persistor,
  setUser,
  store,
  useAppDispatch,
  useAppSelector
};
//# sourceMappingURL=index.js.map