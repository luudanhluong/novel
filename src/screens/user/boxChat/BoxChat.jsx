import { useEffect, useMemo, useRef } from "react";
import { Button, Col, OverlayTrigger, Row, Spinner, Tooltip } from "react-bootstrap"; 
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import CalTime from "../../../components/common/utilities/calTime";
import { deleteFeedback, postFeedback } from "../../../components/common/data/dataBoxChat/dataSlice"; 
import InputField from "../../../components/common/custom-fileds/inputField/index";
import userLogedIn from "../../../components/user/userLogedIn";
import DefaultTemplate from "../../../templates/DefaultTemplate";
import { setScrollValue, setValue } from "./boxChatSlice";
import FetchData from "./FetchData";

const Feedback = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const inputValue = useRef();
    const { sid } = useParams();
    const value = useSelector(state => state.feedback.value);
    const scrollValue = useSelector(state => state.feedback.scroll);
    const listFeedback = useSelector(state => state.listFeedback.data);
    const listUser = useSelector(state => state.listUser.data);
    const user = userLogedIn();
    const targetDivRef = useRef(null);
    const handleInputChange = (event) => {
        const action = setValue(event.target.value);
        dispatch(action); 
    };
    FetchData(listFeedback, sid, value)
    const handleSubmit = () => {
        const regex = /^[\s]*$/;
        if (regex.test(value)) return;
        const feedback = {
            storyId: +sid,
            userId: user.id,
            feedback: value,
            timeFeedback: "",
            type: "normal"
        }
        dispatch(postFeedback(feedback));
        dispatch(setValue(""))
        inputValue.current.focus();
    }
    const handleScroll = (event) => {
        if (event.target.scrollTop === 0) {
            dispatch(setScrollValue(scrollValue + 10));
            if (scrollValue < listFeedback.length) {
                event.target.scrollTop = 100;
            }
        } 
    }
    useEffect(() => {
        dispatch(setScrollValue(20));
    }, [location, dispatch]);
    const ListFeedbackCopy = [...listFeedback];
    ListFeedbackCopy.sort((a, b) => new Date(b["timeFeedback"]) - new Date(a["timeFeedback"]));
    const newListFeedback = ListFeedbackCopy.map(fb => ({ ...fb, userImg: "", username: "" }));
    const newListFeedback_20 = newListFeedback.slice(0, scrollValue);
    newListFeedback_20.sort((a, b) => new Date(a["timeFeedback"]) - new Date(b["timeFeedback"]));
    useEffect(() => {  
        if (targetDivRef.current) {
            targetDivRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [targetDivRef]);
    useMemo(() => {
        listUser.forEach(u => {
            newListFeedback_20.forEach(fb => {
                if (fb.userId === u.id) {
                    fb.userImg = u.img === "" ? "https://cdn.landesa.org/wp-content/uploads/default-user-image.png" : u.img;
                    fb.username = u.username;
                }
            });
        }); 
    }, [listUser, newListFeedback_20]);
    const deleteMss = (feedback) => {
        dispatch(deleteFeedback(feedback));    
    }; 
    return (
        <DefaultTemplate>
            <Row>
                <Col xs={12}>
                    <Row className="d-flex justify-content-center mt-4">
                        <Col xs={7} className="">
                            <ul className="list-unstyled mt-3 box-chat border" onScroll={handleScroll} >
                                <li>
                                    {
                                        listFeedback.length < scrollValue ? ""
                                            : (
                                                <Row>
                                                    <Col xs={12} className="text-center mt-1">
                                                        <Spinner animation="border" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>
                                                    </Col>
                                                </Row>
                                            )
                                    }
                                </li>
                                {
                                    newListFeedback_20.map((feedback, index) => (
                                        <li key={feedback.id} ref={newListFeedback_20.length === index + 1 ? targetDivRef : undefined}>
                                            <Row>
                                                <Col xs={12}>
                                                    <div className={`${user.id === feedback.userId ? "float-end d-flex justify-content-end me-2" : "float-start d-flex justify-content-start "} ms-2 w-75 ${index === newListFeedback_20.length - 1 ? "mb-2" : ""}`}>

                                                        {
                                                            user.id !== feedback.userId
                                                                ? (
                                                                    <div className="d-flex align-items-end me-2">
                                                                        <OverlayTrigger
                                                                            key={feedback.id}
                                                                            placement={"left"}
                                                                            overlay={
                                                                                <Tooltip id={feedback.username}>
                                                                                    <span>{feedback.username}</span>
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <img
                                                                                className="rounded-5 border img_32"
                                                                                src={`${feedback.userImg}`}
                                                                                alt=""
                                                                            />
                                                                        </OverlayTrigger>
                                                                    </div>
                                                                ) : ""
                                                        }
                                                        <OverlayTrigger
                                                            key={feedback.id}
                                                            placement={"left"}
                                                            overlay={
                                                                <Tooltip id={`:r3ia:`}>
                                                                    <span>{CalTime(feedback.timeFeedback)}</span>
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <>
                                                                {
                                                                    user.id === feedback.userId && feedback.type === "normal"
                                                                        ? (<span className="custom-cursor px-1 pt-1 pb-1" onClick={() => deleteMss(feedback)}>&times;</span>) : ""
                                                                }
                                                                {
                                                                    feedback.type === "normal"
                                                                        ? (
                                                                            <span className={`lh-sm pb-2 pt-1 text-break  bg-primary mt-2 px-4 rounded-5 text-white align-baseline`}>
                                                                                {feedback.feedback}
                                                                            </span>
                                                                        )
                                                                        : (
                                                                            <span className={`lh-sm pb-2 pt-1 text-break  bg-secondary mt-2 px-4 rounded-5 text-white align-baseline`}>
                                                                                Tin nhắn đã được thu hồi
                                                                            </span>
                                                                        ) 
                                                                }
                                                            </>
                                                        </OverlayTrigger>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </li>
                                    ))
                                }
                            </ul>
                        </Col>
                        <Col xs={7}>
                            <Row className="d-flex justify-content-center mt-4">
                                <Col xs={9}>
                                <InputField handleInputChange={handleInputChange} placeholder="Aa" value={value} ref={inputValue} />
                                    <InputField handleInputChange={handleInputChange} placeholder="Aa" value={value} ref={inputValue} />
                                </Col>
                                <Col xs={1}>
                                    <Button disabled={value === ""} onClick={handleSubmit}>Gửi</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </DefaultTemplate>
    );
}

export default Feedback;