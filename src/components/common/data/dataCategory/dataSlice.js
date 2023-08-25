import { createSlice } from "@reduxjs/toolkit"; 
 
const initialState = {
    loading: false,
    data: [],
    error: null,
}

const apiListCategory = createSlice({
    name: 'listCategory',
    initialState: initialState,
    reducers: {
        fetchCategoryStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCategorySuccess: (state, action) => {
            state.loading = false; 
            state.data = action.payload;
            
        },
        fetchCategoryFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

const { reducer, actions } = apiListCategory;
export const { fetchCategoryStart, fetchCategorySuccess, fetchCategoryFailure } = actions;
export default reducer;