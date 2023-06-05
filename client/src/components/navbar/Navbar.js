import React, { useContext } from "react";
import "./navbar.css";
import "./bottomNav.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { Link } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CircleNotificationsRoundedIcon from "@mui/icons-material/CircleNotificationsRounded";

const Navbar = () => {
  // const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [value, setValue] = useState("/");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // New state for profile dropdown
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const location = useLocation();
  console.log(user);

  const style_color = `linear-gradient(
    to right top,
    #d16ba5,
    #c777b9,
    #ba83ca,
    #aa8fd8,
    #9a9ae1,
    #8aa7ec,
    #79b3f4,
    #69bff8,
    #52cffe,
    #41dfff,
    #46eefa,
    #5ffbf1
  )`;
  // const style_color = `red`;

  const handleLogout = () => {
    localStorage.setItem("user", null);
    window.location.reload();
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const bottomNavigation = (
    <BottomNavigation
      showLabels
      value={location.pathname}
      className="bottom-nav"
      onChange={(event, newValue) => {
        setValue(newValue);
        navigate(newValue);
      }}
    >
      <BottomNavigationAction
        // label="Home"
        icon={<HomeIcon />}
        value="/"
        // onClick={() => navigate("/")}
      />
      <BottomNavigationAction
        // label="Books"
        icon={<MenuBookIcon />}
        value="/view-books"
        // onClick={() => navigate("/view-books")}
      />
      <BottomNavigationAction
        // label="Search"
        icon={<SearchIcon />}
        value="/search"
        // onClick={() => navigate("/search")}
      />
      <BottomNavigationAction
        // label="Logout"
        icon={<LogoutIcon />}
        onClick={handleLogout}
      />
      Change to profile
    </BottomNavigation>
  );

  return (
    <>
      {/* MOBILE NAVIGATION */}
      {screenWidth <= 644 ? (
        <div className="phone-cont">
          <div className="phone-cont-top">
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <h3 className="logo">BookShare</h3>
            </Link>

            <div className="nav_icon">
              <AccountCircleRoundedIcon
                fontSize="medium"
                style={{ marginRight: "4px" }}
              />
              <CircleNotificationsRoundedIcon fontSize="medium" />
            </div>
          </div>
          <div className="bottom_nav_cont">
            {/* <h1>nav</h1> */}
            {bottomNavigation}
          </div>
        </div>
      ) : (
        // Desktop Navigation
        <nav>
          <div className="logo">
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <h3>BookShare</h3>
            </Link>
          </div>
          {
            <ul className="list">
              <Link to="/view-books" className="custom-link">
                <li className="items">View Books</li>
              </Link>
              <Link to="/search" className="custom-link">
                <li className="items">Search Books</li>
              </Link>

              <li className="items">
                <div className="profile-dropdown">
                  <div
                    className="profile-dropdown-header"
                    onClick={toggleProfileDropdown}
                  >
                    <AccountCircleIcon fontSize="large" />
                    <p>{user.username}</p>
                  </div>
                  {/* Will only display if clicked and we set the className active */}
                  <ul
                    className={`profile-dropdown-menu ${
                      isProfileDropdownOpen ? "active" : ""
                    }`}
                  >
                    <li className="dropdown-items">
                      <AccountCircleIcon />
                      <p>Profile</p>
                    </li>
                    <li className="dropdown-items" onClick={handleLogout}>
                      <LogoutIcon /> <p>Logout</p>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          }
        </nav>
      )}
    </>
  );
};

export default Navbar;
