import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setFormValue } from "./storySlice";

const FetchData = (sid) => {
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        if (sid) {
            fetch("http://localhost:9999/Stories")
                .then(res => res.json())
                .then(data => {
                    const action = setFormValue(data.find(d => d.id === parseInt(sid)));
                    dispatch(action);
                })
                .catch(() => {
                    throw new Error("Get error at edit!");
                })
        } else {
            const action = setFormValue({
                name: '',
                status: 'Đang cập nhật',
                categoryId: [],
                author: '',
                description: '',
                userId: '',
                image: '',
                createDate: '',
                updateDate: '',
                view: 0,
                active: 0
            });
            dispatch(action);
        }
    }, [location, dispatch, sid])
}

export default FetchData;