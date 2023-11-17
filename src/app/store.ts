import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import disasterReducer from '../features/slice/disasterSlice';
import userReducer from '../features/slice/UserinfoSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Persist의 설정
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  disaster: disasterReducer,
  userReducer: userReducer,
});

// rootReducer를 persistReducer로 감싸서 Redux-Persist를 사용하도록 설정
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/PURGE'],
      },
    }),
});

// 옵셔널, refetchOnFocus/refetchOnReconnect 기능을 위해 필요함
setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;