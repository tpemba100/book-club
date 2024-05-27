import React, { useContext, useEffect, useState } from "react";
// import "./currentBook.css";
import "./currentBookTemp.css";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import CommentSection from "../comments/CommentSection";
import Notes from "../notes/Notes";

const CurrentBook = ({ currentBookId }) => {
  const { user, URL } = useContext(AuthContext);
  const [currentBookInfo, setCurrentBookInfo] = useState(null);
  const [currentView, setCurrentView] = useState("null");
  const theuserId = user._id;
  const thebookId = user.currentBook[0];
  const [displayNote, setDisplayNote] = useState("");

  const notesLength = user.notes.length;
  console.log("Number of notes:", notesLength);
  // console.log(user.note);

  // useEffect(() => {
  //   const fetchBook = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://www.googleapis.com/books/v1/volumes/${currentBookId}`
  //       );
  //       setCurrentBookInfo(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchBook();
  // }, [currentBookId]);

  if (!currentBookInfo) {
    return <div>Loading...</div>;
  }

  const toggleNotes = () => {
    currentView === "note" ? setCurrentView("null") : setCurrentView("note");
    filterNote();
  };

  // getting rid of tagline/ syntax from the description.
  //only dispaly 3 paragraph.
  const htmlToText = currentBookInfo.volumeInfo.description
    .replace(/<[^>]*>/g, "")
    .split(".")
    .slice(0, 3)
    .join(" ");
  const bookDescriptionText = htmlToText;

  // Filter to display only currentBook Notes
  // user.notes.bookId=currentBookId? -> filteredNotes->.map to only display text->filteredText->sett
  const filterNote = () => {
    const filteredNotes = user.notes
      .filter((x) => x.bookId === currentBookId[0])
      .map((x) => x.text);

    setDisplayNote([...filteredNotes]); // Shallow copy of filteredText
  };

  const run = () => {
    console.log("runninggggggggg");
  };
  // Submit Note to Database
  //onSubmit -> sends comment & bookId to server
  const addNote = async (newNote) => {
    try {
      const res = await axios.put(`${URL}/api/users/${theuserId}/notes`, {
        text: newNote,
        bookId: thebookId,
      });
      console.log("Note added successfully", res.data);
      return res.data;
    } catch (err) {
      console.log("Error adding note", err);
      throw err;
    }
  };

  // const refreshNote = () => {
  //   console.log("first");
  //   filterNote();
  // };

  return (
    <div>
      <div className="current_book_cont">
        {/* Heading */}
        <div className="heading">
          <h3 className="desc">Hey {user.username}, you are </h3>
          <h1 className="currentRead">Currently Reading</h1>
          {/* Book Cont */}
          <div className="book-cont">
            {/* bookinfo */}
            <div className="book-info">
              <p className="title">{currentBookInfo.volumeInfo.title}</p>
              <div className="author">
                <span>By </span> {currentBookInfo.volumeInfo.authors}
              </div>

              <div className="book-details">
                <p className="genre">
                  <span>Genre: </span>
                  {(currentBookInfo.volumeInfo.categories &&
                    currentBookInfo.volumeInfo.categories[0]) ||
                    "N/A"}
                </p>
                <p className="page">
                  <span>Pages: </span> {currentBookInfo.volumeInfo.pageCount}
                </p>
                <div className="description">Description</div>
                <div className="div-dzbmd" />

                <p className="paragraph">{bookDescriptionText}</p>
              </div>
              <div style={{ width: "100%", textAlign: "center" }}>
                <button type="button" class="btn-primary" onClick={toggleNotes}>
                  View Notes
                </button>
              </div>
            </div>

            {/* bookImg */}
            <div className="img-cont">
              <img
                src={currentBookInfo.volumeInfo.imageLinks.thumbnail}
                alt=""
              />
            </div>
          </div>

          {/* View Container */}
          {/* View Container */}
          {/* View Container */}

          <div className="view_cont">
            {/* Note Section */}
            {/* Note Section */}
            {currentView === "note" && (
              <div className="note_cont">
                <h2>Notes</h2>
                {/* {temp_notes
                  .slice()
                  .reverse()
                  .map((x, index) => (
                    <div className="notes" key={index}>
                      <Notes note={x.text} />
                    </div>
                  ))} */}
                {displayNote
                  // .slice()
                  // .reverse()
                  .map((x, index) => (
                    <Notes note={x} />
                  ))}
              </div>
            )}

            {/* Comment Section */}
            {/* Comment Section */}
            {/* Comment Section */}
            {/* Render the CommentSection component and pass down the addComment function as props */}
            {/* when we submit in commentSection, it sends the comment to this fucntion in (parent component) */}
            {currentView === "note" && (
              <CommentSection addComment={addNote} run={run} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentBook;
