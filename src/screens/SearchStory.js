import { useState } from "react";
import { Col, Row } from "react-bootstrap";  
import ViewList from "../components/common/story/ViewList";
import ListCategories from "../components/ListCategories";
import SearchBy from "../components/SearchBy"; 
import DefaultTemplate from "../templates/DefaultTemplate";

const SearchStory = () => { 
    const [sort, setSort] = useState('1')
    const [category, setCategory] = useState('0')
    const [status, setStatus] = useState('1')
    const getSort = (value) => {
        setSort(value) 
    } 
    const getCategory = (value) => {
        setCategory(value) 
    } 
    const getStatus = (value) => {
        setStatus(value)
    }
    return (
        <DefaultTemplate>
            <Row className='d-flex justify-content-center mt-4'>
                <Col xs={10}>
                    <Row>
                        <Col xs={8}> 
                        <Row>
                            <Col xs={12}>
                                <SearchBy handleSort={getSort} handleStatus={getStatus} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                            <ViewList sort={sort} categoryValue={category} statusValue={status} />
                            </Col>
                        </Row>
                        </Col>
                        <Col xs={4}>
                            <ListCategories handlecategory={getCategory} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </DefaultTemplate>
    );
}

export default SearchStory;