import React, { useContext, useEffect, useState } from "react";
// import "./currentBook.css";
import "./currentBookTemp.css";
// import Comment from "../comments/Comment";
// import Notes from "../notes/Notes";
import axios from "axios";
// import { AuthContext } from "../../authContext/AuthContext";

const CurrentBook = ({ currentBookId }) => {
  // const { user } = useContext(AuthContext);
  const [currentBookInfo, setCurrentBookInfo] = useState(null);
  // const [currentView, setCurrentView] = useState("null");
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

  // const handleComment = () => {
  //   currentView === "comment"
  //     ? setCurrentView("null")
  //     : setCurrentView("comment");
  // };
  // const handleNotes = () => {
  //   currentView === "note" ? setCurrentView("null") : setCurrentView("note");
  // };

  // const temp_cmnt = [
  //   {
  //     name: "Tsering Pemba",
  //     date: "11:50am, Jan 1 2023",
  //     comment: "This i jsut another comment. i like this book very much",
  //   },
  //   {
  //     name: "Dolma Lama",
  //     date: "11:50am, Jan 7 2023",
  //     comment: "I liek book .asd asd asdadfgeg sdfnst asdas ",
  //   },
  //   {
  //     name: "Jack Lama",
  //     date: "11:50am, Jan 7 2023",
  //     comment:
  //       "sperts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master",
  //   },
  //   {
  //     name: "John Wick",
  //     date: "11:50am, Jan 7 2023",
  //     comment: "ncie books. love this book man",
  //   },
  // ];

  // const temp_notes = [
  //   {
  //     chapter: "4",
  //     quote: "Once upon a time",
  //     note: "I love this because its the starting odf every story and i rememer this as a kid. a very important part oof our childhood.",
  //   },
  //   {
  //     chapter: "7",
  //     quote: "Journalong is fun",
  //     note: "I love to Jounral because it feels good emotionally and physically.",
  //   },
  //   {
  //     chapter: "8",
  //     quote: "Once upon a time",
  //     note: "I love this because its the starting odf every story and i rememer this as a kid. a very important part oof our childhood.",
  //   },
  //   {
  //     chapter: "49",
  //     quote: "Once upon a time",
  //     note: "I love this because its the starting odf every story and i rememer this as a kid. a very important part oof our childhood.",
  //   },
  // ];
  console.log(currentBookInfo);

  return (
    <div className="current_book_cont">
      {/* Heading */}
      <div className="heading">
        <h3 className="desc">Hey user, you are </h3>
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
              <p className="paragraph">
                No matter your goals, Atomic Habits offers a proven framework
                for improving--every day. James Clear, one of the world's
                leading experts on habit formation, reveals practical strategies
                that will teach you exactly how to form good habits, break bad
                ones, and master the tiny behaviors that lead to remarkable
                results.
              </p>
            </div>
            <button type="button" class="btn-primary">
              View Notes
            </button>
          </div>

          {/* bookImg */}
          <div className="img-cont">
            <img src={currentBookInfo.volumeInfo.imageLinks.thumbnail} alt="" />
          </div>
        </div>

        {/* Button */}
        {/* <div className="btn_cont">
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
      </div> */}
        {/* View Container */}
        {/* <div className="view_cont">
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
        </div> */}
      </div>
    </div>
  );
};

export default CurrentBook;
