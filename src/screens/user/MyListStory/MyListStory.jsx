import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultTemplate from "../../../templates/DefaultTemplate";
import ListStory from "../../../components/author/myListStory/ListStory"
import userLogedIn from "../../../components/user/userLogedIn";
import { fetchCategorySuccess } from "../../../components/common/data/dataCategory/dataSlice";
import { fetchFollowSuccess } from "../../../components/common/data/dataFollow/dataSlice";
import { fetchStoriesSuccess } from "../../../components/common/data/dataStory/dataSlice";
import { fetchRateSuccess } from "../../../components/common/data/dataRate/dataSlice";
const MyListStory = () => {
    const dispatch = useDispatch();
    const listStories = useSelector(state => state.listStory.data);
    const listCategories = useSelector(state => state.listCategory.data);
    const listFollows = useSelector(state => state.listFollow.data);
    const listRate = useSelector(state => state.listRate.data);
    const user = userLogedIn();
    useEffect(() => {
        fetch("http://localhost:9999/Stories")
            .then(res => res.json())
            .then(data => {
                const action = fetchStoriesSuccess(data.filter(d => d.userId === user.id));
                dispatch(action)
            })
            .catch(() => {
                throw new Error("Network response was not ok");
            })
    }, [dispatch, user]);
    useEffect(() => {
        fetch("http://localhost:9999/Categories")
            .then(res => res.json())
            .then(data => {
                const action = fetchCategorySuccess(data);
                dispatch(action)
            })
    }, [dispatch]);
    useEffect(() => {
        fetch("http://localhost:9999/followStory")
            .then(res => res.json())
            .then(data => {
                const action = fetchFollowSuccess(data);
                dispatch(action)
            })
    }, [dispatch]);
    useEffect(() => {
        fetch("http://localhost:9999/rateStory")
            .then(res => res.json())
            .then(data => {
                const action = fetchRateSuccess(data);
                dispatch(action)
            })
    }, [dispatch]);
    
    return (
        <DefaultTemplate>
            <ListStory listStories={listStories} listCategories={listCategories} listFollows={listFollows} listRate={listRate} />
        </DefaultTemplate>
    );
}

export default MyListStory;