import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./bookList.css";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import { toast } from "react-toastify";

import { updateFailure, updateSuccess } from "../../authContext/AuthAction";

function BookList() {
  //useContext:  state managment through out app
  const { user, URL } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);

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

  // if i click -> selected book. if its already selected, clear out
  const handleSelect = (book) => {
    setSelectedBook(selectedBook === book ? null : book);
  };

  // WILL DO ACTIONS Like Delete Book, Set Book as Current Read & Go to Detailed Book Page
  // 1. set as current page: addBook() to user.currentBook.. --> api route, api model, POST:, updateUser()/Refresh
  //    - then show a little inticator for current book in bookList
  // 2. delete a book from bookList: get bookId() then do DELETE REQUEST using filter. Then Update user/refresh
  // 3. Go to Detail Book View -> navigate with bookId to new page (/book-view) w/ currentRead component
  //    - hardcode mock up detail for note and comment only

  // POST: add book Id to Book Collection of USER in Database
  // PUT: UPDATING THE CURRENT BOOK

  const updateCurrentBook = async (bookId) => {
    const res = await axios
      .put(URL + `/api/users/${user._id}/currentBook/${bookId}`, {
        _id: user._id,
        bookId,
      })
      .then((res) => {
        console.log("Sucessfuly Added User's CurrentBook Collection! : PUT ");
        console.log(res.data);
        refreshUser();
        notify("book");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Delete Book
  // Delete Book
  // Delete Book
  const deleteBook = async (book) => {
    try {
      const res = await axios.delete(
        URL + `/api/users/${user._id}/bookList/${book.id}`,
        {
          userId: user._id,
          bookId: book.id,
        }
      );
      console.log("Book deleted successfully!");
      console.log(res.data);
      refreshUser();
    } catch (error) {
      console.log(error.message);
    }
  };

  //refetch the updated data from backend
  //refetch the updated data from backend
  //refetch the updated data from backend
  const refreshUser = async () => {
    try {
      console.log("user new book state update started");
      const res = await axios.get(URL + `/api/users/${user._id}`);
      dispatch(updateSuccess(res.data));
      console.log(res.data);
      console.log("user new bookState updated Sucess!!");
    } catch (err) {
      dispatch(updateFailure());
      console.log("user new bookState Updated Failed!");
    }
  };

  // notification pop up
  const notify = (item) => {
    if (item === "book") {
      toast.success("Book current successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.success("Share Link copied!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  //actions: set currentBook, update user state, refreshUser
  // action button in form
  const handleSubmit = (action, book) => {
    if (action === "setCurrent") {
      console.log("setting Current book");
      console.log(book.id);
      updateCurrentBook(book.id);
      console.log(user);
    } else if (action === "remove") {
      console.log("deleting the book");
      console.log(booksInfo);
      deleteBook(book);
    } else if (action === "moreInfo") {
      console.log("more Book Info");
      console.log(book.id);
    }
  };
  const handleCopy = () => {
    // const textToCopy = `http://localhost:3000/share/${user._id}`;
    const textToCopy = `https://bookshare-now.onrender.com/?/login#/share/${user._id}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      console.log("Text copied to clipboard");
    });
    notify();
  };

  console.log(user.currentBook[0]);

  return (
    <div className="list-cont">
      <h1 className="heading-font">BOOK LIST</h1>
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
              {/* <img src={BookImg} /> */}
              <img src={book.volumeInfo.imageLinks?.smallThumbnail || ""} />
            </div>
            <div className="bookList_info">
              {/* If there is a list in current Book then We display that else empty */}

              {user.currentBook[0] === book.id ? (
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
                <div className="view_book_btns">
                  {/* need to change the class name frrom currentRemove to something else */}
                  <div className="currentRemove">
                    {/* Button to set CURRENT BOOK from booklist */}
                    <input
                      type="submit"
                      className="currentBtn"
                      value="Current"
                      onClick={(event) => {
                        event.stopPropagation(); // Prevent event propagation
                        handleSubmit("setCurrent", book);
                        console.log(book.id);
                      }}
                    />
                    {/* Button to REMOVE book from booklist */}
                    <input
                      type="submit"
                      className="removeBtn"
                      value="Remove"
                      onClick={(event) => {
                        event.stopPropagation(); // Prevent event propagation
                        handleSubmit("remove", book);
                        console.log(book.id);
                      }}
                    />
                  </div>
                  {/* Button to view MORE INFO of book */}
                  {/* sends book ID to book-info page with state */}
                  <div className="more-info-btn">
                    <Link
                      to={`/book-info?${book.id}`}
                      state={book.id}
                      className="custom-link"
                    >
                      <input
                        type="submit"
                        className="currentBtn"
                        value="More Info"
                      />
                    </Link>
                  </div>
                </div>
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
      <div className="btn_bookList">
        <button className="searchInputBtn" onClick={handleCopy}>
          Share
        </button>
      </div>
    </div>
  );
}

export default BookList;
