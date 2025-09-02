import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar"; // your existing sidebar

const AppLayout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        {/* <Col md={2} className="bg-light text-white min-vh-100 p-3">
          <Sidebar />
        </Col> */}

        {/* Main content */}
        <Col md={10} className="p-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default AppLayout;
