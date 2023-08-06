import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { ChatFill, Eye, HeartFill, ListUl } from "react-bootstrap-icons";
const SearchBy = ({handleSort, handleStatus}) => {
    const [status, setStatus] = useState('1')
    const [sort, setSort] = useState('1')
    const handleOnclickStatus = (e) => {
        setStatus(e.target.value)
        handleStatus(e.target.value)
    }
    const handleOnclickSort = (e) => {
        setSort(e.target.value)
        handleSort(e.target.value)
    }
    return (
        <Row className={"pt-2"}>
            <Col xs={12}>
                <h4 className="text-center">Tìm truyện tranh</h4>
            </Col>
            <Col xs={3}>
            </Col>
            <Col xs={9} className="pt-2 pb-3">
                <Row>
                    <Col xs={12}>
                        <Button onClick={(e) => handleOnclickStatus(e)} value="1" className={`${status === "1" ? "bg-primary text-white" : "bg-light text-dark"} border-0 mx-1`}>Tất cả</Button>
                        <Button onClick={(e) => handleOnclickStatus(e)} value="2" className={`${status === "2" ? "bg-primary text-white" : "bg-light text-dark"} border-0 mx-1`}>Hoàn thành</Button>
                        <Button onClick={(e) => handleOnclickStatus(e)} value="3" className={`${status === "3" ? "bg-primary text-white" : "bg-light text-dark"} border-0 mx-1`}>Đang tiến hành</Button>
                    </Col>
                </Row>
            </Col>
            <Col xs={3}>
                <h6>Sắp xếp theo:</h6>
            </Col>
            <Col xs={9}>
                <Button onClick={(e) => handleOnclickSort(e)} value="1" className={`${sort === "1" ? "bg-warning text-white" : "bg-light text-dark"} border-0 mx-1 mb-1`}>Ngày cập nhật</Button>
                <Button onClick={(e) => handleOnclickSort(e)} value="2" className={`${sort === "2" ? "bg-warning text-white" : "bg-light text-dark"} border-0 mx-1 mb-1`}>Truyện mới</Button>
                <Button onClick={(e) => handleOnclickSort(e)} value="3" className={`${sort === "3" ? "bg-warning text-white" : "bg-light text-dark"} border-0 mx-1 mb-1`}><Eye/> Top all</Button> 
                <Button onClick={(e) => handleOnclickSort(e)} value="4" className={`${sort === "4" ? "bg-warning text-white" : "bg-light text-dark"} border-0 mx-1 mb-1`}><HeartFill/> Theo dõi</Button>
                <Button onClick={(e) => handleOnclickSort(e)} value="5" className={`${sort === "5" ? "bg-warning text-white" : "bg-light text-dark"} border-0 mx-1 mb-1`}><ChatFill /> Bình luận</Button>
                <Button onClick={(e) => handleOnclickSort(e)} value="6" className={`${sort === "6" ? "bg-warning text-white" : "bg-light text-dark"} border-0 mx-1 mb-1`}><ListUl /> Số chương</Button>
                <Button onClick={(e) => handleOnclickSort(e)} value="7" className={`${sort === "7" ? "bg-warning text-white" : "bg-light text-dark"} border-0 mx-1 mb-1`}><ListUl /> Top Follow</Button>
            </Col>
        </Row>
    );
}

export default SearchBy;