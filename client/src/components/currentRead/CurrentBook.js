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

  const [temp_notes, setNotes] = useState([
    {
      text: "I love this book, it makes me feel happy",
    },
    {
      text: "The author talks about stuff that are very interesting",
    },
  ]);

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

  const handleNotes = () => {
    currentView === "note" ? setCurrentView("null") : setCurrentView("note");
  };
  // getting rid of tagline/ syntax from the description.
  //only dispaly 3 paragraph.
  const htmlToText = currentBookInfo.volumeInfo.description
    .replace(/<[^>]*>/g, "")
    .split(".")
    .slice(0, 3)
    .join(" ");
  const bookDescriptionText = htmlToText;

  // Adds a new comment to the list of notes from the commentSection
  const addComment = (newNote) => {
    // Updates the notes state by spreading the current temporary notes and adding a new note object
    // setNotes([...temp_notes, { text: newNote }]);
    //calls the REst Api fucntion
    addNote(newNote);
  };

  // sendind data to server
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
                <button type="button" class="btn-primary" onClick={handleNotes}>
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
                {/* <h1>{user.note[0].text}</h1> */}
                {temp_notes
                  .slice()
                  .reverse()
                  .map((x, index) => (
                    <div className="notes" key={index}>
                      <Notes note={x.text} />
                    </div>
                  ))}
              </div>
            )}

            {/* Comment Section */}
            {/* Comment Section */}
            {/* Comment Section */}
            {/* Render the CommentSection component and pass down the addComment function as props */}
            {/* when we submit in commentSection, it sends the comment to this fucntion in (parent component) */}
            {currentView === "note" && (
              <CommentSection addComment={addComment} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentBook;
