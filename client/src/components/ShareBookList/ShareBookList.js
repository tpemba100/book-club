import React, { useEffect } from "react";
import { useState } from "react";
import "./shareBookList.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function ShareBookList() {
  //PRODUCTION SETTING
  const URLpath = "http://localhost:8800";
  // const URLpath = "https://lowkey-bookclub-api.onrender.com";

  const { userId } = useParams(); //GET USER ID FROM PATH
  const [userData, setUserData] = useState([]);
  //BOOK COLLECTION ID'S
  const [booksInfo, setBooksInfo] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [displayNote, setDisplayNote] = useState("");

  // get userData from local Storage to see if users are loggeg in or not
  useEffect(() => {
    if (userId) {
      console.log(userId);
      const storedUser = localStorage.getItem("user");
      if (storedUser !== null) {
        fetchUserandData(userId, storedUser);
        console.log("expecting all userData");
      } else {
        localStorage.setItem("user", userId);
        fetchUserandData(userId);
        console.log("expecting limited data");
      }
    }
  }, []);

  //FETCH USER DATA FROM SERVER WITH USER ID, ALONG WITH LOGGED IN USER DATA
  const fetchUserandData = async (userId, storedUser) => {
    try {
      const res = await axios.get(URLpath + `/api/users/${userId}`, {
        userId: userId,
        stored: storedUser,
      });
      console.log(res.data);
      setUserData(res.data);

      // ONCE ER GET DATA FROMS ERVER, FETCH BOOK DATA FROM GOOGLE API AND SAVE TO STATE
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

  //HANDLE SELECT TOGGLE TO VIEW MORE INFO ON SELECTED BOOK
  const handleSelect = (book) => {
    setSelectedBook(selectedBook === book ? null : book);
    setSelectedBookId(book.id);
    //AND RUN FILTER NOTES WHEN SELECTED
    filterNote();
    console.log(book);
    console.log(selectedBookId);
  };

  // FILTER NOTE FUNCTION TO ONLY SAVE NOTES FROM SELECTED BOOK ONLY TO STATE
  const filterNote = () => {
    if (userData.notes) {
      const filteredNotes = userData.notes
        .filter((note) => note.bookId === selectedBookId)
        .map((note) => note);

      setDisplayNote([...filteredNotes]); // SAVE THE SILTERED TO DISPALYNOTE
      console.log(filteredNotes);
    } else console.log("no Notes");
  };

  // REFRESH FILTER EVERYTIME WHEN SELECTEDBOOKID IS UPDATED, INCLUDING FIRST RENDER
  useEffect(() => {
    filterNote(selectedBookId);
  }, [selectedBookId]);

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
              {/* HIDDEN RN, ONLY DISPALED WHEN SELECTED */}
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
                  <p>
                    Published: <span>{book.volumeInfo.publishedDate}</span>
                  </p>

                  <div className="note_cont">
                    <h2 className="heading-font">
                      {/* <SlNote /> &nbsp; Notes */}
                    </h2>
                    {displayNote &&
                      displayNote.length > 0 &&
                      displayNote
                        .slice()
                        .reverse()
                        .map((note) => (
                          <blockquote
                            style={{
                              fontSize: "18px",
                              fontStyle: "italic",
                              padding: "20px",
                              borderLeft: "5px solid #ccc",
                            }}
                          >
                            &quot;{note.text}&quot;
                          </blockquote>
                        ))}
                  </div>
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
