import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import EditBookFormModal from './EditBookFormModal';
import AddBookButton from './AddBook';

const SERVER = import.meta.env.VITE_API_SERVER_URL;

const BestBooks = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${SERVER}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

const addBook = async (formData) => {
  try {
    const response = await axios.post(`${SERVER}/books`, formData);
    setBooks([...books, response.data]);
    // Clear the form inputs
    setTitle('');
    setDescription('');
  } catch (error) {
    console.error('Error adding book:', error);
  }
};


  const deleteBook = async (id) => {
    try {
      await axios.delete(`${SERVER}/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEditBook = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book._id === updatedBook._id ? updatedBook : book))
    );
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <p>My Essential Lifelong Learning & Formation Shelf</p>

      <hr />

      <form onSubmit={addBook}>
        <input
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Save Book</button>
      </form>

      <hr />

      {books.length ? (
        <Carousel style={{ padding: '5em', background: '#111' }}>
          {books.map((book) => (
            <Carousel.Item key={book._id}>
              <img
                src={`https://placehold.co/800x400?text=${book.title}`}
                height="400"
                width="100%"
                alt={book.title}
              />
              <Carousel.Caption>
                <p>{book.description}</p>
                <div>
                  <button
                    onClick={() => {
                      setSelectedBook(book);
                      setShowEditModal(true);
                    }}
                    variant="secondary"
                  >
                    Edit Book
                  </button>
                  <button onClick={() => deleteBook(book._id)} style={{ marginLeft: '1em' }}>
                    Delete Book
                  </button>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p>No Books Found :(</p>
      )}

      {showEditModal && (
        <EditBookFormModal
          bookData={selectedBook}
          closeModal={() => setShowEditModal(false)}
          handleEditBook={handleEditBook}
        />
      )}

      <AddBookButton  />
    </>
  );
};

export default BestBooks;

