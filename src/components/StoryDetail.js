import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { ExclamationCircleFill, EyeFill, FileText, List, PersonFill, RssFill } from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import FormRate from "./FormRate";
import SplitNumber from "./common/utilities/SplitNumber";
import Time from "./UpdateTime";
import FormComment from "./FormComment";
import { DELETE, header, POST, PUT } from "./common/utilities/type";
import category from "./common/utilities/category";
import userLogedIn from "./user/userLogedIn";
import { useDispatch, useSelector } from "react-redux";
import rateAvg from "./common/utilities/rateAvg";
import { fetchChapterSuccess, setChapterNo } from "./common/data/dataChapter/dataSlice";
import ListChapter from "./common/listChapter/ListChapter";
import { fetchCategorySuccess } from "./common/data/dataCategory/dataSlice";


const StoryDetail = () => {
    const { sid } = useParams('')
    const dispatch = useDispatch();
    const navigate = useNavigate('')
    const [story, setStory] = useState({})
    const [rateStories, setRateStories] = useState([])
    const [followQuantity, setFollowQuantity] = useState([])
    const [followStory, setFollowStory] = useState({})
    const [rateNo, setRateNo] = useState(0)
    const [followStatus, setFollowStatus] = useState(0)
    const chapteres = useSelector(state => state.listChapter.data);
    const listCategories = useSelector(state => state.listCategory.data);
    const user = userLogedIn();
    const getRateNo = (value) => {
        setRateNo(value)
    }
    useEffect(() => {
        fetch("http://localhost:9999/Categories")
            .then(res => res.json())
            .then(data => dispatch(fetchCategorySuccess(data)))
    }, [sid])
    useEffect(() => {
        fetch("http://localhost:9999/chapter?storyId=" + sid)
            .then(res => res.json())
            .then(data => dispatch(fetchChapterSuccess(data)))
    }, [sid])
    useEffect(() => {
        fetch("http://localhost:9999/rateStory?rateStoryId=" + sid)
            .then(res => res.json())
            .then(data => setRateStories(data))
    }, [sid, rateNo])
    useEffect(() => {
        fetch("http://localhost:9999/Stories/" + sid)
            .then(res => res.json())
            .then(data => setStory(data))
    }, [sid])
    useEffect(() => {
        fetch("http://localhost:9999/followStory")
            .then(res => res.json())
            .then(data => setFollowQuantity(data.filter(d => d.storyId === parseInt(sid))))
    }, [followStatus, sid])
    useEffect(() => {
        if (user !== null) {
            fetch(`http://localhost:9999/followStory`)
                .then(res => res.json())
                .then(data => setFollowStory(data.find(d => d.userId === user.id && d.storyId === parseInt(sid))))
        }
    }, [followStatus, sid]);
    const handleOnclickRead = (e) => {
        const number = chapteres.length;
        if (number === 0) {
            toast.warning("Truyện hiện đang cập nhật xin chờ thêm.")
        } else {
            const newViewStory = {
                ...story,
                view: story.view += 1
            }
            fetch("http://localhost:9999/Stories/" + sid, {
                method: PUT,
                body: JSON.stringify(newViewStory),
                headers: header
            })
            if (e.target.innerText === "Đọc từ đầu") {
                navigate(`/detail/${sid}/chapter/${1}`)
            } else if (e.target.innerText === "Đọc mới nhất") {
                navigate(`/detail/${sid}/chapter/${number}`);
                dispatch(setChapterNo(number));
            }
        }
    }
    const handleFollow = (e) => {
        if (user === null) {
            navigate("/login")
        } else {
            setFollowStatus(parseInt(e.target.value) ? 0 : 1)
            const follower = {
                storyId: story.id,
                userId: user.id
            }
            if (e.target.innerText === "Theo dõi") {
                toast.success(`Bạn đã theo dõi truyện ${story.name}. Chúng tôi sẽ gửi thông báo cho bạn khi truyện cập nhật`)
                fetch("http://localhost:9999/followStory", {
                    method: POST,
                    body: JSON.stringify(follower),
                    headers: header
                })
            } else {
                toast.error(`Bạn đã hủy theo dõi truyện ${story.name}. Bạn sẽ không nhận thông báo từ chúng tôi nữa`)
                fetch("http://localhost:9999/followStory/" + followStory.id, {
                    method: DELETE
                })
            }
        }
    }
    return (
        <Row>
            <Col xs={12} className="text-center">
                <h3>{story.name}</h3>
                <p className="fst-italic fw-normal text-muted fs-14" >[Cập nhật lúc {Time(story.updateDate)}]</p>
            </Col>
            <Col xs={12}>
                <Row>
                    <Col xs={4} className="d-flex justify-content-end">
                        <img className="img_detail border border-dark" src={story.image} alt={story.name} />
                    </Col>
                    <Col xs={8} className="d-flex justify-content-start">
                        <ul className="">
                            <li className="d-flex">
                                <p className="m-0"><PersonFill size={28} /></p>
                                <p className="story_detail_item m-0 item_primary">Tác giả:</p>
                                <p className="story_detail_item m-0">{story.author}</p>
                            </li>
                            <li className="d-flex ">
                                <p className="m-0"><ExclamationCircleFill size={24} /></p>
                                <p className="story_detail_item m-0 item_primary">Tình Trạng:</p>
                                <p className="story_detail_item m-0">{story.status}</p>
                            </li>
                            <li className="d-flex ">
                                <p className="m-0"><RssFill size={24} /></p>
                                <p className="story_detail_item m-0 item_primary">Thể loại:</p>
                                <p className="story_detail_item m-0">{category(listCategories, story)}</p>
                            </li>
                            <li className="d-flex ">
                                <p className="m-0"><EyeFill size={24} /></p>
                                <p className="story_detail_item m-0 item_primary">Lượt xem:</p>
                                <p className="story_detail_item m-0">{SplitNumber(parseInt(story.view))}</p>
                            </li>
                            <li className="d-flex ">
                                <p className="story_detail_item m-0 text-primary">{story.name}<small className="story_detail_item m-0">Xếp hạng: {rateAvg(rateStories)}/5-{rateStories.length} Lượt đánh giá.</small></p>
                            </li>
                            <li className="d-flex ">
                                <FormRate sid={sid} onchangeRateNo={getRateNo} story={story} />
                            </li>
                            <li className="d-flex ">
                                {
                                    user === null ? "" : (<Button onClick={(e) => handleFollow(e)} value={followStatus} className={`m-0 p-0 px-3 pt-1 pb-1 mb-2 btn-danger`}>{typeof followStory !== "undefined" ? Object.keys(followStory).length === 0 ? "Theo dõi" : "Bỏ theo dõi" : "Theo dõi"}</Button>)
                                }
                                <p className="story_detail_item m-0 text-dark">{SplitNumber(60830 + followQuantity.length)}</p>
                                <p className="story_detail_item m-0">Người Đã Theo Dõi</p>
                            </li>
                            <li className="d-flex ">
                                <p>
                                    <Button onClick={(e) => handleOnclickRead(e)} className="bg-warning border-0 me-2">Đọc từ đầu</Button>
                                    <Button onClick={(e) => handleOnclickRead(e, story)} className="bg-warning border-0 ms-2">Đọc mới nhất</Button>
                                </p>
                            </li>
                        </ul>
                    </Col>
                    <Col xs={12}>
                        <Row className="d-flex justify-content-end">
                            <Col xs={12} className={""}>
                                <div className="fw-normal mt-2 pb-1 d-flex border-1 border-top border-info">
                                    <p>
                                        {story.description}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12}>
                        <Row>
                            <ListChapter sid={sid} />
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <FormComment sid={sid} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default StoryDetail;