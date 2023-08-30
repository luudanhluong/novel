import { Col, Row } from "react-bootstrap";
import { ArrowLeftCircle, Chat, PlusCircle } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ListChapter from "../../../components/author/listChapter/ListChapter";
import { createChapter } from "../../../components/common/data/dataChapter/dataSlice"; 
import DefaultTemplate from "../../../templates/DefaultTemplate"; 

const MyListChapter = () => {
    const { sid } = useParams();
    const dispatch = useDispatch();
    const listChapter = useSelector(state => state.listChapter.data); 
    const story = useSelector(state => state.listStory.story); 
    return (
        <DefaultTemplate>
            <Row>
                <Col xs={12}>
                    <span>
                        <Link to={`/author/mystory`}><ArrowLeftCircle color="black" className="pb-1" size={22} /></Link >
                    </span>
                    {
                        story.active
                            ? (
                                <span onClick={() => dispatch(createChapter({ storyId: +sid, chapterNo: listChapter.length + 1 }))}>
                                    <PlusCircle color={"black"} className="pb-1" size={22} />
                                </span>
                            ) : ""
                    }
                    <span>
                        <Link to={`/author/mystory/boxchat/${sid}`}><Chat color="black" className="pb-1" size={22} /></Link >
                    </span>
                </Col>
                <Col xs={12}>
                    <ListChapter sid={sid} />
                </Col>
            </Row>
        </DefaultTemplate>
    );
}

export default MyListChapter;