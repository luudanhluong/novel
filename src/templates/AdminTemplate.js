import { Container } from "react-bootstrap"; 
import Header from "../components/common/headerAdmin/Header";

const AdminTemplate = ({children}) => {
    return (
        <div>
            <Header />
            <Container>
                {children}
            </Container>
        </div>
    );
}

export default AdminTemplate;