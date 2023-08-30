import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFeedbackSuccess } from "../../../components/common/data/dataBoxChat/dataSlice";
import { fetchUserSuccess } from "../../../components/common/data/dataUser/dataSlice";


const FetchData = (listFeedback, sid, value) => { 
    const dispatch = useDispatch();
    useEffect(() => {
        fetch("http://localhost:9999/feedback")
            .then(res => res.json())
            .then(data => dispatch(fetchFeedbackSuccess(data.filter(d => d.storyId === parseInt(sid)))));
    }, [value, sid, dispatch]);
    useEffect(() => {
        fetch("http://localhost:9999/Users")
            .then(res => res.json())
            .then(data => dispatch(fetchUserSuccess(data.filter(d => {
                const id = new Set(listFeedback.map(fb => fb.userId));
                const newList = [...id];
                return newList.includes(d.id)
            }))));
    }, [listFeedback, dispatch]);
}
 
export default FetchData;