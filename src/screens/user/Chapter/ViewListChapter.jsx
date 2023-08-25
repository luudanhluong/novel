import { Col, Row } from "react-bootstrap";
import ViewListChapter from "../../../components/author/listChapter";
import DefaultTemplate from "../../../templates/DefaultTemplate";

const AddEditChapter = () => {
    return ( 
        <DefaultTemplate>
            <Row>
                <Col xs={12}>
                <ViewListChapter />
                </Col>
            </Row>
        </DefaultTemplate>
     );
}
 
export default AddEditChapter;