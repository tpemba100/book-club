import React from "react";
import "./navbar.css";
import "./bottomNav.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../../authContext/AuthContext";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CircleNotificationsRoundedIcon from "@mui/icons-material/CircleNotificationsRounded";

const Navbar = () => {
  // const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [value, setValue] = useState("/");
  // const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // New state for profile dropdown
  const navigate = useNavigate();
  // const { user } = useContext(AuthContext);
  const location = useLocation();
  // console.log(user);

  const handleLogout = () => {
    localStorage.setItem("user", null);
    window.location.reload();
  };

  // const toggleProfileDropdown = () => {
  //   setIsProfileDropdownOpen(!isProfileDropdownOpen);
  // };

  //Mobile Navigation using Mui Component
  //
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
              <h3 className="logo heading-font">BookShare</h3>
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
            {/* BOttom Mobile Navigation */}
            {bottomNavigation}
          </div>
        </div>
      ) : (
        // Desktop Navigation
        <nav>
          <div className="logo">
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <h3 className="heading-font">BookShare</h3>
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

              <li className="items" onClick={handleLogout}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LogoutIcon /> <p>Logout</p>
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
