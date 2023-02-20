import React, { useContext, useEffect } from "react";
import BookContext from "../../BookContext";
// import axios from "axios";

function BookList() {
  const { bookList, setBookList, URL } = useContext(BookContext);

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {bookList.map((book) => (
          <li key={book._id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
