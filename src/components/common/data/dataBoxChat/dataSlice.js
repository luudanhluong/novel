import { createSlice } from "@reduxjs/toolkit";
import { header, POST, PUT } from "../../utilities/type";

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
        postFeedback: (state, action) => {
            fetch("http://localhost:9999/feedback", {
                method: POST,
                body: JSON.stringify({
                    ...action.payload,
                    timeFeedback: new Date()
                }),
                headers: header,
            });
        },
        deleteFeedback: (state, action) => {
            fetch("http://localhost:9999/feedback/" + action.payload.id, {
                method: PUT,
                body: JSON.stringify({
                    storyId: action.payload.storyId,
                    userId: action.payload.userId,
                    feedback: action.payload.feedback,
                    timeFeedback: action.payload.timeFeedback,
                    type: "reject",
                    id: action.payload.id
                }),
                headers: header
            });
            state.data = state.data.map(d => {
                if (action.payload.id === d.id) {
                    return { 
                        ...d,
                        userId: action.payload.userId,
                        type: "reject", 
                    }
                }
                return d;
            });
        },
        fetchFeedbackFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

const { reducer, actions } = apiListFeedback;
export const { fetchFeedbackStart, fetchFeedbackSuccess, fetchFeedbackFailure, postFeedback, deleteFeedback } = actions;
export default reducer;