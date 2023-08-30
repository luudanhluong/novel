import userLogedIn from "../../../components/user/userLogedIn";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategorySuccess } from "../../../components/common/data/dataCategory/dataSlice";
import { fetchFollowSuccess } from "../../../components/common/data/dataFollow/dataSlice";
import { fetchStoriesSuccess } from "../../../components/common/data/dataStory/dataSlice";
import { fetchRateSuccess } from "../../../components/common/data/dataRate/dataSlice";

const FetChData = () => {

    const dispatch = useDispatch();
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
    }, [dispatch]);
    useEffect(() => {
        fetch("http://localhost:9999/Categories")
            .then(res => res.json())
            .then(data => {
                const action = fetchCategorySuccess(data);
                dispatch(action)
            })
            .catch(() => {
                throw new Error("Network response was not ok");
            })
    }, [dispatch]);
    useEffect(() => {
        fetch("http://localhost:9999/followStory")
            .then(res => res.json())
            .then(data => {
                const action = fetchFollowSuccess(data);
                dispatch(action)
            })
            .catch(() => {
                throw new Error("Network response was not ok");
            })
    }, [dispatch]);
    useEffect(() => {
        fetch("http://localhost:9999/rateStory")
            .then(res => res.json())
            .then(data => {
                const action = fetchRateSuccess(data);
                dispatch(action)
            })
            .catch(() => {
                throw new Error("Network response was not ok");
            })
    }, [dispatch]);
}

export default FetChData;