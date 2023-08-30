import { createSlice } from "@reduxjs/toolkit";
import { header, POST, PUT } from "../../common/utilities/type";

const initialState = {
    name: '',
    status: 'Đang cập nhật',
    categoryId: [],
    author: '',
    description: '',
    userId: '',
    image: '',
    publishedDate: '',
    updateDate: '',
    view: 0,
    active: 0
};

const story = createSlice({
    name: 'story',
    initialState: initialState,
    reducers: {
        addStory: (state, action) => {
            fetch("http://localhost:9999/Stories", {
                method: POST,
                body: JSON.stringify({
                    ...state,
                    userId: action.payload,
                    publishedDate: "",
                    updateDate: new Date(),
                }),
                headers: header,
            })
        },
        updateStory: (state, action) => {
            fetch("http://localhost:9999/Stories/" + action.payload, {
                method: PUT,
                body: JSON.stringify({
                    ...state,
                    publishedDate: "",
                    updateDate: new Date(),
                }),
                headers: header,
            })
            .catch(()=> {
                throw new Error("Không tìm thấy link");
            });
        }, 
        setFormValue: (state, action) => {
            state.name = action.payload.name;
            state.categoryId = action.payload.categoryId;
            state.author = action.payload.author;
            state.description = action.payload.description;
            state.userId = action.payload.userId;
        },
        setDesciption: (state, action) => {
            state.description = action.payload;
        },
        updateStatus: (state, action) => {
            state.description = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setAuthor: (state, action) => {
            state.author = action.payload;
        },
        setImage: (state, action) => {
            state.image = action.payload;
        },
        setCategoryId: (state, action) => {
            const categoryIdIndex = state.categoryId.indexOf(+action.payload);
            if (categoryIdIndex === -1) {
                state.categoryId.push(+action.payload);
                state.categoryId.sort((a, b) => a - b);
            } else {
                state.categoryId.splice(categoryIdIndex, 1);
            }
        },
    }
})

const { reducer, actions } = story
export const { addStory, setDesciption, setName, setAuthor, setImage, setCategoryId, setFormValue, updateStory } = actions
export default reducer;