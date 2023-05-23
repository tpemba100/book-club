import React, { useContext, useState, useEffect } from "react";
import CurrentBook from "../../components/currentRead/CurrentBook";
import "./home.css";
import { AuthContext } from "../../authContext/AuthContext";

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
    <div className="home">
      <CurrentBook currentBookId={user.currentBook} />
    </div>
  );
};

export default Home;
