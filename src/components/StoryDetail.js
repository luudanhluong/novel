import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ExclamationCircleFill, EyeFill, FileText, PersonFill, TagsFill } from 'react-bootstrap-icons'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import FormRate from "./FormRate";
import ListChapter from "./ListChapter";
import SplitNumber from "./SplitNumber";
import Time from "./UpdateTime";
import StoryDescription from "./StoryDescription";
const StoryDetail = () => {
    const { sid } = useParams('')
    const navigate = useNavigate('')
    const [story, setStory] = useState({})
    const [categories, setCategories] = useState([])
    const [rateStories, setRateStories] = useState([])
    const [chapteres, setChapteres] = useState([])
    const [followQuantity, setFollowQuantity] = useState([])
    const [followStory, setFollowStory] = useState({})
    const [rateNo, setRateNo] = useState(0)
    const [followStatus, setFollowStatus] = useState(0)
    const user = JSON.parse(localStorage.getItem("user"))
    const header = { "content-type": "application/json", }
    let storyCategory = "";
    if (typeof story.categoryId !== 'undefined') {
        categories.map(category => {
            return story.categoryId.map((s, i) => {
                if (category.id === s && i < story.categoryId.length - 1) {
                    storyCategory += category.name + ", "
                } else if (category.id === s && i < story.categoryId.length) {
                    storyCategory += category.name
                }
                return storyCategory
            })
        })
    }
    let results
    if (rateStories.length >= 1) {
        let totalRate = rateStories.reduce((accumulator, rateStory) => {
            accumulator += parseInt(rateStory.rateNo);
            return accumulator;
        }, 0)
        let avgRate = totalRate / rateStories.length
        if (avgRate % 1 >= 0.5) {
            results = Math.ceil(avgRate);
        } else if (avgRate % 1 < 0.5) {
            results = Math.floor(avgRate);
        } else if (avgRate % 1 === 0) {
            results = avgRate;
        }
    }
    const getRateNo = (value) => {
        setRateNo(value)
    }
    useEffect(() => {
        fetch("http://localhost:9999/chapter?storyId=" + sid)
            .then(res => res.json())
            .then(data => setChapteres(data))
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
        fetch("http://localhost:9999/Categories")
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])
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
    }, [followStatus, sid])
    const handleOnclickRead = (e) => {
        if (chapteres.length === 0) {
            toast.warning("Truyện hiện đang cập nhật xin chờ thêm.")
        } else {
            const newViewStory = {
                ...story,
                view: story.view += 1
            }
            fetch("http://localhost:9999/Stories/" + sid, {
                method: "PUT",
                body: JSON.stringify(newViewStory),
                headers: header
            })
            if (e.target.innerText === "Đọc từ đầu") {
                navigate(`/detail/${sid}/chapter/${1}`)
            } else if (e.target.innerText === "Đọc mới nhất") {
                navigate(`/detail/${sid}/chapter/${chapteres.length}`)
            }
        }
    }
    const handleFollow = (e) => {
        setFollowStatus(parseInt(e.target.value) ? 0 : 1)
        const follower = {
            storyId: story.id,
            userId: user.id
        }
        if (typeof followStory === "undefined") {
            toast.success(`Bạn đã theo dõi truyện ${story.name}. Chúng tôi sẽ gửi thông báo cho bạn khi truyện cập nhật`)
            fetch("http://localhost:9999/followStory", {
                method: "POST",
                body: JSON.stringify(follower),
                headers: header
            })
        } else {
            toast.error(`Bạn đã hủy theo dõi truyện ${story.name}. Bạn sẽ không nhận thông báo từ chúng tôi nữa`)
            fetch("http://localhost:9999/followStory/" + followStory.id, {
                method: "DELETE"
            })
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
                        <img className="img_detail" src={story.image} alt={story.name} />
                    </Col>
                    <Col xs={8} className="d-flex justify-content-start">
                        <ul className="">
                            <li className="d-flex">
                                <p className="m-0"><PersonFill size={28} /></p>
                                <p class="story_detail_item m-0 item_primary">Tác giả:</p>
                                <p class="story_detail_item m-0">{story.author}</p>
                            </li>
                            <li className="d-flex ">
                                <p className="m-0"><ExclamationCircleFill size={24} /></p>
                                <p class="story_detail_item m-0 item_primary">Tình Trạng:</p>
                                <p class="story_detail_item m-0">{story.status}</p>
                            </li>
                            <li className="d-flex ">
                                <p className="m-0"><TagsFill size={24} /></p>
                                <p class="story_detail_item m-0 item_primary">Thể loại:</p>
                                <p class="story_detail_item m-0">{storyCategory}</p>
                            </li>
                            <li className="d-flex ">
                                <p className="m-0"><EyeFill size={24} /></p>
                                <p class="story_detail_item m-0 item_primary">Lượt xem:</p>
                                <p class="story_detail_item m-0">{SplitNumber(parseInt(story.view))}</p>
                            </li>
                            <li className="d-flex ">
                                <p className="story_detail_item m-0 text-primary">{story.name}<small class="story_detail_item m-0">Xếp hạng: {typeof results === "undefined" ? 0 : results}/5-{rateStories.length} Lượt đánh giá.</small></p>
                            </li>
                            <li className="d-flex ">
                                <FormRate sid={sid} onchangeRateNo={getRateNo} story={story} />
                            </li>
                            <li className="d-flex ">
                                <Button onClick={(e) => handleFollow(e)} value={followStatus} className={`m-0 p-0 px-3 pt-1 pb-1 mb-2 btn-danger`}>{typeof followStory === "undefined" ? "Theo dõi" : "Bỏ theo dõi"}</Button>
                                <p class="story_detail_item m-0 text-dark">{SplitNumber(60830 + followQuantity.length)}</p>
                                <p class="story_detail_item m-0">Người Đã Theo Dõi</p>
                            </li>
                            <li className="d-flex ">
                                <p><Button onClick={(e) => handleOnclickRead(e)} className="bg-warning border-0">Đọc từ đầu</Button> <Button onClick={(e) => handleOnclickRead(e, story)} className="bg-warning border-0">Đọc mới nhất</Button></p>
                            </li>
                        </ul>
                    </Col>
                    <Col xs={12}>
                        <Row className="d-flex justify-content-end">
                            <Col xs={12}>
                                <ul className="d-flex content_header pb-2 mt-4 border-3 border-bottom border-info">
                                    <li><FileText color="deepskyblue" size={24} /></li>
                                    <li className="content_header_detail">NOI DUNG</li>
                                </ul>
                            </Col>
                            <Col xs={12} className={"position-relative"}>
                                <StoryDescription  sid={sid} story={story}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12}>
                        <ListChapter sid={sid} handleOnclickRead={handleOnclickRead} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default StoryDetail;