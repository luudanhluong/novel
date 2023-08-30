import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChapterSuccess } from "../../components/common/data/dataChapter/dataSlice";
import { fetchContentSuccess } from "../../components/common/data/dataContent/dataSlice";
import { fetchStorySuccess } from "../../components/common/data/dataStory/dataSlice";

const FetchData = (sid, cid) => {
    const dispatch = useDispatch();
    const chapterNo = useSelector(state => state.listChapter.chapterNo);
    useEffect(() => {
        fetch(`http://localhost:9999/chapter?storyId=${+sid}`)
            .then(res => res.json())
            .then(data => dispatch(fetchChapterSuccess(data.filter(d => d.active))));
    }, [sid, dispatch]);
    useEffect(() => {
        fetch(`http://localhost:9999/chapterContent`)
            .then(res => res.json())
            .then(data => dispatch(fetchContentSuccess(data.find(d => d.chapterId === +cid && d.storyId === +sid))));
    }, [sid, dispatch, chapterNo, cid]);
    useEffect(() => {
        fetch(`http://localhost:9999/Stories/${sid}`)
            .then(res => res.json())
            .then(data => dispatch(fetchStorySuccess(data)));
    }, [sid, dispatch]);
}

export default FetchData;