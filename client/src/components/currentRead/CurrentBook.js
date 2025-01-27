import React, { useContext, useEffect, useState } from "react";
// import "./currentBook.css";
import "./currentBookTemp.css";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import CommentSection from "../comments/CommentSection";
import Notes from "../notes/Notes";
import { updateFailure, updateSuccess } from "../../authContext/AuthAction";
import { SlNote } from "react-icons/sl";
import { IoMdArrowDropdown } from "react-icons/io";
import BestSellerShow from "../bestSellerShow/BestSellerShow";
import { Link } from "react-router-dom";

const CurrentBook = ({ selectedBookId }) => {
  const { user, URL, dispatch } = useContext(AuthContext);
  const [currentBookInfo, setCurrentBookInfo] = useState(null);
  const [currentView, setCurrentView] = useState("null");
  const [displayNote, setDisplayNote] = useState("");
  const [descVisible, setDescVisible] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${selectedBookId}`
        );
        setCurrentBookInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBook();
  }, [selectedBookId]);

  // Filter to display only currentBook Notes
  // user.notes.bookId=currentBookId? -> filteredNotes->.map to only display text->filteredText->sett
  const filterNote = () => {
    if (user.notes) {
      const filteredNotes = user.notes
        .filter((book) => book.bookId === selectedBookId)
        .map((book) => book);
    } else console.log("no Notes");

    setDisplayNote([...filteredNotes]); // Shallow copy of filteredText
  };

  useEffect(() => {
    filterNote(user);
  }, [user]);

  if (!currentBookInfo) {
    return (
      <div className="nullCurrentBook">
        <h4 className="heading-font">
          You have not added any Books to your List.
          <Link to="/search" className="custom-link">
            <input type="submit" className="searchInputBtn" value="Add Books" />
          </Link>
        </h4>
        <div style={{ paddingBottom: "4rem" }}></div>
        <BestSellerShow />
      </div>
    );
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

  // PUT --> Submit Note to Database
  //onSubmit -> sends comment & bookId to server
  const addNote = async (newNote) => {
    try {
      const res = await axios.put(`${URL}/api/users/${user._id}/notes`, {
        text: newNote,
        bookId: selectedBookId,
      });
      // console.log("Note added successfully", res.data);
      refreshData();
      return res.data;
    } catch (err) {
      console.log("Error adding note", err);
      throw err;
    }
  };

  //GET --> refetch Data and update with dispatch
  const refreshData = async () => {
    try {
      // dispatch(updateStart());
      console.log("Refreshing data started");
      const res = await axios.get(`${URL}/api/users/${user._id}`);
      // console.log(res.data);
      dispatch(updateSuccess(res.data));
      console.log("Data refreshed successfully");
    } catch (err) {
      dispatch(updateFailure());
      console.log("Failed to refresh data");
    }
  };

  const displayDesc = () => {
    setDescVisible(!descVisible);
  };

  //DELETE --> sends the noteId & userId as paramters in URL
  const onDelete = async (noteId) => {
    try {
      const res = await axios.delete(
        `${URL}/api/users/${user._id}/notes/${noteId}`
      );
      console.log("Note deleted successfully!");
      console.log(res.data);
      refreshData();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="current_book_cont">
        {/* Heading */}
        {/* IF this is not current book ID then Hide this */}
        {selectedBookId === user.currentBook[0] ? (
          <div className="heading">
            <h3 className="desc">Hey {user.username}, you are </h3>
            <h1 className="currentRead heading-font">Currently Reading</h1>
          </div>
        ) : null}
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
              <div className="description">
                Description{" "}
                <IoMdArrowDropdown
                  className="dropDownArrow"
                  style={{
                    transform: descVisible ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  onClick={displayDesc}
                />
              </div>

              <p
                className="paragraph"
                style={{ display: descVisible ? "block" : "none" }}
              >
                {bookDescriptionText}
              </p>
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <button type="button" class="btn-primary" onClick={toggleNotes}>
                View Notes
              </button>
            </div>
          </div>

          {/* bookImg */}
          <div className="img-cont">
            <img src={currentBookInfo.volumeInfo.imageLinks.thumbnail} alt="" />
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
              <h2 className="heading-font">
                <SlNote /> &nbsp; Notes
              </h2>
              {displayNote
                .slice()
                .reverse()
                .map((x, index) => (
                  <Notes note={x} key={index} onDelete={onDelete} />
                ))}
            </div>
          )}

          {/* Comment Section */}
          {/* Comment Section */}
          {/* Comment Section */}
          {/* Render the CommentSection component and pass down the addComment function as props */}
          {/* when we submit in commentSection, it sends the comment to this fucntion in (parent component) */}
          {currentView === "note" && (
            <CommentSection addComment={addNote} refreshData={refreshData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentBook;
