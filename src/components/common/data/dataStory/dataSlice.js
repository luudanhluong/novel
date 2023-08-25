import { createSlice } from "@reduxjs/toolkit"; 
 
const initialState = {
    loading: false,
    data: [],
    story: {},
    error: null,
}

const apiListStory = createSlice({
    name: 'listStory',
    initialState: initialState,
    reducers: {
        fetchStoryStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchStoriesSuccess: (state, action) => {
            state.loading = false; 
            state.data = action.payload; 
        },
        fetchStorySuccess: (state, action) => { 
            state.loading = false; 
            state.story = action.payload;
            
        },
        fetchStoryFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

const { reducer, actions } = apiListStory;
export const { fetchStoryStart, fetchStoriesSuccess, fetchStoryFailure, fetchStorySuccess } = actions;
export default reducer;