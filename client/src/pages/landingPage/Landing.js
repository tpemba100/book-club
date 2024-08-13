import React from "react";
import "./landing.css";
import { Link, useNavigate } from "react-router-dom";
import discover_img from "./img/discover_img.jpg";
import personalize_img from "./img/personalize_img.jpg";
import share_img from "./img/share_img.jpg";
import ImgCard from "../../components/cards/imgCard/ImgCard";
// import BestSellerShow from "../../components/bestSellerShow/BestSellerShow";
import "./landingStyle.css";

const Landing = () => {
  const txt = "asdasdas";
  return (
    <>
      <section className="LandingTop">
        <div className="NavContainer clip-contents">
          <div className="logo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/rasglmd851c-I1002%3A260%3B11%3A118%3B807%3A537?alt=media&token=07180d24-9e13-4699-84b0-35626dbcd9e0"
              alt="Not Found"
              className="logo-1"
            />
            <p className="book-space">Book Space</p>
          </div>
          <div className="col-right">
            <div className="primary-button">
              <Link to="/register">
                <p className="placeholder">Sign up</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="landing-page">
        <div className="hero-background-img">
          <p className="heading">FIND AND SHARE BOOKS</p>
        </div>
      </div>
      <div className="main">
        <header>
          <h1>Welcome to BookShare </h1>
          <p>
            Keep track of your book lists and discover new titles with Book
            Mates, the perfect app for book lovers! Whether you're an
            professional reader or just getting started, Book Mates makes
            managing your reading journey a breeze.
          </p>

          {/* <Link to="/login" className="custom-link">
            <input type="submit" className="searchInputBtn" value="Log in" />
          </Link>
          <Link to="/register" className="custom-link">
            <input type="submit" className="searchInputBtn" value="Sign up" />
          </Link> */}
        </header>

        {/* LOGIN SECTION */}
        <section className="login-section">
          <h2>LETS GET STARTED</h2>
          <Link to="/login" className="custom-link">
            <button type="button" class="btn-primary">
              Sign In
            </button>
          </Link>
        </section>
        <section className="feature-section">
          <h2 className="feature-header">Features</h2>
          <div className="card-container">
            <ImgCard
              img={discover_img}
              txt="Explore New Books"
              title="Discover"
            />
            <ImgCard
              img={personalize_img}
              txt="Add Books to List"
              title="Personalize"
            />
            <ImgCard img={share_img} txt="Share your BookList" title="Share" />
          </div>
        </section>

        {/* BOOKS CONTAINER */}
        <div className="books_conatiner">
          <div className="offset_background"></div>
          <section className="bestSeller-section">
            <p className="bestSeller-subheader">New York Times</p>
            <h2 className="bestSeller-header">BestSellers</h2>
            {/* <BestSellerShow /> */}
          </section>

          <div className="footer-txt">
            <h2>Find your next book and Share your awesome list</h2>
          </div>
        </div>

        {/* 
        <section className="technologies-section">
          <h2>Technologies Used 💻</h2>
          <p>
            Frontend: HTML, CSS, JavaScript, ReactJS 🌐
            <br />
            Backend: NodeJS, ExpressJS, MongoDB 📁
          </p>
        </section>

        <section className="contributors-section">
          <h2>Contributors 👥</h2>
          <ul>
            <li>Tsering Pemba 👩‍💻</li>
            <li>Nima Lama 👨‍💻</li>
          </ul>
        </section>

        <section className="future-improvements-section">
          <h2>Future Improvements 🚧</h2>
          <ul>
            <li>
              Social media integration for easy sharing and discovery of book
              recommendations.
            </li>
            <li>
              Advanced search and filtering options for finding new books.
            </li>
            <li>
              Improved note-taking capabilities, including the ability to add
              images and links.
            </li>
            <li>
              Integration with e-book platforms for easy access to digital
              books.
            </li>
            <li>Ability to create and join book clubs.</li>
          </ul>
        </section>

        <section className="contact-section">
          <h2>Contact Us 📬</h2>
          <p>
            If you have any questions or feedback about Book Mates, please feel
            free to contact us at tpemba.96@gmail.com We would love to hear from
            you. 😃
          </p>
        </section>  */}
      </div>
    </>
  );
};

export default Landing;
