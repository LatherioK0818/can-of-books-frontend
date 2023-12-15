import React, { useState } from 'react';
import { Card, Form, Button, Modal } from 'react-bootstrap';

function BookFormModal({ closeModal, handleAddBook }) {
  const [formData, setFormData] = useState({ title: '', description: '' });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleAddBook(formData);
    setFormData({ title: '', description: '' });
    closeModal(); // Close the modal after submitting
  }

  return (
    <Modal show onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Card style={{ width: '18rem' }}>
            <Card.Header>Add Book</Card.Header>
            <Card.Body>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Book Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Book Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Add Book
              </Button>
            </Card.Body>
          </Card>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default BookFormModal;

