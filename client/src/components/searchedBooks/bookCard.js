import React, { useState, useContext } from "react";
import axios from "axios";
import "./searchedBook.css";
import { AuthContext } from "../../authContext/AuthContext";
import { toast } from "react-toastify";
import {
  updateFailure,
  updateSuccess,
  updateStart,
} from "../../authContext/AuthAction";

const BookCard = (props) => {
  const { user, error } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);

  const handleAddBook = () => {
    addBook(props.data.id);
  };

  // POST: add book Id to Book Collection of USER in Database
  const addBook = async (bookId) => {
    const res = await axios
      .put(
        `https://lowkey-bookclub-api.onrender.com` +
          `/api/users/${user._id}/bookList/${bookId}`,
        {
          //user id & book id
          _id: user._id,
          bookId,
        }
      )
      .then((res) => {
        console.log("Sucessfuly Added User's Book Collection! : PUT ");
        console.log(res.data);
        refreshUser();
        notify();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //refetch the updated data from backend
  const refreshUser = async () => {
    console.log(user._id);
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
    <div className="book-card">
      <div className="book-card-image">
        {props.data.volumeInfo.imageLinks &&
        props.data.volumeInfo.imageLinks.smallThumbnail ? (
          <img
            src={props.data.volumeInfo.imageLinks.smallThumbnail}
            alt="Book cover"
          />
        ) : (
          <img
            src="https://www.actbus.net/fleetwiki/images/8/84/Noimage.jpg"
            alt="Book cover"
          />
        )}
      </div>
      <div className="book-card-info">
        <h3 className="book-title">{props.data.volumeInfo.title}</h3>
        <p className="book-author">{props.data.volumeInfo.authors}</p>
        <button className="add-button" onClick={handleAddBook}>
          Add Book
        </button>
      </div>
    </div>
  );
};

export default BookCard;
