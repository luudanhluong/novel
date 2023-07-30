import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

const SliderComponent = ({ data }) => {
    const settings = {
        speed: 500,
        autoplaySpeed: 2500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 1,
        arrows: true,
        cssEase: "linear",
        autoplay: true,
        pauseOnHover: true,
        infinite: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <Row className='pt-3 pb-2 d-flex justify-content-center'>
            <Col xs={10} className="border-2 border-bottom border-info pb-4">
                <h4 className="text-info">Truyện đề cử</h4>
                <Slider {...settings}>
                    {
                        data.map((d, i) => (
                            i <= 5 ? <Card key={d.id} className='card_slider'>
                                <Card.Body className='body_card_slider'>
                                    <Link to={`/detail/${d.id}`}>
                                        <Card.Img className="img_card_slide" src={d.image} alt={d.name} />
                                    </Link>
                                </Card.Body>
                            </Card> : ""
                        ))
                    }
                </Slider>
            </Col>
        </Row>
    );
}

export default SliderComponent;