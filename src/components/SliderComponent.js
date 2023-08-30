import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import CalTime from './common/utilities/calTime';

const SliderComponent = () => {
    const [chapteres, setChapteres] = useState([])
    const [stories, setStories] = useState([])
    useEffect(() => {
        fetch("http://localhost:9999/chapter")
            .then(res => res.json())
            .then(data => setChapteres(data.sort((a, b) => b['id'] - a['id'])))
    }, []);
    useEffect(() => {
        fetch("http://localhost:9999/Stories")
            .then(res => res.json())
            .then(data => setStories(data.sort((a, b) => new Date(b['updateDate']) - new Date(a['updateDate']))))
    }, []);
    stories.map(story => {
        story.chapters = chapteres.filter(chapter => chapter.storyId === story.id && chapter.active).slice(0, 1)
    });
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
                        stories.map((d, i) => (
                            d.active === 1 && i <= 6 ? 
                            <Card key={d.id} className='card_slider'>
                                <Card.Body className='body_card_slider position-relative overflow-hidden'>
                                    <Link to={`/detail/${d.id}`}>
                                        <Card.Img className="img_card_slide border border-dark" src={d.image} alt={d.name} />
                                    </Link>
                                    <ul className='m-0 p-0 pt-1 pb-1 bg-dark h-25 back_ground_opacity list-unstyled position-absolute bottom-0 start-0 end-0 ms-2 me-2' style={{ zIndex: 99999 }}>
                                        <li className='text-center'><h6 className='slider_list_item ps-1 pe-1 mb-1 text-white'>{d.name}</h6></li>
                                        {
                                            d.chapters.map((chapter) => (
                                                chapter.storyId === d.id ?
                                                    (
                                                        <li key={chapter.id} className={`mx-0 lh-1 text-center`}>
                                                            <Link to={`/detail/${d.id}/chapter/${chapter.id}`} className="m-0 pe-2 text-decoration-none text-white chapter_list_view name_chapter">Chương {chapter.chapterNo}{chapter.name === "" ? "" : ` - ${chapter.name}`}</Link>
                                                            <i className="m-0 time_update fw-lighter text-white chapter_list_view_time">{CalTime(chapter.publishedDate)}</i>
                                                        </li>
                                                    ): ""
                                            ))
                                        }
                                    </ul>
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