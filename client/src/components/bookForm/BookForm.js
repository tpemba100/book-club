import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import { useState, useContext } from "react";
import BookContext from "../../BookContext";
import "./bookForm.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../authContext/AuthContext";
// import { doUpdate } from "../../authContext/apiCalls";

function BookForm() {
  // const URL = "http://localhost:8800/api/books";
  const { bookList, setBookList, URL } = useContext(BookContext);

  const { dispatch } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  console.log(user);
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
  const EMPTY_VALUES = {
    title: "",
    author: "",
    isbn: "",
    pages: "",
    genre: "",
  };

  // BOOK Values
  const [values, setValues] = useState(EMPTY_VALUES);

  // Button Component: Style for Button with hover
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));

  //Text Field Styles
  const styles = {
    textField: {
      backgroundColor: "white",
    },
  };

  // event change handler for each TextField
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  // SUBMIT: POST/ Send the Book Values to back end Operations and then Database
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(values);
    console.log(JSON.stringify(values));
    //POST the movie data to backend routes
    postBooks();

    setValues(EMPTY_VALUES);
  };

  // POST: ADDS Book information to book collection ONLY in Database
  const postBooks = async () => {
    try {
      // POST form book info to book database --
      const res = await axios.post(URL + `/api/books`, values);
      //adds a new book object to the existing bookList array in state.
      setBookList([...bookList, res.data._id]);
      console.log(res.data._id);
      // call the update book function
      console.log("Book Added Sucessfuly !! : POST");
      console.log(bookList);
      notify();
      updateBook();
    } catch (err) {
      console.log(err);
    }
  };

  // PUT: updated the Book Collection of USER in Database with bookList State of USER
  const updateBook = async () => {
    console.log(bookList);
    // does a PUT request to update the users boolist in Database
    const res = await axios
      .put(URL + `/api/users/${user._id}/bookList`, {
        bookList: bookList,
      })
      .then((res) => {
        console.log(user);
        console.log("Sucessfuly Updated User's Book Collection! : PUT ");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    //To refresh and get new data form databse
    //   try {
    //     doUpdate({ _id: user._id }, dispatch);
    //   } catch (error) {
    //     console.log(error);
    //   }
  };

  return (
    <div className="book-cont">
      <h2>ADD BOOK FORM</h2>
      <div className="book-form">
        <TextField
          label="Book Title"
          variant="outlined"
          margin="dense"
          value={values.title}
          sx={styles.textField}
          onChange={handleChange("title")}
        />
        <TextField
          label="Author"
          variant="outlined"
          margin="dense"
          sx={styles.textField}
          value={values.author}
          onChange={handleChange("author")}
        />
        <TextField
          label="Genre"
          variant="outlined"
          margin="dense"
          value={values.genre}
          sx={styles.textField}
          onChange={handleChange("genre")}
        />
        <TextField
          label="ISBN"
          variant="outlined"
          margin="dense"
          value={values.isbn}
          sx={styles.textField}
          onChange={handleChange("isbn")}
        />
        <TextField
          label="No of Pages"
          variant="outlined"
          margin="dense"
          value={values.pages}
          sx={styles.textField}
          onChange={handleChange("pages")}
        />
      </div>
      <div className="addBtn">
        <ColorButton variant="contained" onClick={handleSubmit}>
          Add Book
        </ColorButton>
      </div>
    </div>
  );
}

export default BookForm;
