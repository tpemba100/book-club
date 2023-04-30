import React from "react";
import "./navbar.css";
import "./bottomNav.css";
// import { IconButton } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SearchIcon from "@mui/icons-material/Search";
import PagesIcon from "@mui/icons-material/Pages";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  // const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  // const toggleNav = () => {
  //   setToggleMenu(!toggleMenu);
  // };

  const handleLogout = () => {
    localStorage.setItem("user", null);
    window.location.reload();
  };

  // useEffect(() => {
  //   const changeWidth = () => {
  //     setScreenWidth(window.innerWidth);
  //   };

  //   window.addEventListener("resize", changeWidth);

  //   return () => {
  //     window.removeEventListener("resize", changeWidth);
  //   };
  // }, []);

  const bottomNavigation = (
    <BottomNavigation
      value={value}
      className="bottom-nav"
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon />}
        onClick={() => navigate("/")}
      />
      <BottomNavigationAction
        label="View Books"
        icon={<LibraryBooksIcon />}
        onClick={() => navigate("view-books")}
      />
      <BottomNavigationAction
        label="Search Books"
        icon={<SearchIcon />}
        onClick={() => navigate("/search")}
      />
      <BottomNavigationAction
        label="Logout"
        icon={<PagesIcon />}
        onClick={handleLogout}
      />
    </BottomNavigation>
  );

  return (
    <>
      {screenWidth <= 644 ? (
        <div className="phone-cont">
          <div className="phone-logo">
            <Link to="/">Book Mates</Link>
            <p>Welcome, Pemba</p>
          </div>
          {bottomNavigation}
        </div>
      ) : (
        <nav>
          <div className="logo">
            <Link to="/" className="custom-link">
              Book Mates
            </Link>
          </div>
          {
            // toggleMenu && (
            <ul className="list">
              <Link to="/view-books" className="custom-link">
                <li className="items">View Books</li>
              </Link>
              <Link to="/search" className="custom-link">
                <li className="items">Search Books</li>
              </Link>
              <li className="items">
                <AccountCircleIcon fontSize="large" />
                <p>tpemba</p>
              </li>
              <li onClick={handleLogout}>
                <a> Logout</a>
              </li>
            </ul>
            // )
          }
          {/* <div className="btn">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleNav}
            >
              <MenuIcon style={{ color: "black" }} />
            </IconButton>
          </div> */}
        </nav>
      )}
    </>
  );
};

export default Navbar;
