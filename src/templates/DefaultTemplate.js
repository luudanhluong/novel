import React from "react";
import { Container } from "react-bootstrap";
import Header from "../components/Header"; 


const DefaultTemplate = ({ children }) => {

  return (
    <div> 
      <Header />
      <Container>
        {children}
      </Container>
    </div>
  );
};
export default DefaultTemplate;
