import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ChevronDoubleLeft, ChevronDoubleRight, ChevronLeft, ChevronRight, House, HouseFill, List } from "react-bootstrap-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormComment from "../components/FormComment";
import TopViewStories from "../components/TopViewStories";
import DefaultTemplate from "../templates/DefaultTemplate";

const ChapterContent = () => {
    const { sid, cid } = useParams()
    const navigate = useNavigate('')
    const [chapterContent, setChapterContent] = useState({})
    const [story, setStory] = useState({})
    const [chapteres, setChapteres] = useState([])
    const [chapter, setChapter] = useState(cid)
    useEffect(() => {
        navigate(`/detail/${sid}/chapter/${chapter}`)
    }, [sid, chapter, navigate])
    useEffect(() => {
        fetch(`http://localhost:9999/chapterContent`)
            .then(res => res.json())
            .then(data => setChapterContent(data.find(d => d.storyId === parseInt(sid) && d.chapterId === parseInt(chapter))))
    }, [sid, chapter])
    useEffect(() => {
        fetch(`http://localhost:9999/chapter?storyId=${sid}`)
            .then(res => res.json())
            .then(data => setChapteres(data))
    }, [sid])
    useEffect(() => {
        fetch(`http://localhost:9999/Stories/${sid}`)
            .then(res => res.json())
            .then(data => setStory(data))
    }, [sid])
    const handleOnchangeChapter = (e) => {
        navigate(`/detail/${sid}/chapter/${e.target.value}`)
        setChapter(e.target.value)
    }
    const handleMovePrev = (e) => {
        setChapter(parseInt(chapter) - 1)
    }
    const handleMoveNext = (e) => {
        setChapter(parseInt(chapter) + 1)
    } 
    let count = 0
    return (
        <DefaultTemplate>
            <Row className="mt-5 mb-4">
                <Col xs={8}>
                    <Row>
                        <Col xs={12} className="">
                            <Row className="text-center">
                                <Col xs={12}>
                                    <h2 className="text-info">{story.name}</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} className="d-flex justify-content-center">
                                    <ul className="d-flex mb-3 p-0 top_container_detail">
                                        <li className="fw-bold pe-2">Tác giả:</li>
                                        <li className="text-muted">{story.author}</li>
                                    </ul>
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-center">
                                <Col className="d-flex justify-content-end" xs={4}>
                                    <span className="mt-1 me-2"><Link to="/"><HouseFill size={24} color="red" /> </Link></span>
                                    <span className="mt-1"><Link to={`/detail/${story.id}`}><List size={28} color="red" /> </Link></span>
                                    <Button onClick={(e) => handleMovePrev(e)} disabled={parseInt(chapter) === 1} className="bg-white border-0 px-2 pt-1"><ChevronLeft onClick={(e) => handleMovePrev(e)} disabled={parseInt(chapter) === 1} className="fw-bold" size={24} color="red" /></Button>
                                </Col>
                                <Col xs={4}>
                                    <Form.Group>
                                        <Form.Select className="form-control" value={chapter} onChange={(e) => handleOnchangeChapter(e)}>
                                            {
                                                chapteres.map((chapter) => (
                                                    <option value={chapter.chapterNo} key={chapter.id} >Chương {chapter.chapterNo}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col xs={4}>
                                    <Button onClick={(e) => handleMoveNext(e)} disabled={parseInt(chapter) === chapteres.length} className="bg-white border-0 px-2 pt-1"><ChevronRight onClick={(e) => handleMoveNext(e)} disabled={parseInt(chapter) === chapteres.length} className="fw-bold" size={24} color="red" /></Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12}>
                            <p>
                                {
                                    typeof chapterContent !== "undefined" && Object.keys(chapterContent).length !== 0 ?
                                        (
                                            chapterContent.paragraph.map((p, i) => (
                                                <span key={i+=2}><br/>{p.replaceAll(/'/g, '"')}<br/></span>
                                            ))
                                        ) : ""
                                }
                            </p>
                        </Col>
                    </Row>
                    <Row className="mt-4 mb-5">
                        <Col xs={12} className="text-center">
                            <Button onClick={(e) => handleMovePrev(e)} disabled={parseInt(chapter) === 1} className="btn-danger me-1"><ChevronDoubleLeft onClick={(e) => handleMovePrev(e)} disabled={parseInt(chapter) === 1} /> Chương Trước</Button>
                            <Button onClick={(e) => handleMoveNext(e)} disabled={parseInt(chapter) === chapteres.length} className="btn-danger ms-1">Chương Sau <ChevronDoubleRight onClick={(e) => handleMoveNext(e)} disabled={parseInt(chapter) === chapteres.length} /></Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <FormComment sid={sid} />
                        </Col>
                    </Row>
                </Col>
                <Col xs={4}>
                    <TopViewStories />
                </Col>
            </Row>
        </DefaultTemplate>
    );
}

export default ChapterContent;