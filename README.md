# rtk-ready

`rtk-ready` is a Redux utilities package for a boilerplate setup with persisted state, authentication handling, API integration, and typed hooks, providing a structured and scalable state management solution for React applications. It is built with Redux Toolkit, Redux Persist, and integrates with React Redux to provide a streamlined Redux setup for your projects.

## Features

- **Redux Toolkit Integration**: Simplify Redux setup with RTK and custom slices.
- **Persisted State**: Automatically persists and rehydrates your Redux state using `redux-persist`.
- **Typed Redux Hooks**: Use typed `useSelector` and `useDispatch` hooks for safe and efficient Redux usage in React components.
- **API Integration**: Easily integrate APIs using `baseApi` to manage asynchronous actions and handle common API tasks.

## Installation

You can install `rtk-ready` into your React project with npm or yarn:

```bash
npm install rtk-ready
# or
yarn add rtk-ready
```

## Setup

After installing rtk-ready, you'll need to set up the Redux store and ReduxProvider in your app. Follow the steps below to integrate rtk-ready into your project.

### Step 1: Create Redux Folder

Run the following command to automatically create the if necessary the Redux folder structure:

after installing rtk-ready, run the following command:

```bash
npm run postinstall
```

This will create the following folder structure:

```bash
src/
  redux/
    api/
      baseApi.ts
    hooks/
      index.ts
    provider/
      ReduxProvider.tsx
    slices/
      authSlice.ts
      index.ts
    store/
      persistor.ts
      rootReducer.ts
      store.ts
```

### Step 2: Setting Up the Redux Store

In your `src/store/store.ts`, use the provided store setup from `rtk-ready`:

```bash
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../redux/store/rootReducer';
import { persistStore } from 'redux-persist';

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
```

### Step 3: Wrapping Your Application with ReduxProvider

Next, wrap your root component with the `ReduxProvider` to provide Redux state to your app. You can do this in your `app.tsx` or `app.jsx` or `index.tsx` or `layout.tsx` of `layout.jsx` file.

```bash
import { ReduxProvider } from 'rtk-ready';

export default function App({ Component, pageProps }) {
  return (
    <ReduxProvider>
      <Component {...pageProps} />
    </ReduxProvider>
  );
}
```

### Step 4: Using Typed Redux Hooks

With `rtk-ready`, you can use `useDispatch` and `useSelector` hooks that are typed for your Redux store.

```bash
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'rtk-ready/src/redux/types'; // Type for root state

const MyComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div>
      {user ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};
```

### Step 5: API Integration

`rtk-ready` includes a base API utility that simplifies API calls and dispatches actions to the Redux store. Create your own API slice by extending the `baseApi`.

```bash
// src/redux/api/myApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const myApi = createApi({
  reducerPath: 'myApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `user/${id}`,
    }),
  }),
});

export const { useGetUserQuery } = myApi;
```

Also you can use

```bash
  useDynamicMutation,
  useDynamicGetQuery,
  useLazyDynamicGetQuery,
```

from `/src/redux/api/dynamic/dynamicApi.ts` file.

Don't forget to add the API reducer to your store:

```bash
import { myApi } from '../redux/api/myApi';

const store = configureStore({
  reducer: {
    [myApi.reducerPath]: myApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(myApi.middleware),
});
```

## License

This project is licensed under the ISC License.

Contributing
If you would like to contribute, feel free to open an issue or submit a pull request. We welcome all contributions to help improve rtk-ready.
