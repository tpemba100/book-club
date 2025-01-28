import React, { useContext, useState, useEffect } from "react";
import CurrentBook from "../../components/currentRead/CurrentBook";
import "./home.css";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from "react-router-dom";
// import Profile from "../../components/cards/profileCard/Profile";
// import img from "./pfp.png";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [currentBookId, setCurrentBookId] = useState("");

  useEffect(() => {
    try {
      if (user.currentBook.length !== null) {
        setCurrentBookId(user.currentBook[0]);
      }
      // console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  }, [user]);
  console.log(user);
  return (
    <div className="home" style={{ marginTop: "60px" }}>
      {/* IF there is current Book */}
      {user.currentBook && <CurrentBook selectedBookId={currentBookId} />}
      {/* If there is no current book */}
      {!user.currentBook || user.currentBook.length === 0 ? (
        <div style={{ marginTop: "40px" }} className="home_noCurrent">
          <h2>You havent specified which book you are reading.</h2>
          <h3>Seach for book </h3>
          <Link to="/search" className="custom-link">
            <button className="add-button">Add Book</button>
          </Link>
        </div>
      ) : (
        " lol"
      )}
    </div>
  );
};

export default Home;
