import React, { useState } from 'react';
import BookFormModal from './BookFormModal';

const AddBookButton = ({ handleAddBook }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Add Book</button>
      {showModal && <BookFormModal closeModal={() => setShowModal(false)} handleAddBook={handleAddBook} />}
    </div>
  );
};

export default AddBookButton;

