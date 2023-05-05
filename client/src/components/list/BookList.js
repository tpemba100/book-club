import React, { useContext, useEffect } from "react";
import BookContext from "../../BookContext";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import "./bookList.css";
import axios from "axios";
// import { AuthContext } from "../../authContext/AuthContext";

function BookList() {
  // const { user } = useContext(AuthContext);

  // getting data(book ids, url, current book id ) from state
  const { bookList, setBookList, URL, currentBook, setCurrentBook } =
    useContext(BookContext);
  // Currently selected book state
  const [selectedBook, setSelectedBook] = useState(null);
  // the users books data
  const [books, setBooks] = useState([]);
  console.log(books);

  // if i click -> selected book. if its already selected, clear out
  const handleClick = (book) => {
    setSelectedBook(selectedBook === book ? null : book);
    setCurrentBook(selectedBook === book ? "null" : book);
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));

  // GET --> with query of book IDs from bookList(users book IDs) from the book data in Mongo
  useEffect(() => {
    const fetchBooks = async () => {
      const bookData = await Promise.all(
        //map thru the user's book IDs --> using GET HTTP request only get that book data --> add to state
        bookList.map(async (bookId) => {
          const response = await axios.get(`${URL}/api/books/${bookId}`);
          return response.data;
        })
      );
      setBooks(bookData);
    };

    fetchBooks();
    // console.log(books);
  }, [bookList]);

  const handleSubmit = () => {
    setCurrentBook("null");
    setSelectedBook(null);
  };

  return (
    <div className="list-cont">
      <h1>BOOK LIST</h1>
      <ul className="book-list">
        {books.map((book) => (
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
      <div className="btn_bookList">
        {currentBook === "null" ? null : (
          <ColorButton variant="contained" onClick={handleSubmit}>
            ADD BOOKS
          </ColorButton>
        )}
      </div>
    </div>
  );
}

export default BookList;
