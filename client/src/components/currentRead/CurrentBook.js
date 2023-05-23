import React, { useContext, useEffect, useState } from "react";
import "./currentBook.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import BookImg from "./book.png";
import Comment from "../comments/Comment";
import Notes from "../notes/Notes";
import axios from "axios";
// import { AuthContext } from "../../authContext/AuthContext";

const CurrentBook = ({ currentBookId }) => {
  // const { user } = useContext(AuthContext);
  const [currentBookInfo, setCurrentBookInfo] = useState(null);
  const [currentView, setCurrentView] = useState("null");
  console.log(currentBookId);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${currentBookId}`
        );
        setCurrentBookInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBook();
  }, [currentBookId]);

  if (!currentBookInfo) {
    return <div>Loading...</div>;
  }

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
    currentView === "comment"
      ? setCurrentView("null")
      : setCurrentView("comment");
  };
  const handleNotes = () => {
    currentView === "note" ? setCurrentView("null") : setCurrentView("note");
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
  console.log(currentBookInfo);
  return (
    <div className="current_book_cont">
      {/* Heading */}
      <h3 className="current_flag">Current Book</h3>
      <h2>{currentBookInfo.volumeInfo.title}</h2>
      {/* info container */}
      <div className="info_cont">
        <div className="img_cont">
          <img src={currentBookInfo.volumeInfo.imageLinks.thumbnail} alt="" />
        </div>

        <div className="text_cont">
          <ul style={{ listStyle: "none", padding: "0" }}>
            <li>
              <p>
                <span>Author: </span>
                {currentBookInfo.volumeInfo.authors}
              </p>
            </li>
            <li>
              <p>
                <span>Genre: </span> {currentBookInfo.volumeInfo.categories[0]}
              </p>
            </li>
            <li>
              <p>
                <span>Pages: </span> {currentBookInfo.volumeInfo.pageCount}
              </p>
            </li>
            <li>
              <p>
                <span>Isbn_10: </span>
                {currentBookInfo.volumeInfo.industryIdentifiers[0].identifier}
              </p>
            </li>
            <li>
              <p>
                <span>Description: </span>
                {TEMP_VALUES.desc}
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Button */}
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

      {/* View Container */}
      <div className="view_cont">
        {currentView === "comment" && <h2>Comments</h2>}
        {currentView === "note" && <h2>Notes</h2>}
        <div className={currentView === "null" ? "hidden" : "view_info_cont"}>
          {currentView === "comment" && (
            <div className="list_cont">
              {temp_cmnt.map((x) => (
                <Comment name={x.name} date={x.date} comment={x.comment} />
              ))}
            </div>
          )}
          {currentView === "note" && (
            <div className="list_cont">
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
    </div>
  );
};

export default CurrentBook;
