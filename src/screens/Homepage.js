import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap'
import SliderComponent from '../components/SliderComponent';
import TopViewStories from '../components/TopViewStories';
import ViewList from '../components/ViewList';
import DefaultTemplate from "../templates/DefaultTemplate";

const Homepage = () => {
    const [stories, setStories] = useState([])
    useEffect(() => {
        fetch("http://localhost:9999/Stories")
            .then(res => res.json())
            .then(data => setStories(data))
    }, [])
    return (
        <DefaultTemplate>
            <SliderComponent data={stories} />
            <Row className='d-flex justify-content-center'>
                <Col xs={10}>
                    <Row>
                        <Col xs={12} className={"pt-2"}>
                            <h4 className="text-info">Truyện mới cập nhật</h4>
                        </Col>
                        <Col xs={8}>
                            <ViewList stories={stories} />
                        </Col>
                        <Col xs={4}>
                            <TopViewStories />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </DefaultTemplate>
    );
}

export default Homepage;