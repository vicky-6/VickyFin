import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function AddAgent() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div style={{ marginLeft: "240px", padding: "20px" }}>
      <Button variant="primary" onClick={handleShow}>
        + Add Agent
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Agent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Agent Name</Form.Label>
              <Form.Control type="text" placeholder="Enter agent name" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Enter phone number" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email (optional)" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
