import React from "react";
import BookList from "../../components/bookList/BookList";
import "./viewBook.css";
// import Profile from "../../components/profile/profile";

const ViewBook = () => {
  return (
    <div className="viewbook">
      <BookList />
      {/* <Profile title={"asdas"} text={"adasdas dasdas"} img={"./pfp.png"} /> */}
      <div className="spacer"></div>
    </div>
  );
};

export default ViewBook;
