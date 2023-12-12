import { useState } from 'react'
import axios from 'axios';

import Books from '../../src/components/Books.jsx'

let SERVER = import.meta.env.VITE_SERVER;

function App() {
  const [books, setBooks] = useState(0)

  async function fetchBooks() {
    try {
      let response = await axios.get(`${SERVER}/books`) 
      setBooks( response.data );
    } catch(e) { console.error(e.message); }
  }

  return (
    <>
  
      <h1>Kidd & Stone Books</h1>
      <div className="card">
      <button onClick={fetchBooks}>See Your Books</button> 
      <Books books={books} />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
