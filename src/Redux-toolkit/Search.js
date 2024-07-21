import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchQuery: '' // Ensure the initial state key matches the state slice
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchQuery = action.payload; // Update state with payload
        }
    }
});

export const { setSearchTerm } = searchSlice.actions;

// Correct selector to match the state slice key
export const selectSearchTerm = (state) => state.search.searchQuery;

export default searchSlice.reducer;
