import { createSlice } from "@reduxjs/toolkit"; 
import { header, POST } from "../../../Type";
 
const initialState = {
    loading: false,
    data: [],
    error: null,
}

const apiListFeedback = createSlice({
    name: 'listFeedback',
    initialState: initialState,
    reducers: {
        fetchFeedbackStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchFeedbackSuccess: (state, action) => {
            state.loading = false; 
            state.data = action.payload;
            
        }, 
        postFeedback: (state ,action) => {  
            fetch("http://localhost:9999/feedback", {
                method: POST,
                body: JSON.stringify({
                    ...action.payload,
                    timeFeedback: new Date()
                }),
                headers: header,
            })
            
        },
        fetchFeedbackFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

const { reducer, actions } = apiListFeedback;
export const { fetchFeedbackStart, fetchFeedbackSuccess, fetchFeedbackFailure, postFeedback } = actions;
export default reducer;