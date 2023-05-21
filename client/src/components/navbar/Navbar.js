import React, { useContext } from "react";
import "./navbar.css";
import "./bottomNav.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
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

  const handleLogout = () => {
    localStorage.setItem("user", null);
    window.location.reload();
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  const bottomNavigation = (
    <BottomNavigation
      showLabels
      value={value}
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
      {screenWidth <= 644 ? (
        <div className="phone-cont">
          <div className="phone-cont-top">
            <div className="profile-icon">
              <AccountCircleRoundedIcon fontSize="large" />
              {/* <p>{user.username}</p> */}
            </div>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <h3>Book Mates</h3>
            </Link>
            <div>
              <CircleNotificationsRoundedIcon fontSize="large" />
            </div>
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
            <ul className="list">
              <Link to="/view-books" className="custom-link">
                <li className="items">View Books</li>
              </Link>
              <Link to="/search" className="custom-link">
                <li className="items">Search Books</li>
              </Link>

              <li className={`items ${isProfileDropdownOpen ? "active" : ""}`}>
                <div className="profile-dropdown">
                  <div
                    className="profile-dropdown-header"
                    onClick={toggleProfileDropdown}
                  >
                    <AccountCircleIcon fontSize="large" />
                    <p>{user.username}</p>
                  </div>
                  {isProfileDropdownOpen && (
                    <ul className="profile-dropdown-menu">
                      <li className="dropdown-items">Profile</li>
                      <li className="dropdown-items" onClick={handleLogout}>
                        Logout
                      </li>
                    </ul>
                  )}
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
