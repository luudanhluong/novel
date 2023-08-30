
import { Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify';
import ViewList from '../components/common/story/ViewList';
import SliderComponent from '../components/SliderComponent';
import TopViewStories from '../components/TopViewStories'; 
import DefaultTemplate from "../templates/DefaultTemplate";

const Homepage = () => {
    if (sessionStorage.getItem("login_success")) {
        toast.success("Đăng nhập thành công!")
        sessionStorage.removeItem("login_success")
    }
    return (
        <DefaultTemplate>
            <SliderComponent />
            <Row className='d-flex justify-content-center'>
                <Col xs={10}>
                    <Row>
                        <Col xs={12} className={"pt-2"}>
                            <h4 className="text-info">Truyện mới cập nhật</h4>
                        </Col>
                        <Col xs={8}>
                            <ViewList />
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