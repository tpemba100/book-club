import React from "react";
import { TextField } from "@mui/material";
import { useState, useContext } from "react";
import BookContext from "../../BookContext";
import "./bookForm.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import axios from "axios";

function BookForm() {
  // const URL = "http://localhost:8800/api/books";
  const { bookList, setBookList, URL } = useContext(BookContext);

  // BOOK Values
  const [values, setValues] = useState({
    title: "",
    author: "",
    isbn: "",
    pages: "",
    genre: "",
  });

  // Button Component: Style for Button with hover
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));

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
  };

  const postBooks = async () => {
    try {
      // const res = await axios.post(`/api/books`, values);
      const res = await axios.post(URL, values);
      setBookList([...bookList, res.data]);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="book-cont">
      <h1>Book Add Form</h1>
      <div className="book-form">
        <TextField
          label="Book Title"
          variant="outlined"
          margin="dense"
          value={values.title}
          onChange={handleChange("title")}
        />
        <TextField
          label="Author"
          variant="outlined"
          margin="dense"
          value={values.author}
          onChange={handleChange("author")}
        />
        <TextField
          label="Genre"
          variant="outlined"
          margin="dense"
          value={values.genre}
          onChange={handleChange("genre")}
        />
        <TextField
          label="ISBN"
          variant="outlined"
          margin="dense"
          value={values.isbn}
          onChange={handleChange("isbn")}
        />
        <TextField
          label="No of Pages"
          variant="outlined"
          margin="dense"
          value={values.pages}
          onChange={handleChange("pages")}
        />
      </div>

      <ColorButton variant="contained" onClick={handleSubmit}>
        Add Book
      </ColorButton>
    </div>
  );
}

export default BookForm;
