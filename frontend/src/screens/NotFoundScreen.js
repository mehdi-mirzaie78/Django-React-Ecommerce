import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const NotFoundScreen = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <div className="text-center mt-5">
            <h1>404</h1>
            <h3>Page Not Found</h3>
            <p>
              The page you are looking for does not exist. It may have been
              moved or removed.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundScreen;
