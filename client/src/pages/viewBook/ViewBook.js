import React, { useContext, useEffect } from "react";
import BookContext from "../../BookContext";
import BookList from "../../components/list/BookList";
import BookForm from "../../components/bookForm/BookForm";
import "./viewBook.css";
import BookSide from "../../components/bookSide/BookSide";

const ViewBook = () => {
  const { currentBook, setCurrentBook } = useContext(BookContext);
  return (
    <div className="viewbook">
      {/* <Navbar /> */}
      <BookList />
      {/* {currentBook === "null" ? <BookForm /> : <BookSide />} */}

      <div className="spacer"></div>
    </div>
  );
};

export default ViewBook;
