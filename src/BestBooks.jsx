import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Routes from './About'; 
import { Link, Route } from 'react-router-dom';

const SERVER = 'https://localhost:3001';

const BestBooks = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${SERVER}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addBook = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER}/books`, { title, description });
      setBooks([...books, response.data]);
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
        <input name="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
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
              <img src={`https://placehold.co/800x400?text=${book.title}`} height="400" width="100%" alt={book.title} />
              <Carousel.Caption>
                <p>{book.description}</p>
                <span
                  onClick={() => deleteBook(book._id)}
                  style={{ marginLeft: '.5em', color: 'red', cursor: 'pointer' }}
                >
                  X
                </span>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p>No Books Found :(</p>
      )}
          <Routes>
      
          </Routes>
    </>
  );
};

export default BestBooks;
