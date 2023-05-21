import React, { useEffect } from "react";
import { useState, useContext } from "react";
import BookContext from "../../BookContext";
import "./bookForm.css";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../authContext/AuthContext";
import { useForm } from "react-hook-form";
import {
  updateFailure,
  updateSuccess,
  updateStart,
} from "../../authContext/AuthAction";

function BookForm() {
  const { user, error } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);

  console.log(user);

  const { URL } = useContext(BookContext);

  //useForm to update and register data, handleSubmit and formState (react hook form)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    postBooks(data);
  };

  const postBooks = async (data) => {
    try {
      // POST form book info to book database --
      const res = await axios.post(URL + `/api/books`, data);
      // console.log("POST --- postBooks(book Info) --> /api/books");
      console.log("Book Added Sucessfuly !! : POST");
      notify();
      addBook(res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  // POST: add book Id to Book Collection of USER in Database
  const addBook = async (bookId) => {
    console.log(user);
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  //     //adds a new book object to the existing bookList array in state.
  //     setBookList([...bookList, res.data._id]);
  return (
    <div className="book-cont">
      <h2>ADD BOOK FORM</h2>
      <div className="book_form_cont">
        <form className="book_form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p>Book Title</p>
            <input
              type="text"
              placeholder="Enter Book Title"
              {...register("title", { required: true, maxLength: 80 })}
            />
            <span className="error_message">
              {errors.title && <p className="error">Username is required</p>}
            </span>
          </div>
          <div>
            <p>Author</p>
            <input
              type="text"
              placeholder="Enter Book Author"
              {...register("author", { required: true, maxLength: 80 })}
            />
            <span className="error_message">
              {errors.author && <p className="error">Username is required</p>}
            </span>
          </div>
          <div>
            <p>Genre</p>
            <input
              type="text"
              placeholder="Enter Book Genre"
              {...register("genre", { required: true, maxLength: 80 })}
            />
            <span className="error_message">
              {errors.genre && <p className="error">Genre is required</p>}
            </span>
          </div>
          <div>
            <p>Isbn</p>
            <input
              type="text"
              placeholder="Enter Isbn"
              {...register("isbn", { required: false, pattern: 1 / 9 })}
            />
            <span className="error_message">
              {errors.isbn && <p className="error"> is required</p>}
            </span>
          </div>
          <div>
            <p>Pages</p>
            <input
              type="text"
              placeholder="Enter Pages"
              {...register("pages", { required: false, pattern: 1 / 9 })}
            />
            <span className="error_message">
              {errors.pages && <p className="error"> is required</p>}
            </span>
          </div>
          {/* Sign in */}
          <input type="submit" className="inputBtn " value="Sign in" />
        </form>
      </div>
      {/* <div className="addBtn">
        <ColorButton variant="contained" onClick={handleSubmit}>
          Add Book
        </ColorButton>
      </div> */}
    </div>
  );
}

export default BookForm;
