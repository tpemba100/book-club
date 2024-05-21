import React, { useContext, useEffect, useState } from "react";
// import "./currentBook.css";
import "./currentBookTemp.css";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import CommentSection from "../comments/CommentSection";
import Notes from "../notes/Notes";

const CurrentBook = ({ currentBookId }) => {
  const { user } = useContext(AuthContext);
  const [currentBookInfo, setCurrentBookInfo] = useState(null);
  const [currentView, setCurrentView] = useState("null");
  const [comments, setComments] = useState([]);

  // console.log(currentBookId);

  const [temp_notes, setNotes] = useState([
    {
      note: "I love this book, it makes me feel happy",
    },
    {
      note: "The author talks about stuff that are very interesting",
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

  // Adds a new comment to the list of notes from the commentSection
  const addComment = (newNote) => {
    // Updates the notes state by spreading the current temporary notes and adding a new note object
    setNotes([...temp_notes, { note: newNote }]);
  };

  const handleNotes = () => {
    currentView === "note" ? setCurrentView("null") : setCurrentView("note");
  };

  const htmlToText = currentBookInfo.volumeInfo.description
    .replace(/<[^>]*>/g, "")
    .split(".")
    .slice(0, 3)
    .join(" ");

  const bookDescriptionText = htmlToText;

  console.log(currentBookInfo);

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
                {/* <p className="paragraph">
                  No matter your goals, Atomic Habits offers a proven framework
                  for improving--every day. James Clear, one of the world's
                  leading experts on habit formation, reveals practical
                  strategies that will teach you exactly how to form good
                  habits, break bad ones, and master the tiny behaviors that
                  lead to remarkable results.
                </p> */}
                <p className="paragraph">
                  {/* {currentBookInfo.volumeInfo.description} */}
                  {bookDescriptionText}
                </p>
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

          <div className="view_cont">
            {/* Render the CommentSection component and pass down the addComment function as props */}
            {/* when we submit in commentSection, it sends the comment to this fucntion in (parent component) */}
            {currentView === "note" && (
              <CommentSection addComment={addComment} />
            )}

            {currentView === "note" && <h2>Notes</h2>}
            <div
              className={currentView === "null" ? "hidden" : "view_info_cont"}
            >
              {/* HIDE THE COMMENT SECTION FOR NOW */}
              {/* {currentView === "comment" && (
                <div className="list_cont">
                  {temp_cmnt.map((x) => (
                    <Comment name={x.name} date={x.date} comment={x.comment} />
                  ))}
                </div>
              )} */}
              {currentView === "note" && (
                <div className="list_cont">
                  {temp_notes
                    .slice()
                    .reverse()
                    .map((x, index) => (
                      <div key={index}>
                        <Notes note={x.note} />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentBook;
