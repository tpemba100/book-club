import React from "react";
import "./navbar.css";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const [isScrolled, setIsScrolled] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // window.onscroll = () => {
  //   setIsScrolled(window.pageYOffset === 0 ? false : true);
  //   return () => (window.onscroll = null);
  // };

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <nav>
      <div className="logo">
        <Link to="/" className="custom-link">
          Book Mates
        </Link>
      </div>
      {(toggleMenu || screenWidth > 644) && (
        <ul className="list">
          <Link to="/view-books" className="custom-link">
            <li className="items">View Books</li>
          </Link>
          <Link to="/search" className="custom-link">
            <li className="items">Search Books</li>
          </Link>
        </ul>
      )}
      <div className="btn">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleNav}
        >
          <MenuIcon style={{ color: "black" }} />
        </IconButton>
      </div>
    </nav>
  );
};

export default Navbar;
