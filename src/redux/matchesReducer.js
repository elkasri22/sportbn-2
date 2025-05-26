import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    loading: true,
    matches: [],
    currentTypeSport: localStorage.getItem("c_t_s") || "all",
};

export const WebSocketMatchesReducer = createSlice({
    name: "WebSocketMatches",
    initialState,
    reducers: {
        changeTypeSport: (state, action) => {
            state.currentTypeSport = action.payload;
            localStorage.setItem("c_t_s", action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase('WebSocketMatches/watchingWebSocketMatches', (state, action) => {
            state.loading = false;
            state.matches = action.payload;
        });
    }
})

// Action creators are generated for each case reducer function
export const { changeTypeSport } = WebSocketMatchesReducer.actions;

export default WebSocketMatchesReducer.reducer