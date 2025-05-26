
import { configureStore } from '@reduxjs/toolkit';
import WebSocketMatchesReducer from './matchesReducer';

export const store = configureStore({
    reducer: {
        WebSocketMatches: WebSocketMatchesReducer,
    }
});