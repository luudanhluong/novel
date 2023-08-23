import {configureStore} from '@reduxjs/toolkit';
import storyReducer from "../components/author/AddEditStory/storySlice"
import userReducer from "../components/user/userSlice" 
import listStoryReducer from "../components/common/api/dataStory/dataSlice"
import listCategoryReducer from "../components/common/api/dataCategory/dataSlice"
import listFollowReducer from "../components/common/api/dataFollow/dataSlice"
import listRateReducer from "../components/common/api/dataRate/dataSlice"
import feedbackReducer from "../screens/user/feedback/feedbackSlice"
import listFeedbackReducer from "../components/common/api/dataFeedback/dataSlice"
import listUserReducer from "../components/common/api/dataUser/dataSlice"
const rootReducer = {
    story: storyReducer,
    user: userReducer,
    listStory: listStoryReducer,
    listCategory: listCategoryReducer,
    listFollow: listFollowReducer,
    listRate: listRateReducer,
    feedback: feedbackReducer,
    listFeedback: listFeedbackReducer,
    listUser: listUserReducer,
};

const store = configureStore ({
    reducer: rootReducer,
});

export default store;