import { useEffect, useMemo, useRef } from "react";
import { Button, Col, OverlayTrigger, Row, Spinner, Tooltip } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CalTime from "../../../components/CalTime";
import { fetchFeedbackSuccess, postFeedback } from "../../../components/common/api/dataFeedback/dataSlice";
import { fetchUserSuccess } from "../../../components/common/api/dataUser/dataSlice";
import InputField from "../../../components/common/custom-fileds/inputField/inputFiled";
import userLogedIn from "../../../components/user/userLogedIn";
import DefaultTemplate from "../../../templates/DefaultTemplate";
import { setScrollValue, setValue } from "./feedbackSlice";

const Feedback = () => {
    const dispatch = useDispatch();
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
    useEffect(() => {
        fetch("http://localhost:9999/feedback")
            .then(res => res.json())
            .then(data => dispatch(fetchFeedbackSuccess(data.filter(d => d.storyId === parseInt(sid)))));
    }, [value, sid, dispatch]);
    useEffect(() => {
        fetch("http://localhost:9999/Users")
            .then(res => res.json())
            .then(data => dispatch(fetchUserSuccess(data.filter(d => {
                const id = new Set(listFeedback.map(fb => fb.userId));
                const newList = [...id];
                return newList.includes(d.id)
            }))));
    }, [listFeedback, dispatch]);
    const handleSubmit = () => {
        const regex = /^[\s]*$/;
        if (regex.test(value)) return;
        const feedback = {
            storyId: +sid,
            userId: user.id,
            feedback: value,
            timeFeedback: "",
        }
        dispatch(postFeedback(feedback));
        dispatch(setValue(""))
        inputValue.current.focus();
    }
    // useEffect(() => {
        // Gắn sự kiện scroll khi component được mount
        // const ul = document.querySelector(".box-chat");
        // if(ul!==null){
        // ul.addEventListener('scroll', ()=> {
        //     const currentPosition = window.pageYOffset;
        //     if (currentPosition === 0) {
        //         setScrollValue(scrollValue+10);
        //     }
        //     console.log(currentPosition);
        // }); }
    // }, []);
    // console.log(scrollValue);
    useEffect(() => {
        if (targetDivRef.current) {
            targetDivRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [listFeedback]);
    const ListFeedbackCopy = [...listFeedback];
    ListFeedbackCopy.sort((a, b) => new Date(b["timeFeedback"]) - new Date(a["timeFeedback"]));
    const newListFeedback = ListFeedbackCopy.map(fb => ({ ...fb, userImg: "", username: "" }));
    const newListFeedback_10 = newListFeedback.slice(0, scrollValue);
    newListFeedback_10.sort((a, b) => new Date(a["timeFeedback"]) - new Date(b["timeFeedback"]));
    useEffect(() => {
        listUser.forEach(u => {
            newListFeedback_10.forEach(fb => {
                if (fb.userId === u.id) {
                    fb.userImg = u.img;
                    fb.username = u.username;
                }
            });
        });
    }, [listUser]);
    return (
        <DefaultTemplate>
            <Row>
                <Col xs={12}>
                    <h3 className="pt-3"><ArrowLeft className="pb-2" size={40} /> Back</h3>
                </Col>
                <Col xs={12}>
                    <Row className="d-flex justify-content-center">
                        <Col xs={7} className="">
                            <ul className="list-unstyled mt-3 box-chat border" >
                                {
                                    newListFeedback_10.map((feedback, index) => (
                                        <li key={feedback.id} ref={newListFeedback_10.length === index + 1 ? targetDivRef : undefined}>
                                            <Row>
                                                <Col xs={12}>
                                                    {
                                                        index === 0
                                                            ?
                                                            (
                                                                <Row>
                                                                    <Col xs={12} className="text-center mt-1">
                                                                        <Spinner animation="border" role="status">
                                                                            <span className="visually-hidden">Loading...</span>
                                                                        </Spinner>
                                                                    </Col>
                                                                </Row>
                                                            ) : ""
                                                    }
                                                    <div className={`${user.id === feedback.userId ? "float-end d-flex justify-content-end me-2" : "float-start d-flex justify-content-start "} ms-2 w-75 ${index === newListFeedback_10.length - 1 ? "mb-2" : ""}`}>

                                                        {
                                                            user.id !== feedback.userId
                                                                ? (
                                                                    <div className="d-flex align-items-end me-2" aria-describedby={feedback.username}>
                                                                        <OverlayTrigger
                                                                            key={feedback.id}
                                                                            placement={"left"}
                                                                            variant="light"
                                                                            overlay={
                                                                                <Tooltip id={`:r3ia:`}>
                                                                                    <span>{feedback.username}</span>
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <img
                                                                                className="rounded-5 border img_32"
                                                                                src={`${feedback.userImg === "" ? "https://cdn.landesa.org/wp-content/uploads/default-user-image.png" : feedback.userImg}`}
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
                                                            <span className={`lh-sm pb-2 pt-1 text-break  bg-primary mt-2 px-4 rounded-5 text-white align-baseline`}>{feedback.feedback}</span>

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
                                    <InputField handleInputChange={handleInputChange} value={value} ref={inputValue} />
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