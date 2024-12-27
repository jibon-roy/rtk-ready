import * as redux_persist from 'redux-persist';
import * as _reduxjs_toolkit from '@reduxjs/toolkit';
import * as redux_thunk from 'redux-thunk';
import * as redux from 'redux';
import * as redux_persist_es_persistReducer from 'redux-persist/es/persistReducer';
import * as _reduxjs_toolkit_query from '@reduxjs/toolkit/query';
import * as _reduxjs_toolkit_query_react from '@reduxjs/toolkit/query/react';
import { TypedUseSelectorHook } from 'react-redux';
import React from 'react';

interface LoginUser {
    email: string;
    name: string;
    id: string;
    role: string;
    phone?: string;
}
interface AuthState {
    user: LoginUser | null;
    isAuthenticated: boolean;
    isError: boolean;
    loginLoading: boolean;
    isLoading: boolean;
    error: string | null;
    token: string | null;
}
declare const logout: _reduxjs_toolkit.ActionCreatorWithoutPayload<"auth/logout">;
declare const setUser: _reduxjs_toolkit.ActionCreatorWithPayload<AuthState, "auth/setUser">;
declare const _default: redux.Reducer<AuthState>;

declare const store: _reduxjs_toolkit.EnhancedStore<{
    api: _reduxjs_toolkit_query.CombinedState<{}, "USER", "api">;
    auth: AuthState & redux_persist_es_persistReducer.PersistPartial;
}, redux.UnknownAction, _reduxjs_toolkit.Tuple<[redux.StoreEnhancer<{
    dispatch: redux_thunk.ThunkDispatch<{
        api: _reduxjs_toolkit_query.CombinedState<{}, "USER", "api">;
        auth: AuthState & redux_persist_es_persistReducer.PersistPartial;
    }, undefined, redux.UnknownAction>;
}>, redux.StoreEnhancer]>>;
declare const persistor: redux_persist.Persistor;
type AppStore = typeof store;
type RootState = ReturnType<AppStore["getState"]>;
type AppDispatch = AppStore["dispatch"];

declare const baseApi: _reduxjs_toolkit_query.Api<_reduxjs_toolkit_query.BaseQueryFn<string | _reduxjs_toolkit_query.FetchArgs, unknown, _reduxjs_toolkit_query.FetchBaseQueryError, {}, _reduxjs_toolkit_query.FetchBaseQueryMeta>, {}, "api", "USER", typeof _reduxjs_toolkit_query.coreModuleName | typeof _reduxjs_toolkit_query_react.reactHooksModuleName>;

declare const useAppDispatch: () => redux_thunk.ThunkDispatch<{
    api: _reduxjs_toolkit_query.CombinedState<{}, "USER", "api">;
    auth: AuthState & redux_persist_es_persistReducer.PersistPartial;
}, undefined, redux.UnknownAction> & redux.Dispatch<redux.UnknownAction>;
declare const useAppSelector: TypedUseSelectorHook<RootState>;

declare const baseApiHandler: () => string;

interface ReduxProviderProps {
    children: React.ReactNode;
}
declare const ReduxProvider: React.FC<ReduxProviderProps>;

export { type AppDispatch, ReduxProvider, type RootState, _default as authReducer, baseApi, baseApiHandler, logout, persistor, setUser, store, useAppDispatch, useAppSelector };
