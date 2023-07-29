import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const ListChapter = ({ sid }) => {
    const [chapteres, setChapteres] = useState([])
    useEffect(() => {
        fetch("http://localhost:9999/chapter?rateStoryId=" + sid)
            .then(res => res.json())
            .then(data => setChapteres(data.sort((a, b) => b['id'] - a['id'])))
    }, [sid])
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
            <Col xs={12}>
                <ul className="d-flex content_header mt-2 pb-2 border-3 border-bottom border-info">
                    <li><List color="deepskyblue" size={24} /></li>
                    <li className="content_header_detail">DANH SACH CHUONG</li>
                </ul>
            </Col>
            {
                chapteres.length > 0 ?
                    (
                        <Col xs={12}>
                            <Row className="mb-3 pt-2 pb-2 px-4">
                                <Col xs={8}>
                                    <p className="m-0 content_header_item">Số Chương</p>
                                </Col>
                                <Col xs={4}>
                                    <p className="m-0 content_header_item">Cập nhật</p>
                                </Col>
                            </Row>
                            <ul className="content_header border mb-5 p-0">
                                {
                                    chapteres.map((chapter, index) => (
                                        <li className={`Content_header_List_item pt-2 pb-2 mx-4 px-2 ${index === chapteres.length - 1 ? "last_item" : ""}`}>
                                            <Row>
                                                <Col xs={8}>
                                                    <p className="m-0">
                                                        <Link className="name_chapter text-dark" to={`/detail/${sid}/chapter/${chapter.id}`}>Chương {chapter.id}{chapter.name === "" ? "" : ` - ${chapter.name}`}</Link>
                                                    </p>
                                                </Col>
                                                <Col xs={4}>
                                                    <p className="m-0 time_update">{countTime(chapter.date)}</p>
                                                </Col>
                                            </Row>
                                        </li>
                                    ))
                                }
                            </ul>
                        </Col>
                    ) :
                    (
                        <Row>
                            <Col xs={12} className="text-center border-0">
                                <h2 className="m-0">
                                    Đang Cập Nhật
                                </h2>
                            </Col>
                        </Row>
                    )
            }

        </Row>
    );
}

export default ListChapter;