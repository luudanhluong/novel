import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const ListCategories = ({ handlecategory }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState('0') 
    useEffect(() => {
        if (category !== null) {
            setCategoryId(parseInt(category))
            handlecategory(parseInt(category))
        } else {
            setCategoryId('0')
            handlecategory('0')
        }
    }, [category])
    useEffect(() => {
        fetch("http://localhost:9999/Categories")
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])
    const handleOnclickCategory = (e, id) => {
        setCategoryId(id)
        handlecategory(id)
        const newURL = window.location.href.replace(`?category=${category}`, "");
        window.history.replaceState({}, "", newURL);
    }
    return (
        <Row>
            <Col xs={12}>
                <Row>
                    <Col xs={12}>
                        <h4 className="text-danger fw-bold">Tất Cả</h4>
                    </Col>
                    <Col xs={12} className={"d-flex"}>
                        <div className="w-50">
                            <ul className="m-0 p-0 list-unstyled">
                                {
                                    categories.map((category, index) => (
                                        parseInt(categories.length / 2) > index ?
                                            (
                                                <li onClick={(e) => handleOnclickCategory(e, category.id)} className={`px-3 pt-2 pb-2 border-bottom cursor-pointer custom-cursor name_chapter ${categoryId === category.id ? "fw-bold text-info" : ""}`} key={category.id}>{category.name}</li>
                                            ) : ""
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="w-50">
                            <ul className="m-0 p-0 list-unstyled">
                                {
                                    categories.map((category, index) => (
                                        parseInt(categories.length / 2) <= index && parseInt(categories.length / 2) * 2 > index ?
                                            (
                                                <li onClick={(e) => handleOnclickCategory(e, category.id)} className={`px-3 pt-2 pb-2 border-bottom fw-normal cursor-pointer custom-cursor name_chapter ${categoryId === category.id ? "fw-bold text-info" : ""}`} key={category.id}>{category.name}</li>
                                            ) : ""
                                    ))
                                }
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default ListCategories;