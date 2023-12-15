import React from 'react';
import { Button } from 'react-bootstrap';

function Book({ bookData, handleDelete }) {
  const deleteBook = () => {
    handleDelete(bookData._id);
  };

  return (
    <div>
      <p><strong>Title: </strong>{bookData.title}</p>
      <p><strong>Description:</strong> {bookData.description}</p>
      <strong> Actions: </strong>
      <Button variant="danger" onClick={deleteBook}>
        Delete Book
      </Button>
    </div>
  );
}

export default Book;
