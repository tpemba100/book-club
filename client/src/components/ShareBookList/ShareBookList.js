import React, { useEffect } from "react";
import { useState } from "react";
import "./shareBookList.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function ShareBookList() {
  const { userId } = useParams();
  const [userData, setUserData] = useState([]);
  //BOOK COLLECTION ID'S
  const [booksInfo, setBooksInfo] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    if (userId) {
      const storedUser = localStorage.getItem("user");
      console.log(storedUser);
      if (storedUser !== null) {
        fetchUserandData(userId, storedUser);
      } else {
        fetchUserandData(userId);
      }
    }
  }, [userId]);

  // const URLpath = "http://localhost:8800";
  const URLpath = "https://lowkey-bookclub-api.onrender.com";

  //FETCH USER
  const fetchUserandData = async (userId, storedUser) => {
    try {
      const res = await axios.get(URLpath + `/api/users/${userId}`, {
        userId: userId,
        stored: storedUser,
      });
      console.log(res.data);
      setUserData(res.data);

      const bookData = await Promise.all(
        res.data.bookList.map(async (bookId) => {
          const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes/${bookId}`
          );
          return response.data;
        })
      );
      setBooksInfo(bookData);
    } catch (err) {
      console.log("fetching User Data Failed!");
    }
  };

  //HANDLE SELECT TOGGLE
  const handleSelect = (book) => {
    setSelectedBook(selectedBook === book ? null : book);
  };

  return (
    // <div>hello</div>
    <div className="list-cont">
      <h1 className="heading-font">{userData.username}'s BOOK LIST</h1>
      <ul className="book-list">
        {booksInfo.map((book, i) => (
          <li
            key={i}
            className={`book-element ${
              selectedBook === book ? "selected" : ""
            }`}
            onClick={() => handleSelect(book)}
          >
            <div className="bookList_img">
              <img src={book.volumeInfo.imageLinks.smallThumbnail} />
            </div>
            <div className="bookList_info">
              {userData.currentBook[0] === book.id ? (
                <h3
                  className="current_title"
                  style={{
                    color: "DarkBlue",
                  }}
                >
                  Currently Reading
                </h3>
              ) : (
                " "
              )}
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors}</p>

              {/* SELECTED BOOK VIEW */}
              {/* SELECTED BOOK VIEW */}
              {/* SELECTED BOOK VIEW */}
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
                  {book.volumeInfo.categories && (
                    <p>
                      Category: <span>{book.volumeInfo.categories[0]}</span>
                    </p>
                  )}
                  <p>
                    Total Page: <span>{book.volumeInfo.pageCount}</span>
                  </p>
                  <p>
                    Published: <span>{book.volumeInfo.publishedDate}</span>
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShareBookList;
