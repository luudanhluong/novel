import React, { memo, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setChapterNo } from "../data/dataChapter/dataSlice";
import calTime from "../utilities/calTime";
import FetchData from "./FetchData";

const ListChapter = ({ sid }) => {
    const dispatch = useDispatch();
    const [more, setMore] = useState(10);
    FetchData(sid); 
    const listChapter = useSelector(state => state.listChapter.data);
    const listChapterCopy = [...listChapter];
    const newListChapter = listChapterCopy.sort((a, b) => b["id"] - a["id"]);
    const newListChapter_10 = newListChapter.slice(0, more);
    const handleMore = () => {
        setMore(listChapter.length);
    }
    return (
        <Col xs={12}>
            {
                newListChapter_10.length > 0 ?
                    (
                        <Row>
                            <Col xs={12} className="">
                                <ul className={`align-middle content_header mb-0 p-0 `}>
                                    {
                                        newListChapter_10.map((chapter, index) => (
                                            chapter.active
                                                ? (
                                                    <li key={chapter.chapterNo} className={`content_header_list_item pt-2 pb-2 mx-4 px-2`}>
                                                        <Row className="d-flex justify-content-between">
                                                            <Col xs={6}>
                                                                <span>
                                                                    <Link
                                                                        className="name_chapter text-dark"
                                                                        onClick={() => dispatch(setChapterNo(chapter.chapterNo))}
                                                                        to={`/detail/${sid}/chapter/${chapter.id}`}
                                                                    >
                                                                        Chương {chapter.chapterNo} {chapter.name ? `- ${chapter.name}` : ""}
                                                                    </Link>
                                                                </span>
                                                            </Col>
                                                            <Col xs={4}>
                                                                {calTime(chapter.publishedDate)}
                                                            </Col>
                                                        </Row>
                                                    </li>
                                                ) : ""
                                        ))
                                    }
                                    {
                                        more < listChapter.length
                                            ? (
                                                <li className="text-center custom-cursor">
                                                    <span onClick={handleMore}>Xem thêm</span>
                                                </li>
                                            ) : ""
                                    }
                                </ul>
                            </Col>
                        </Row>
                    ) : ""
            }
        </Col>
    );
}

export default memo(ListChapter);