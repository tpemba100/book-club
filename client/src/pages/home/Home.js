import React, { useContext, useState, useEffect } from "react";
import CurrentBook from "../../components/currentRead/CurrentBook";
import "./home.css";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [currentBookId, setCurrentBookId] = useState("");

  useEffect(() => {
    try {
      if (user.currentBook.length !== null) {
        setCurrentBookId(user.currentBook);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [user]);
  console.log(currentBookId);
  return (
    <div className="home" style={{ marginTop: "70px" }}>
      {user.currentBook && <CurrentBook currentBookId={user.currentBook} />}
      {user.currentBook === undefined ? (
        <div style={{ marginTop: "40px" }} className="home_noCurrent">
          <h2>You havent specified which book you are reading.</h2>
          <h3>Seach for book </h3>
          <Link to="/search" className="custom-link">
            <button className="add-button">Add Book</button>
          </Link>
        </div>
      ) : (
        " "
      )}
    </div>
  );
};

export default Home;
