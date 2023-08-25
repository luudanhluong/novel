import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    value: "",
    scroll: 20,
};

const feedback = createSlice({
    name: "feedback",
    initialState: initialState,
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload;
        },
        setScrollValue: (state, action) => {
            state.scroll = action.payload;
        }
    }
});

const { reducer, actions } = feedback;
export const { setValue, setScrollValue } = actions;
export default reducer;

