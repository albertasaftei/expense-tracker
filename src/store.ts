import { configureStore } from '@reduxjs/toolkit'
import homepageSlice from './containers/Homepage/homepageSlice'
import appSlice from './appSlice'
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedHomeReducer = persistReducer(persistConfig, homepageSlice);


export const store = configureStore({
    reducer: {
        app: appSlice,
        homepage: persistedHomeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch