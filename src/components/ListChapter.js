import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Measure from "react-measure";
import { List, Plus } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import CalTime from "./CalTime";

const ListChapter = ({ sid, handleOnclickRead }) => { 
    const [chapteres, setChapteres] = useState([])
    const [heightValue, setHeightValue] = useState(0)
    const [heightStatus, setHeightStatus] = useState(0)
    useEffect(() => {
        fetch("http://localhost:9999/chapter?storyId=" + sid)
            .then(res => res.json())
            .then(data => setChapteres(data.sort((a, b) => b['id'] - a['id'])))
    }, [sid])
    const handleMeasure = (contentRect) => {
        setHeightValue(contentRect.bounds.height)
    };
    useEffect(() => {
        setHeightValue(0)
        setHeightStatus(0)
    }, [sid])
    return (
        <Row>
            <Col xs={12}> 
                <h3 className="fw-normal text-info mt-2 pb-1 d-flex border-3 border-bottom border-info">
                    <p className="m-0 ps-4"><List size={28} /></p>
                    <p className="m-0 lh-base ms-1">Danh Sách Chương</p>
                </h3>
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
                                    <p className="m-0 content_header_item position-relative">Cập nhật</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} className="">
                                    <Measure bounds onResize={handleMeasure}>
                                        {({ measureRef }) => (
                                            <ul className={`content_header border mb-0 p-0 ${heightStatus === 1 ? "" : heightValue < 200 ? "" : "over_content"}`} style={{ height: `${heightValue < 200 ? "auto" : heightStatus === 1 ? "auto" : "200px"}` }} ref={measureRef}>
                                                {
                                                    chapteres.map((chapter, index) => (
                                                        chapter.storyId === parseInt(sid) ?
                                                            (
                                                                <li key={chapter.id} className={`Content_header_List_item pt-2 pb-2 mx-4 px-2 ${index === chapteres.length - 1 ? "last_item" : ""}`}>
                                                                    <Row>
                                                                        <Col xs={8}>
                                                                            <p className="m-0">
                                                                                <Link className="name_chapter text-dark" onClick={(e) => handleOnclickRead(e)} to={`/detail/${sid}/chapter/${chapter.id}`}>Chương {chapter.chapterNo}{chapter.name === "" ? "" : ` - ${chapter.name}`}</Link>
                                                                            </p>
                                                                        </Col>
                                                                        <Col xs={4}>
                                                                            <p className="m-0 color_grey fs-14">{CalTime(chapter.date)}</p>
                                                                        </Col>
                                                                    </Row>
                                                                </li>
                                                            ) : ""
                                                    ))
                                                }
                                            </ul>
                                        )}
                                    </Measure>
                                    {
                                        heightStatus === 0 ? (
                                            heightValue < 200 ? "" : <p className="text-center bg-light text-dark pt-2 pb-2"><span className="custom-cursor read_more" onClick={() => setHeightStatus(1)}>Xem Thêm<Plus /></span> </p>
                                        ) : ""
                                    }
                                </Col>
                            </Row>
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