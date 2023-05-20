import React, { useContext, useEffect } from "react";
import BookContext from "../../BookContext";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import "./bookList.css";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";

function BookList() {
  const { user } = useContext(AuthContext);
  //BOOK COLLECTION ID'S
  const [bookId, setBookId] = useState([]);
  //BOOK COLLECTION INFO's
  const [booksInfo, setBooksInfo] = useState([]);
  const { URL, currentBook, setCurrentBook } = useContext(BookContext);
  const [selectedBook, setSelectedBook] = useState(null);

  //{user} Book Collection ID = bookId--->When the user context is updated
  useEffect(() => {
    try {
      if (user.bookList.length !== null) {
        setBookId(user.bookList);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [user]);

  //GET BOOK INFO FROM GOOGLE API
  useEffect(() => {
    const fetchBooks = async () => {
      const bookData = await Promise.all(
        //map thru the user's book IDs --> using GET HTTP request only get that book data --> add to state
        bookId.map(async (bookId) => {
          const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes/${bookId}`
          );
          return response.data;
        })
      );
      setBooksInfo(bookData);
    };
    fetchBooks();
  }, [bookId]);
  console.log(booksInfo);

  // GET BOOK INFO FROM DATABASE
  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     const bookData = await Promise.all(
  //       //map thru the user's book IDs --> using GET HTTP request only get that book data --> add to state
  //       bookId.map(async (bookId) => {
  //         const response = await axios.get(`${URL}/api/books/${bookId}`);
  //         return response.data;
  //       })
  //     );
  //     setBooksInfo(bookData);
  //   };
  //   fetchBooks();
  // }, [bookId]);

  // if i click -> selected book. if its already selected, clear out
  const handleSelect = (book) => {
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

  const handleSubmit = () => {
    setCurrentBook("null");
    setSelectedBook(null);
  };

  return (
    <div className="list-cont">
      <h1>BOOK LIST</h1>
      <ul className="book-list">
        {booksInfo.map((book) => (
          <li
            key={book._id}
            className="book-element"
            onClick={() => handleSelect(book)}
            style={{
              transform: selectedBook === book ? "translateX(60px)" : "none",
            }}
          >
            {book.volumeInfo.title}
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
