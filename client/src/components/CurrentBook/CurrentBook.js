import React from "react";

import "./currentBook.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import BookContext from "../../BookContext";
import { useContext, useState } from "react";
import BookImg from "./book.png";
import Comment from "../comments/Comment";
import Notes from "../notes/Notes";

const CurrentBook = () => {
  const [currentView, setCurrentView] = useState("null");
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

  const handleComment = () => {
    setCurrentView("comment");
  };
  const handleNotes = () => {
    setCurrentView("note");
  };

  const temp_cmnt = [
    {
      name: "Tsering Pemba",
      date: "11:50am, Jan 1 2023",
      comment: "This i jsut another comment. i like this book very much",
    },
    {
      name: "Dolma Lama",
      date: "11:50am, Jan 7 2023",
      comment: "I liek book .asd asd asdadfgeg sdfnst asdas ",
    },
    {
      name: "Jack Lama",
      date: "11:50am, Jan 7 2023",
      comment:
        "sperts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master",
    },
    {
      name: "John Wick",
      date: "11:50am, Jan 7 2023",
      comment: "ncie books. love this book man",
    },
  ];

  const temp_notes = [
    {
      chapter: "4",
      quote: "Once upon a time",
      note: "I love this because its the starting odf every story and i rememer this as a kid. a very important part oof our childhood.",
    },
    {
      chapter: "7",
      quote: "Journalong is fun",
      note: "I love to Jounral because it feels good emotionally and physically.",
    },
    {
      chapter: "8",
      quote: "Once upon a time",
      note: "I love this because its the starting odf every story and i rememer this as a kid. a very important part oof our childhood.",
    },
    {
      chapter: "49",
      quote: "Once upon a time",
      note: "I love this because its the starting odf every story and i rememer this as a kid. a very important part oof our childhood.",
    },
  ];

  return (
    <div className="current_book_cont">
      <h3>Current Book</h3>
      <h2>Atomic Habits</h2>
      <div className="info_cont">
        <div className="img_cont">
          <img src={BookImg} alt="" />
        </div>
        <div className="text_cont">
          <ul style={{ listStyle: "none" }}>
            <li>
              <p>Author: {TEMP_VALUES.author}</p>
            </li>
            <li>
              <p>Genre:{TEMP_VALUES.genre}</p>
            </li>
            <li>
              <p>Pages:{TEMP_VALUES.pages}</p>
            </li>
            <li>
              <p>isbn:{TEMP_VALUES.isbn}</p>
            </li>
            <li>
              <p>Description</p>
            </li>
            <p>{TEMP_VALUES.desc}</p>
          </ul>
          <div className="btn_cont">
            <div className="addBtn">
              <ColorButton variant="contained" onClick={handleComment}>
                View Comments
              </ColorButton>
            </div>
            <div className="addBtn">
              <ColorButton variant="contained" onClick={handleNotes}>
                View Notes
              </ColorButton>
            </div>
          </div>
        </div>
      </div>
      <div className="view_cont">
        {currentView === "comment" && <h2>Comments</h2>}
        {currentView === "note" && <h2>Notes</h2>}
        <div className={currentView === "null" ? "hidden" : "view_info_cont"}>
          {currentView === "comment" && (
            <div>
              {temp_cmnt.map((x) => (
                <Comment name={x.name} date={x.date} comment={x.comment} />
              ))}
            </div>
          )}
          {currentView === "note" && (
            <div>
              {temp_notes.map((x) => (
                <div
                  style={{
                    border: "1px solid rgb(150, 150, 150)",
                    boxShadow: "0 2px 6px rgba(168, 168, 168, 0.4)",
                    borderRadius: "10px",
                    marginBottom: "1rem",
                  }}
                >
                  <Notes chapter={x.chapter} quote={x.quote} note={x.note} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div style={{ height: "200px" }}>TEmp Spacer</div>
    </div>
  );
};

export default CurrentBook;
