import React from "react";
// import "./shareBookList.css";
import ShareBookList from "../../components/ShareBookList/ShareBookList";
import { Link } from "react-router-dom";
// import Profile from "../../components/profile/profile";

const Share = () => {
  return (
    <div className="viewbook">
      {/* <section className="LandingTop">
        <div className="NavContainer ">
          <div className="logo">
            <Link to="/">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/rasglmd851c-I1002%3A260%3B11%3A118%3B807%3A537?alt=media&token=07180d24-9e13-4699-84b0-35626dbcd9e0"
                alt="Not Found"
                className="logo-1"
              />
            </Link>
            <p className="book-space">Book Space</p>
          </div>
        </div>
      </section> */}
      <ShareBookList />
      <div className="spacer"></div>
    </div>
  );
};

export default Share;
