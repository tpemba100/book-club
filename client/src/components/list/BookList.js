import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
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
  // console.log(booksInfo);

  // if i click -> selected book. if its already selected, clear out
  const handleSelect = (book) => {
    setSelectedBook(selectedBook === book ? null : book);
  };
  // console.log(selectedBook);

  // WILL DO ACTIONS Like Delete Book, Set Book as Current Read & Go to Detailed Book Page
  // 1. set as current page: addBook() to user.currentBook.. --> api route, api model, POST:, updateUser()/Refresh
  //    - then show a little inticator for current book in bookList
  // 2. delete a book from bookList: get bookId() then do DELETE REQUEST using filter. Then Update user/refresh
  // 3. Go to Detail Book View -> navigate with bookId to new page (/book-view) w/ currentRead component
  //    - dispaly all detail info plus the note and comment section.
  //    - hardcode mock up detail for note and comment only
  const handleSubmit = (action) => {
    console.log(action);
  };

  return (
    <div className="list-cont">
      <h1>BOOK LIST</h1>
      <ul className="book-list">
        {booksInfo.map((book) => (
          <li
            key={book._id}
            className={`book-element ${
              selectedBook === book ? "selected" : ""
            }`}
            onClick={() => handleSelect(book)}
          >
            <div className="bookList_img">
              <img src={book.volumeInfo.imageLinks.smallThumbnail} />
            </div>
            <div className="bookList_info">
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors}</p>

              {/* SELECTED VIEW */}
              <div
                className="more_info"
                style={{
                  display: selectedBook === book ? "block" : "none",
                }}
              >
                <p>
                  <span>{book.volumeInfo.subtitle}</span>
                </p>

                <div className="mini_info">
                  <p>
                    Category: <span>{book.volumeInfo.categories[0]}</span>
                  </p>
                  <p>
                    Total Page: <span>{book.volumeInfo.pageCount}</span>
                  </p>
                  <p>
                    Published: <span>{book.volumeInfo.publishedDate}</span>
                  </p>
                </div>
                <div className="view_book_btns">
                  <input
                    type="submit"
                    className=" currentBtn"
                    value="Set as Current"
                    onClick={() => {
                      handleSubmit("setCurrent");
                    }}
                  />
                  <p
                    className="removeBtn"
                    onClick={() => {
                      handleSubmit("remove");
                    }}
                  >
                    Remove
                  </p>
                </div>
                <p
                  className="removeBtn"
                  style={{ color: "blue" }}
                  onClick={() => {
                    handleSubmit("moreInfo");
                  }}
                >
                  More Info
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="btn_bookList">
        <Link to="/search" className="custom-link">
          <input type="submit" className="searchInputBtn" value="Add Books" />
        </Link>
      </div>
    </div>
  );
}

export default BookList;
