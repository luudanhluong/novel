import { Form, Col } from "react-bootstrap";  
import { useDispatch } from "react-redux";
 
const CheckBox = (props) => {  
    const dispatch = useDispatch();
    const { label = "", id = "",checked="", disabled = false, required = true, feedback = "Look good!", xs = 12, pattern = "[A-Za-z0-9]", name = "", handleOnchange=()=>{}, valid } = props
     
    return (
        <Form.Group as={Col} xs={xs}>
            <Form.Check
                name={name}
                id={JSON.stringify(id)}
                type={"checkbox"}
                onChange={(e) => dispatch(handleOnchange(e.target.value))}
                value={JSON.stringify(id)}
                label={label}
                disabled={disabled}
                required={required}
                pattern={pattern}
                feedbackType={valid} 
                checked={checked} 
            />
        </Form.Group>
    );
}

export default CheckBox;