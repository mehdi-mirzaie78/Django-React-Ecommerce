import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export const FormContainer = ({ children }) => {
  return (
    <Container fluid>
      <Row className="justify-content-md-center mt-2">
        <Col xs={12} md={6} className="px-4 py-2 border rounded">
          {children}
        </Col>
      </Row>
    </Container>
  );
};
