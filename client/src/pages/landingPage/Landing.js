import React from "react";
import "./landing.css";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing-page">
      <header>
        <h1>Welcome to Book Mates 📚</h1>
        <p>
          Keep track of your book lists and discover new titles with Book Mates,
          the perfect app for book lovers! Whether you're an professional reader
          or just getting started, Book Mates makes managing your reading
          journey a breeze.
        </p>

        <Link to="/login" className="custom-link">
          <input type="submit" className="searchInputBtn" value="Log in" />
        </Link>
        <Link to="/register" className="custom-link">
          <input type="submit" className="searchInputBtn" value="Sign up" />
        </Link>
      </header>

      <section className="about-section">
        <h2>About Book Mates</h2>
        <p>
          Book Mates is a web application that allows users to keep track of
          their book lists. With Book Mates, you can log in and access your list
          of books that you have read, books that you are currently reading, and
          books that you want to read in the future. Add notes to the books you
          are currently reading, making it easy to remember essential details.
        </p>
      </section>

      <section className="features-section">
        <h2>Features 🚀</h2>
        <ul>
          <li>
            Organize your books into "Read," "Currently Reading," and "Want to
            Read" categories.
          </li>
          <li>Add notes to the books you are currently reading.</li>
          <li>Search for books online and add them to your list.</li>
          <li>View comments from other users on your books.</li>
          <li>
            Connect with friends, share book recommendations, and discover new
            titles together.
          </li>
          <li>Use a REST API for book search using Axios and Rest API.</li>
        </ul>
      </section>

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
          <li>Advanced search and filtering options for finding new books.</li>
          <li>
            Improved note-taking capabilities, including the ability to add
            images and links.
          </li>
          <li>
            Integration with e-book platforms for easy access to digital books.
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
      </section>
    </div>
  );
};

export default Landing;
