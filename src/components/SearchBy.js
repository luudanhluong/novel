import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { ArrowRepeat, ChatFill, CloudArrowUpFill,EyeFill, HeartFill, ListUl } from "react-bootstrap-icons";
const SearchBy = ({handleSort, handleStatus}) => {
    const [status, setStatus] = useState('1')
    const [sort, setSort] = useState('1')
    const handleOnclickStatus = (e) => {
        setStatus(e.target.value)
        handleStatus(e.target.value)
    }
    const handleOnclickSortUpdate = (e) => {
        setSort("1")
        handleSort("1")
    }
    const handleOnclickSortNew = (e) => {
        setSort("2")
        handleSort("2")
    }
    const handleOnclickSortTop = (e) => {
        setSort("3")
        handleSort("3")
    }
    const handleOnclickSortFollow = (e) => {
        setSort("4")
        handleSort("4")
    }
    const handleOnclickSortComment = (e) => {
        setSort("5")
        handleSort("5")
    }
    const handleOnclickSortChapter = (e) => {
        setSort("6")
        handleSort("6")
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
                <Button onClick={(e) => handleOnclickSortUpdate(e)} className={`${sort === "1" ? "bg-warning text-white" : "bg-light text-dark"} border-0 mx-1 mb-1`}><ArrowRepeat onClick={(e) => handleOnclickSortUpdate(e)}/> Ngày cập nhật</Button>
                <Button onClick={(e) => handleOnclickSortNew(e)} className={`${sort === "2" ? "bg-warning text-white" : "bg-light text-dark"} border-0 mx-1 mb-1`}><CloudArrowUpFill onClick={(e) => handleOnclickSortNew(e)}/> Truyện mới</Button>
                <Button onClick={(e) => handleOnclickSortTop(e)} className={`${sort === "3" ? "bg-warning text-white" : "bg-light text-dark"} border-0 mx-1 mb-1`}><EyeFill onClick={(e) => handleOnclickSortTop(e)}/> Top all</Button> 
                <Button onClick={(e) => handleOnclickSortFollow(e)} className={`${sort === "4" ? "bg-warning text-white" : "bg-light text-dark"} border-0 mx-1 mb-1`}><HeartFill onClick={(e) => handleOnclickSortFollow(e)}/> Theo dõi</Button>
                <Button onClick={(e) => handleOnclickSortComment(e)} className={`${sort === "5" ? "bg-warning text-white" : "bg-light text-dark"} border-0 mx-1 mb-1`}><ChatFill onClick={(e) => handleOnclickSortComment(e)}/> Bình luận</Button>
                <Button onClick={(e) => handleOnclickSortChapter(e)} className={`${sort === "6" ? "bg-warning text-white" : "bg-light text-dark"} border-0 mx-1 mb-1`}><ListUl onClick={(e) => handleOnclickSortChapter(e)}/> Số chương</Button> 
            </Col>
        </Row>
    );
}

export default SearchBy;