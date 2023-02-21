// import "./App.css";
import BookForm from "./components/bookForm/BookForm";
import BookList from "./components/list/BookList";
import BookContext from "./BookContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [bookList, setBookList] = useState([]);
  // const URL = "http://localhost:8800/api/books";
  const URL = "https://lowkey-bookclub-api.onrender.com";

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get(URL);
        setBookList(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBooks();
  }, []);

  return (
    <div className="App">
      <BookContext.Provider value={{ bookList, setBookList, URL }}>
        <BookForm />
        <BookList />
      </BookContext.Provider>
    </div>
  );
}

export default App;
