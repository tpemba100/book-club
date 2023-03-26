import React from "react";

import "./bookSide.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import BookContext from "../../BookContext";
import { useContext } from "react";
// import axios from "axios";
import BookImg from "./book.png";

function BookSide() {
  const { currentBook, setCurrentBook } = useContext(BookContext);

  const TEMP_VALUES = {
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "78687 6876 6786 6786",
    pages: "300",
    genre: "Psychology",
    desc: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
  };

  // // Button Component: Style for Button with hover
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));

  return (
    <div className="book-cont">
      <h2>{currentBook.title}</h2>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <img
            src={BookImg}
            alt=""
            style={{ width: "100%", marginLeft: "1rem" }}
          />
        </div>
        <div style={{ width: "50%", marginRight: "1rem" }}>
          <ul style={{ listStyle: "none" }}>
            <li>Author: {currentBook.author}</li>
            <li>Genre:{currentBook.genre}</li>
            <li>Pages:{TEMP_VALUES.pages}</li>
            <li>Description</li>
            <p>{TEMP_VALUES.desc}</p>
          </ul>
        </div>
      </div>

      <div className="addBtn">
        <ColorButton
          variant="contained"
          // onClick={handleSubmit}
        >
          Learn More...
        </ColorButton>
      </div>
    </div>
  );
}

export default BookSide;
