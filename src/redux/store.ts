import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './indexSlice';


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;

export default store;