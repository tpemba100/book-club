import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./bestSellerShow.css";
import { AuthContext } from "../../authContext/AuthContext";
import { toast } from "react-toastify";
import {
  updateFailure,
  updateSuccess,
  updateStart,
} from "../../authContext/AuthAction";

// 1. Fetch Best Seller Book from Ny Times Book application, save in state
// 2. Display the Books similar to Search Components
// 3. When the Add Book button is pressed.
//     -> .1 take the book title and do a search query in Google Api
//     -> .2 Take the first search Result and take its book Id
//     -> .3 Then post the book Id to the user's bookList and ReRender the list
const BestSellerShow = () => {
  const [bestSellerBooks, setBestSellerBooks] = useState([]);

  const nyURL = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=`;
  // const nyTimesKey = "33KJGAGn6NGTlEjlh9gnnc1atJcBlzdy";
  const nyTimesKey = process.env.REACT_APP_NYTIMES_KEY;
  const resultAmount = 8;
  const googleURL = "https://www.googleapis.com/books/v1/volumes";
  const googleKey = process.env.REACT_APP_GOOGLE_KEY;

  const { user, error, URL } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);

  // 1. Fetch Best Seller Book from Ny Times Book application
  useEffect(() => {
    const bestSold = async () => {
      const response = await axios.get(`${nyURL}${nyTimesKey}`);
      setBestSellerBooks(response.data.results.books);
    };
    bestSold();
  }, []);

  bestSellerBooks.splice(resultAmount);
  // console.log(bestSellerBooks);

  // 3. When the Add Book button is pressed.
  //     -> .1 take the book title and do a search query in Google Api
  //     -> .2 Take the first search Result and take its book Id
  const handleAddBook = (title, author) => {
    getGoogleId(title, author);
    // console.log(`${title} and  ${author}`);
  };

  const getGoogleId = async (title, author) => {
    const response = await axios.get(
      `${googleURL}?key=${googleKey}&langRestrict=en&maxResults=1&orderBy=relevance&q=intitle:${title}+inauthor:${author}`
    );
    console.log(response.data.items[0].volumeInfo.title);
    addBook(response.data.items[0].id);
  };

  // 3. When the Add Book button is pressed.
  //     -> .3 Then post the book Id to the user's bookList and ReRender the list

  // POST: add book Id to Book Collection of USER in Database
  const addBook = async (bookId) => {
    const res = await axios
      .put(URL + `/api/users/${user._id}/bookList/${bookId}`, {
        //user id & book id
        _id: user._id,
        bookId,
      })
      .then((res) => {
        console.log("Sucessfuly Updated User's Book Collection! : PUT ");
        console.log(res.data);
        refreshUser();
        notify();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // refetch the updated data from backend
  const refreshUser = async () => {
    try {
      console.log("user new book state update started");
      const res = await axios.get(URL + `/api/users/${user._id}`);
      dispatch(updateSuccess(res.data));
      console.log("user new bookState updated Sucess!!");
    } catch (err) {
      dispatch(updateFailure());
      console.log("user new bookState Updated Failed!");
    }
  };

  const notify = () =>
    toast.success(" Book added successfully!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    // 2. Display the Books similar to Search Components
    <>
      <h2 className="bestSeller_header heading-font">Best Selling Books</h2>
      <div className="best-bookCard_cont">
        {bestSellerBooks.map((book, i) => (
          <div className="best-bookCont" key={i}>
            <div className="best-book-card">
              {/* <p className="rank-txt">Rank No: {book.rank}</p> */}
              <div className="best-book-card-image">
                {book.book_image ? (
                  <img src={book.book_image} alt="Book cover" />
                ) : (
                  <img
                    src="https://www.actbus.net/fleetwiki/images/8/84/Noimage.jpg"
                    alt="Book cover"
                  />
                )}
              </div>
              <div className="best-book-card-info">
                <h3 className="best-book-title">{book.title}</h3>
                <p className="best-book-author">{book.author}</p>
                <button
                  className="best-add-button"
                  // onClick={() => {
                  // setBestSellerTitle(book.title);
                  // setbestSellerAuthor(book.author);
                  // }}
                  // onClick={handleAddBook(book.title, book.author)}
                  onClick={() => {
                    handleAddBook(book.title, book.author);
                  }}
                >
                  Add Book
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* <p className="ny_cite">
          Data provided by the NY Times Book API
          (https://developer.nytimes.com/docs/books-product/1/overview)
        </p> */}
      </div>
    </>
  );
};

export default BestSellerShow;
