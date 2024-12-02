import React from "react";
import "./landing.css";
import { Link, useNavigate } from "react-router-dom";

import BestSellerShow from "../../components/bestSellerShow/BestSellerShow";
import "./landingNav.css";
import "./hero.css";
import "./steps.css";
import "./feature.css";

const Landing = () => {
  return (
    <>
      {/* NAVIGATION */}
      <section className="LandingTop">
        <div className="NavContainer ">
          <div className="logo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/rasglmd851c-I1002%3A260%3B11%3A118%3B807%3A537?alt=media&token=07180d24-9e13-4699-84b0-35626dbcd9e0"
              alt="Not Found"
              className="logo-1"
            />
            {/* <p className="book-space">Book Space</p> */}
          </div>
          {/*
          <div className="col-right">
             <div className="primary-button">
              <Link to="/register">
                <p className="placeholder">Sign up</p>
              </Link>
            </div> 
          </div>
            */}
        </div>
      </section>

      {/* Hero SECTION */}
      <div className="containerHero">
        <div className="frame-112">
          <div className="heroHeading">
            <p className="heroTitle">Book Share</p>
            <p className="heroDesc">
              A space to share, connect and discover new books
            </p>
          </div>
          <div className="heroButtons">
            <Link to="/register">
              <div className="heroButton">
                <p className="heroPlaceholder">Sign up</p>
              </div>
            </Link>
            <Link to="/login">
              <div className="heroButton heroButton-2">
                <p className="heroPlaceholder placeholder-2">Login </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Steps section */}
      <div className="containerSteps">
        <div className="title">
          <p className="titleCont">
            Heavy Book Shelves?
            <br /> <span className="click">Just a Click.</span> <br />
            Share your Book List
          </p>
        </div>
        <div className="stepsul">
          <div className="stepsli">
            <div className="stepRow">
              <div className="stepCol_1">
                <p className="stepNum">01</p>
              </div>
              <div className="stepCol_2">
                <p className="stepTxt">Sign Up</p>
              </div>
            </div>
          </div>
          <div className="stepsli">
            <div className="stepRow">
              <div className="stepCo_1">
                <p className="stepNum">02</p>
              </div>
              <div className="stepCol_2">
                <p className="stepTxt">Add Your Books</p>
              </div>
            </div>
          </div>
          <div className="stepsli">
            <div className="stepRow">
              <div className="stepCo_1">
                <p className="stepNum">03</p>
              </div>
              <div className="stepCol_2">
                <p className="stepTxt">Add Notes</p>
              </div>
            </div>
          </div>
          <div className="stepsli">
            <div className="stepRow">
              <div className="stepCo_1">
                <p className="stepNum">04</p>
              </div>
              <div className="stepCol_2">
                <p className="stepTxt">Share Your Book List</p>
              </div>
            </div>
          </div>
          <div className="stepsli">
            <div className="stepRow">
              <div className="stepCo_1">
                <p className="stepNum">05</p>
              </div>
              <div className="stepCol_2">
                <p className="stepTxt">Discover New Books</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      {/* Feature section */}
      {/* Feature section */}
      <div className="featureContainer">
        <div className="featureTitle">
          <div className="featureHeading">
            <p className="mvp">— MVP (Minimum Viable Product)</p>
            <p className="feature">Features</p>
          </div>
          <p className="featureDesc">
            Currently finishing the MVP so we can start getting the product out
            there on the world.
          </p>
        </div>
        <div className="featureUl">
          <div className="liPair">
            <div className="featureli">
              <div className="frame-13">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/l8o7cmsgr98-I1002%3A419%3B44%3A2798?alt=media&token=62bdd666-4d07-40db-bc02-d463a442768a"
                  alt="Not Found"
                  className="frame-16"
                />
                <div className="frame-14">
                  <p className="frame-14Title">
                    User accounts and Authentications
                  </p>
                  <p className="frame-14Desc">
                    user can create accounts and login safely.
                  </p>
                </div>
              </div>
            </div>
            <div className="featureli">
              <div className="frame-13">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/l8o7cmsgr98-I1002%3A420%3B44%3A2798?alt=media&token=040230fa-5989-463a-9f85-4e48e5bbbc85"
                  alt="Not Found"
                  className="frame-16"
                />
                <div className="frame-14">
                  <p className="frame-14Title">Personalized Book List</p>
                  <p className="frame-14Desc">
                    Add the books you have read and add to you book list
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="liPair">
            <div className="featureli">
              <div className="frame-13">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/l8o7cmsgr98-I1002%3A422%3B44%3A2798?alt=media&token=337ab372-87a0-47ad-9e52-50962fbbffb7"
                  alt="Not Found"
                  className="frame-16"
                />
                <div className="frame-14">
                  <p className="frame-14Title">Search for books</p>
                  <p className="frame-14Desc">
                    search thousands of books using google book api
                  </p>
                </div>
              </div>
            </div>
            <div className="featureli">
              <div className="frame-13">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/l8o7cmsgr98-I1002%3A423%3B44%3A2798?alt=media&token=91117668-bddf-471b-9e02-f26bd7f9247d"
                  alt="Not Found"
                  className="frame-16"
                />
                <div className="frame-14">
                  <p className="frame-14Title">Discover new books</p>
                  <p className="frame-14Desc">
                    discover new books that are trending and Best seller.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="liPair">
            <div className="featureli">
              <div className="frame-13">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/l8o7cmsgr98-I1002%3A425%3B44%3A2798?alt=media&token=8d490a90-bcf0-49b7-9219-53db4dc2b410"
                  alt="Not Found"
                  className="frame-16"
                />
                <div className="frame-14">
                  <p className="frame-14Title">Add notes on your books</p>
                </div>
              </div>
            </div>
            <div className="featureli">
              <div className="frame-13">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/l8o7cmsgr98-I1002%3A426%3B44%3A2798?alt=media&token=5d1bafff-3630-4bbc-8b88-09637ea63f1a"
                  alt="Not Found"
                  className="frame-16"
                />
                <div className="frame-14">
                  <p className="Title">Share your book list</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* OLD Landing */}
      {/* OLD Landing */}
      {/* OLD Landing */}
      {/* OLD Landing */}
      <div className="landing-page">
        <div className="hero-background-img">
          <p className="heading-1">FIND AND SHARE BOOKS</p>
        </div>
      </div>
      <div className="main">
        {/* BOOKS CONTAINER */}
        <div className="books_conatiner">
          <div className="offset_background"></div>
          <section className="bestSeller-section">
            <p className="bestSeller-subheader">New York Times</p>
            <h2 className="bestSeller-header">BestSellers</h2>
            <BestSellerShow />
          </section>

          <div className="footer-txt">
            <h2>Find your next book and Share your awesome list</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
