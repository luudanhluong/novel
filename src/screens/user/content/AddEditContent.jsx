import { useRef } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Content from "../../../components/common/chapterContent";
import TextArea from "../../../components/common/custom-fileds/textArea";
import { addContent, clearAll, setContentValue, updateContentValue } from "../../../components/common/data/dataContent/dataSlice";
import DefaultTemplate from "../../../templates/DefaultTemplate";
import FetchData from "./FetchData";

const AddEditContent = () => {
    const { sid, cid } = useParams();
    const dispatch = useDispatch();
    const inputRef = useRef();
    const content = useSelector(state => state.content.content);
    const value = useSelector(state => state.content.value);
    const update = useSelector(state => state.content.update);
    const chapter = useSelector(state => state.listChapter.chapter);
    FetchData(sid, cid);
    const handleOnchangeValue = (e) => {
        dispatch(setContentValue(e.target.value));
    }
    const handleAdd = () => {
        if (update !== 0) {
            dispatch(updateContentValue({ value: value, index: update, contentId: content.id }));
        } else {
            dispatch(addContent({ value: value, contentId: content.id }));
        }
        dispatch(setContentValue(""));
    }
    const handleClearAll = () => {
        dispatch(clearAll(content.id));
    }
    if (inputRef.current) {
        inputRef.current.focus();
    }
    return (
        <DefaultTemplate>
            <Row className="d-flex justify-content-center">
                <Col xs={10}>
                    <span>
                        <Link
                            to={`/author/mystory/listchapter/${sid}`}>
                            <ArrowLeftCircle
                                color="black"
                                className="pb-1 mt-3"
                                size={22}
                            />
                        </Link >
                    </span>
                </Col>
                <Col xs={10} className="border new-content" >
                    <Content />
                </Col>
                <Col xs={10}>
                    <Row className="text-center d-flex justify-content-center mt-1">
                        <Col xs={8}>
                            <TextArea
                                handleInputChange={handleOnchangeValue}
                                value={value}
                                ref={inputRef}
                            />
                        </Col>
                        <Col xs={2}>
                            <Row className="d-flex justify-content-center">
                                <Col xs={4}>
                                    <Button
                                        disabled={value === "" || (chapter && chapter.active)}
                                        onClick={handleAdd}
                                    >
                                        Gửi
                                    </Button>
                                </Col>
                                <Col xs={8}>
                                    <Button
                                        variant="danger"
                                        disabled={(content.paragraph && content.paragraph.length === 0) || (chapter && chapter.active)}
                                        onClick={handleClearAll}
                                    >
                                        Xóa hết
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </DefaultTemplate>
    );
}

export default AddEditContent;