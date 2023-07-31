import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewList = ({ stories }) => {
    const navigate = useNavigate("")
    const [chapteres, setChapteres] = useState([])
    const header = { "content-type": "application/json", }
    useEffect(() => {
        fetch("http://localhost:9999/chapter")
            .then(res => res.json())
            .then(data => setChapteres(data.sort((a, b) => b['id'] - a['id'])))
    }, [])
    const handleOnclickRead = (e, story) => {
        if (chapteres.length === 0) {
            toast.warning("Truyện hiện đang cập nhật xin chờ thêm.")
        } else {
            const newViewStory = {
                ...story,
                view: story.view += 1
            }
            fetch("http://localhost:9999/Stories/" + story.id, {
                method: "PUT",
                body: JSON.stringify(newViewStory),
                headers: header
            })
            if (e.target.innerText === "Đọc từ đầu") {
                navigate(`/detail/${story.id}/chapter/${1}`)
            } else if (e.target.innerText === "Đọc mới nhất") {
                navigate(`/detail/${story.id}/chapter/${chapteres.length}`)
            }
        }
    }
    function countTime(pastTime) {
        let value = new Date() - new Date(pastTime);
        if (Math.floor((value / 3600) / 60) < 60) {
            if (Math.floor((value / 3600) / 60) === 0) {
                return `Vài giây trước`
            } else {
                return `${Math.floor((value / 3600) / 60)} phút trước`
            }
        } else if ((Math.floor((value / 3600) / 60 / 24)) < 24) {
            return `${(Math.floor((value / 3600) / 60 / 24))} giờ trước`
        } else if ((Math.floor((value / 3600) / 60 / 24 / 30)) < 30) {
            return `${(Math.floor((value / 3600) / 60 / 24 / 30))} ngày trước`
        } else if ((Math.floor((value / 3600) / 60 / 24 / 30 / 12) < 12)) {
            return `${(Math.floor((value / 3600) / 60 / 24 / 30 / 12))} tháng trước`
        } else {
            return `${(Math.floor((value / 3600) / 60 / 24 / 30 / 12 / 11))} năm trước`
        }
    }
    return (
        <Row>
            {
                stories.map(story => (
                    <Col key={story.id} xs={3}>
                        <Card className='card_slider'>
                            <Card.Body className='body_card_item'>
                                <Link to={`/detail/${story.id}`}>
                                    <Card.Img className="img_card_item" src={story.image} alt={story.name} />
                                </Link>
                                <Card.Subtitle className="name_card_item fs-6">{story.name}</Card.Subtitle>
                                <ul className="content_header m-0 p-0">
                                    {
                                        chapteres.map((chapter, index) => (
                                            chapter.storyId === story.id && index < 3
                                                ? (
                                                    <li key={chapter.id} className={`mx-0 lh-1`}>
                                                        <Link onClick={(e) => handleOnclickRead(e, story)} to={`/detail/${story.id}/chapter/${chapter.id}`} className="m-0 pe-2 text-decoration-none text-dark chapter_list_view name_chapter">Chương {chapter.id}{chapter.name === "" ? "" : ` - ${chapter.name}`}</Link>
                                                        <i className="m-0 time_update fw-lighter chapter_list_view_time">{countTime(chapter.date)}</i>
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