// import { createSlice } from "@reduxjs/toolkit"; 
 
// const initialState = {
//     loading: false,
//     data: [],
//     error: null,
// }

// const apiListStory = createSlice({
//     name: 'listMyStory',
//     initialState: initialState,
//     reducers: {
//         fetchStoryStart: (state) => {
//             state.loading = true;
//             state.error = null;
//         },
//         fetchStorySuccess: (state, action) => {
//             state.loading = false; 
//             state.data = action.payload;
            
//         },
//         fetchStoryFailure: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//     },
// });

// const { reducer, actions } = apiListStory;
// export const { fetchStoryStart, fetchStorySuccess, fetchStoryFailure } = actions;
// export default reducer;