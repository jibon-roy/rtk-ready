"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ReduxProvider: () => ReduxProvider_default,
  authReducer: () => authSlice_default,
  baseApi: () => baseApi,
  baseApiHandler: () => baseApiHandler_default,
  logout: () => logout,
  persistor: () => persistor,
  setUser: () => setUser,
  store: () => store,
  useAppDispatch: () => useAppDispatch,
  useAppSelector: () => useAppSelector
});
module.exports = __toCommonJS(index_exports);

// src/store/store.ts
var import_toolkit2 = require("@reduxjs/toolkit");
var import_redux_persist = require("redux-persist");
var import_storage = __toESM(require("redux-persist/lib/storage"), 1);

// src/api/baseApi.ts
var import_react = require("@reduxjs/toolkit/query/react");
var baseApiHandler = () => {
  const apiUrl = process.env.API_BASE_URL || "https://api.example.com";
  return apiUrl;
};
var baseApi = (0, import_react.createApi)({
  reducerPath: "api",
  // Unique name for the API slice
  baseQuery: (0, import_react.fetchBaseQuery)({
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
var import_toolkit = require("@reduxjs/toolkit");
var initialState = {
  user: null,
  isAuthenticated: false,
  isError: false,
  loginLoading: false,
  isLoading: true,
  error: null,
  token: null
};
var authSlice = (0, import_toolkit.createSlice)({
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
  storage: import_storage.default
};
var rootReducer = (0, import_toolkit2.combineReducers)({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: (0, import_redux_persist.persistReducer)(authPersistConfig, authSlice_default)
  // Persisted auth reducer
});
var store = (0, import_toolkit2.configureStore)({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
    // Disable serializable checks for redux-persist compatibility
  }).concat(baseApi.middleware),
  // Include RTK Query middleware
  devTools: process.env.NODE_ENV !== "production"
  // Enable Redux DevTools in non-production environments
});
var persistor = (0, import_redux_persist.persistStore)(store);

// src/hooks/index.ts
var import_react_redux = require("react-redux");
var useAppDispatch = () => (0, import_react_redux.useDispatch)();
var useAppSelector = import_react_redux.useSelector;

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
var import_react_redux2 = require("react-redux");
var import_jsx_runtime = require("react/jsx-runtime");
var ReduxProvider = ({ children }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_redux2.Provider, { store, children });
};
var ReduxProvider_default = ReduxProvider;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReduxProvider,
  authReducer,
  baseApi,
  baseApiHandler,
  logout,
  persistor,
  setUser,
  store,
  useAppDispatch,
  useAppSelector
});
//# sourceMappingURL=index.cjs.map