import React from "react";
import "./searchedBook.css";
import BookCard from "./BookCard";

const DisplaySearchedBooks = (props) => {
  return (
    <div className="bookCard_cont">
      {props.book.map((data) => (
        <div className="bookCont" key={data.id}>
          <BookCard data={data} />
        </div>
      ))}
    </div>
  );
};

export default DisplaySearchedBooks;
