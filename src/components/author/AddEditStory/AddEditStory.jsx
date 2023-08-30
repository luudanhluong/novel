
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputField from "../../common/custom-fileds/inputField";
import TextArea from "../../common/custom-fileds/textArea";
import CategoryValues from "../../common/categoryValue/main"; 
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { addStory, setAuthor, setCategoryId, setDesciption, setImage, setName, updateStory } from "./storySlice";
import DefaultTemplate from "../../../templates/DefaultTemplate";
import { updateUser } from '../../user/userSlice';
import getParameter from '../../common/utilities/getParameter';  
import CheckBox from '../../common/custom-fileds/CheckboxField';
import FetchData from './FetchData';

const AddStory = () => {
    let sid = getParameter("sid");
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const categoryList = CategoryValues();
    const user = JSON.parse(localStorage.getItem("user"));
    const { name, author, image, description, categoryId } = useSelector(state => state.story);  
    FetchData(sid);
    const handleInputChange1 = (event) => {
        const action = setName(event.target.value)
        dispatch(action)
    }
    const handleInputChange2 = (event) => {
        const action = setAuthor(event.target.value)
        dispatch(action)
    }
    const handleInputChange3 = (event) => {
        dispatch(setImage(event.target.value))
    }
    const handleInputChange4 = (event) => {
        const action = setDesciption(event.target.value)
        dispatch(action)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget;

        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        if (form.checkValidity()) {
            if (!sid) {
                dispatch(addStory(user.id));
                if (user.id === 1) {
                    dispatch(updateUser({
                        ...user,
                        role: 2
                    }));
                    localStorage.setItem("user", { ...user, role: 2 });
                }
            } else {
                dispatch(updateStory(+sid))
            }
        }
    }; 
    return (
        <DefaultTemplate>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3 d-flex justify-content-center mt-4" >
                    <Col xs={6}>
                        <Row>
                            <InputField label="Tên truyện" placeholder="Nhập trên truyện" id="name" handleInputChange={handleInputChange1} value={name} />
                            <InputField label="Tên tác giả" placeholder="Nhập tên tác giả" id="author" handleInputChange={handleInputChange2} value={author} />
                            <InputField label="Trang bìa truyện" type="file" id="image" handleInputChange={handleInputChange3} value={image} accept=".jpg, .jpeg, .png" />
                            <TextArea label="Mô tả truyện" placeholder="Nhập mô tả truyện" id="description" handleInputChange={handleInputChange4} value={description} />
                            <ListGroup className="p-0">
                                <label className="mb-2">Thể loại <span className="text-danger">*</span> </label>
                                {
                                    categoryList.map(item => (
                                        <ListGroup.Item key={item.id}>
                                            <CheckBox
                                                label={item.name}
                                                name="category"
                                                id={item.id}
                                                required={categoryId.length === 0}
                                                handleOnchange={setCategoryId}
                                                valid={categoryId.length === 0 ? "valid" : "invalid"}
                                                checked={categoryId.includes(item.id)}
                                            />
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                            <Row className="d-flex justify-content-center mt-2">
                                <Col xs={3} className="text-center">
                                    <Button type="submit" >Submit form</Button>
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </DefaultTemplate>
    );
}

export default AddStory;