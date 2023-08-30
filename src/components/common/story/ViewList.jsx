import { useEffect, useMemo, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchChapterSuccess } from "../data/dataChapter/dataSlice";
import { fetchStoriesSuccess, updateViewStory } from "../data/dataStory/dataSlice";
import CalTime from "../utilities/calTime";

const ViewList = ({ sort, categoryValue, statusValue }) => {
    const dispatch = useDispatch()
    const listStory = useSelector(state => state.listStory.data);
    const listChapter = useSelector(state => state.listChapter.data);
    const [follows, setFollows] = useState([]);
    const [replies, setReplies] = useState([]);
    const [comments, setComments] = useState([]);
    const [categoryId, setCategoryId] = useState('0');
    const [statusId, setStatusId] = useState('1');
    useEffect(() => {
        fetch("http://localhost:9999/Stories")
            .then(res => res.json())
            .then(data => dispatch(fetchStoriesSuccess(data.filter(d => {
                if (categoryId === '0' || typeof categoryValue === "undefined" || statusId === "0") {
                    if (statusId === "1") {
                        return d && d.active === 1;
                    } else if (statusId === "2") {
                        return d.status === "Đã hoàn thành" && d.active === 1;
                    } else if (statusId === "3") {
                        return d.status === "Đang cập nhật" && d.active === 1;
                    }
                    return d && d.active === 1;
                } else {
                    if (statusId === "1") {
                        return d && d.categoryId.includes(categoryId) && d.active === 1;
                    } else if (statusId === "2") {
                        return d.status === "Đã hoàn thành" && d.categoryId.includes(categoryId) && d.active === 1;
                    } else if (statusId === "3") {
                        return d.status === "Đang cập nhật" && d.categoryId.includes(categoryId) && d.active === 1;
                    }
                    return d.categoryId.includes(categoryId) && d.active === 1;
                }
            }))));
    }, [categoryId, categoryValue, statusId, dispatch]);
    useEffect(() => {
        setCategoryId(categoryValue)
        setStatusId(statusValue)
    }, [categoryValue, statusValue, dispatch])
    useEffect(() => {
        fetch("http://localhost:9999/chapter")
            .then(res => res.json())
            .then(data => dispatch(fetchChapterSuccess(data.sort((a, b) => b['id'] - a['id']))));
    }, [dispatch])
    useEffect(() => {
        fetch("http://localhost:9999/followStory")
            .then(res => res.json())
            .then(data => setFollows(data))
    }, [])
    useEffect(() => {
        fetch("http://localhost:9999/replies")
            .then(res => res.json())
            .then(data => setReplies(data))
    }, [])
    useEffect(() => {
        fetch("http://localhost:9999/comments")
            .then(res => res.json())
            .then(data => setComments(data))
    }, [])

    const listStoryCopy = listStory.map(story => {
        return {
            ...story,
            chapters: [],
            chapterQtt: 0,
            followQtt: 0,
            comment: 0,
        }
    });
    const stories = listStoryCopy.map(story => {
        story.chapters = listChapter.filter(chapter => chapter.storyId === story.id && chapter.active).slice(0, 3);
        story.chapterQtt = listChapter.reduce((acc, chapter) => {
            if (chapter.storyId === story.id && chapter.active) {
                acc++;
            }
            return acc;
        }, 0);
        story.followQtt = follows.reduce((acc, follow) => {
            if (follow.storyId === story.id) {
                acc++;
            }
            return acc;
        }, 0);
        story.comment = comments.reduce((acc, comment) => {
            let reply = replies.reduce((acc, reply) => {
                if (reply.commentId === comment.id) {
                    acc++;
                }
                return acc;
            }, 0);
            if (comment.storyId === story.id) {
                acc += 1 + reply;
            }
            return acc;
        }, 0);
        return story;
    });
    useMemo(() => {
        stories.sort((a, b) => {
            if (sort === "1") {
                return new Date(a["publishedDate"]) - new Date(b["publishedDate"])
            } else if (sort === "2") {
                return new Date(a["publicDate"]) - new Date(b["publicDate"])
            } else if (sort === "3") {
                return b["view"] - a["view"]
            } else if (sort === "4") {
                return b["followQtt"] - a["followQtt"]
            } else if (sort === "5") {
                return b["comment"] - a["comment"]
            } else if (sort === "6") {
                return b["chapterQtt"] - a["chapterQtt"]
            }
            return true;
        });
    }, [sort, listChapter]);
    return (
        <Row>
            {
                stories.map(story => (
                    <Col key={story.id} xs={3}>
                        <Card className='card_slider'>
                            <Card.Body className='body_card_item'>
                                <Link to={`/detail/${story.id}`}>
                                    <Card.Img className="img_card_item border border-dark" src={story.image} alt={story.name} />
                                </Link>
                                <Card.Subtitle className="name_card_item fs-6">{story.name}</Card.Subtitle>
                                <ul className="content_header m-0 p-0">
                                    {
                                        story.chapters.map((chapter) => (
                                            1
                                                ? (
                                                    <li key={chapter.id} className={`mx-0 lh-1`}> 
                                                        <span onClick={() => dispatch(updateViewStory(story))}>
                                                            <Link to={`/detail/${story.id}/chapter/${chapter.id}`} className="m-0 pe-2 text-decoration-none text-dark chapter_list_view name_chapter">
                                                                Chương {chapter.chapterNo}{chapter.name === "" ? "" : ` - ${chapter.name}`}
                                                            </Link>
                                                        </span>
                                                        <i className="m-0 time_update fw-lighter chapter_list_view_time">
                                                            {CalTime(chapter.publishedDate)}
                                                        </i>
                                                    </li>
                                                ) : ""
                                        ))
                                    }
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            }
        </Row>
    );
}

export default ViewList;