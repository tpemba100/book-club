import React, { useContext, useEffect } from "react";
import BookContext from "../../BookContext";
import Navbar from "../../components/navbar/Navbar";
import BookList from "../../components/list/BookList";
import BookForm from "../../components/bookForm/BookForm";
import "./viewBook.css";

const ViewBook = () => {
  return (
    <div className="viewbook">
      <Navbar />
      <BookList />
      <BookForm />
      <div className="spacer"></div>
    </div>
  );
};

export default ViewBook;
