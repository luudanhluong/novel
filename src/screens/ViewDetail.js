import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import StoryDetail from "../components/StoryDetail";
import TopViewStories from "../components/TopViewStories";
import DefaultTemplate from "../templates/DefaultTemplate";
import {createContext} from "react"

const storyId = createContext();
const ViewDetail = () => { 
    const {sid} = useParams('')
    return ( 
        <DefaultTemplate>
            <Row className="d-flex justify-content-center">
                <Col xs = {10}>
                    <Row>
                        <Col xs={12}>
                            <Row className="mt-5">
                                <Col xs={8}>
                                    <StoryDetail sid={sid} />
                                </Col>
                                <Col xs={4}>
                                    <TopViewStories />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </DefaultTemplate>
     );
}
 
export default ViewDetail;