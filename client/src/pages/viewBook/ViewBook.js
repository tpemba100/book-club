import React from "react";
import BookList from "../../components/list/BookList";
import "./viewBook.css";

const ViewBook = () => {
  return (
    <div className="viewbook">
      <BookList />

      <div className="spacer"></div>
    </div>
  );
};

export default ViewBook;
