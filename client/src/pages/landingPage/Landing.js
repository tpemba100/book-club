import React from "react";
import "./landing.css";
import { Link, useNavigate } from "react-router-dom";
import discover_img from "./img/discover_img.jpg";
import personalize_img from "./img/personalize_img.jpg";
import share_img from "./img/share_img.jpg";
import ImgCard from "../../components/cards/imgCard/ImgCard";
import BestSellerShow from "../../components/bestSellerShow/BestSellerShow";

const Landing = () => {
  const txt = "asdasdas";
  return (
    <div>
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
            <BestSellerShow />
          </section>
          {/* <div style={{ backgroundColor: "var(--clr-primary)" }}>
            <section className="bookShare-section">
              <p className="bookShare-subheader">Our BookShare</p>
              <h2 className="bookShare-header">Recommended</h2>
              <BestSellerShow />
            </section>
          </div> */}
          <div className="footer-txt">
            <h2>Find your next book and Share your awesome list</h2>
          </div>
        </div>

        <section className="login-section">
          <h2>LETS GET STARTED</h2>
          <button type="button" class="btn-primary">
            Sign In
          </button>
        </section>

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
    </div>
  );
};

export default Landing;
