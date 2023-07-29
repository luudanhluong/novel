import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ChevronDoubleLeft, ChevronDoubleRight } from "react-bootstrap-icons";
import { useParams } from "react-router-dom";
import TopViewStories from "../components/TopViewStories";
import DefaultTemplate from "../templates/DefaultTemplate";

const ChapterContent = () => {
    const { sid, cid } = useParams()
    const [chapterContentes, setChapterContentes] = useState([])
    const [story, setStory] = useState({})
    const [chapteres, setChapteres] = useState([])
    const [chapter, setChapter] = useState(cid)
    useEffect(() => {
        fetch(`http://localhost:9999/chapterContent?rateStoryId=${sid}&chapterId=${chapter}`)
            .then(res => res.json())
            .then(data => setChapterContentes(data))
    }, [sid, chapter])
    useEffect(() => {
        fetch(`http://localhost:9999/chapter?rateStoryId=${sid}`)
            .then(res => res.json())
            .then(data => setChapteres(data))
    }, [sid])
    useEffect(() => {
        fetch(`http://localhost:9999/Stories/${sid}`)
            .then(res => res.json())
            .then(data => setStory(data))
    }, [sid])
    const handleOnchangeChapter = (e) => {
        setChapter(e.target.value)
    }
    return (
        <DefaultTemplate>
            <Row className="mt-5 mb-4">
                <Col xs={8}>
                    <Row>
                        <Col xs={12} className="mb-4">
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
                                <Col xs={4}>
                                    <Form.Group>
                                        <Form.Select className="form-control" value={chapter} onChange={(e) => handleOnchangeChapter(e)}>
                                            {
                                                chapteres.map((chapter) => (
                                                    <option value={chapter.chapterNo}>Chương {chapter.chapterNo}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12}>
                            <p>
                                {
                                    chapterContentes.map((chapterContent) => (
                                        <>{chapterContent.paragraph}<br /></>
                                    ))
                                }
                            </p>
                        </Col>
                    </Row> 
                    <Row className="mt-4 mb-5">
                        <Col xs={12} className="text-center">
                            <p><Button className="btn-danger"><ChevronDoubleLeft /> Chương Trước</Button> <Button className="btn-danger">Chương Sau <ChevronDoubleRight /></Button></p>
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