import { createSlice } from "@reduxjs/toolkit";
import { header, PUT } from "../../utilities/type";

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
        completedStory: (state, action) => {
            const story = JSON.parse(action.payload);
            fetch("http://localhost:9999/Stories/" + story.id, {
                method: PUT,
                body: JSON.stringify({
                    ...story,
                    publishedDate: new Date(),
                    status: "Đã hoàn thành",
                }),
                headers: header,
            });
            state.data = state.data.map(d => {
                if (d.id === story.id) {
                    return {
                        ...story,
                        status: "Đã hoàn thành",
                    };
                }
                return d;
            });
        },
        updateViewStory: (state, action) => {
            const story = action.payload;
            console.log(story);
            fetch("http://localhost:9999/Stories/" + story.id, {
                method: PUT,
                body: JSON.stringify({
                    id: story.id,
                    name: story.name,
                    status: story.status,
                    categoryId: story.categoryId,
                    author: story.author,
                    description: story.description,
                    userId: story.userId,
                    image: story.image,
                    publishedDate: story.publishedDate,
                    updateDate: story.updateDate,
                    view: story.view + 1,
                    active: story.active,
                }),
                headers: header,
            })
                .catch(() => {
                    throw new Error("Không tìm thấy link");
                });
            state.data = state.data.map(d => {
                if (d.id === story.id) {
                    return {
                        ...story,
                        view: story.view + 1,
                    };
                }
                return d;
            });
        },
    },
});

const { reducer, actions } = apiListStory;
export const { fetchStoryStart, fetchStoriesSuccess, fetchStoryFailure, fetchStorySuccess, completedStory, updateViewStory } = actions;
export default reducer;