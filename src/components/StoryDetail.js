import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { ExclamationCircleFill, EyeFill, FileText, PersonFill, TagsFill } from 'react-bootstrap-icons'
import FormRate from "./FormRate";
import ListChapter from "./ListChapter";
const StoryDetail = ({ sid }) => {
    const [story, setStory] = useState({})
    const [categories, setCategories] = useState([])
    const [rateStories, setRateStories] = useState([])
    const [rateNo, setRateNo] = useState(0)
    let storyCategory = "";
    if (typeof story.categoryId !== 'undefined') {
        categories.map(category => {
            return story.categoryId.map((s, i) => {
                if (category.id === s && i < story.categoryId.length - 1) {
                    storyCategory += category.name + " - "
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
            return accumulator += parseInt(rateStory.rateNo);
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
    return (
        <Row>
            <Col xs={12} className="text-center">
                <h3>{story.name}</h3>
                <p >[Cập nhật lúc {story.updateTime}]</p>
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
                                <p class="story_detail_item m-0 text-primary">{storyCategory}</p>
                            </li>
                            <li className="d-flex ">
                                <p className="m-0"><EyeFill size={24} /></p>
                                <p class="story_detail_item m-0 item_primary">Lượt xem:</p>
                                <p class="story_detail_item m-0">1.200.222 </p>
                            </li>
                            <li className="d-flex ">
                                <p className="story_detail_item m-0 text-primary">{story.name}<small class="story_detail_item m-0">Xếp hạng: {typeof results === "undefined" ? 0 : results}/5-{rateStories.length} Lượt đánh giá.</small></p>
                            </li>
                            <li className="d-flex ">
                                <FormRate sid={sid} onchangeRateNo={getRateNo} />
                            </li>
                            <li className="d-flex ">
                                <p class="story_detail_item m-0 text-dark">60.830</p>
                                <p class="story_detail_item m-0">Người Đã Theo Dõi</p>
                            </li>
                            <li className="d-flex ">
                                <p><Button className="bg-warning border-0">Đọc từ đầu</Button> <Button className="bg-warning border-0">Đọc mới nhất</Button></p>
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
                            <Col xs={12}>
                                <span>{story.description}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12}>
                        <ListChapter sid={sid} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default StoryDetail;