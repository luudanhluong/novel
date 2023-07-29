import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const ViewList = ({ stories }) => {
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
                                <Card.Subtitle className="name_card_item">{story.name}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            }
        </Row>
    );
}

export default ViewList;