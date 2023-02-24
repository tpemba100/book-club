import React, { useContext, useEffect } from "react";
import BookContext from "../../BookContext";
import { useState } from "react";
import "./bookList.css";
// import axios from "axios";

function BookList() {
  // getting data from state
  const { bookList, setBookList, URL } = useContext(BookContext);
  // Currently selected book state
  const [selectedBook, setSelectedBook] = useState(null);

  // if i click -> selected book. if its already selected, clear out
  const handleClick = (book) => {
    setSelectedBook(selectedBook === book ? null : book);
  };
  return (
    <div className="list-cont">
      <h1>BOOK LIST</h1>
      <ul className="book-list">
        {bookList.map((book) => (
          <li
            key={book._id}
            className="book-element"
            onClick={() => handleClick(book)}
            style={{
              transform: selectedBook === book ? "translateX(60px)" : "none",
            }}
          >
            {book.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
