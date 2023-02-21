import React from "react";
import "./navbar.css";

const Navbar = () => {
  // const [isScrolled, setIsScrolled] = useState(false);

  // window.onscroll = () => {
  //   setIsScrolled(window.pageYOffset === 0 ? false : true);
  //   return () => (window.onscroll = null);
  // };

  return (
    <div className="container">
      <div className="logo">
        {/* <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt=""
        /> */}
        <h1>LowKey Book Club</h1>
      </div>
      <div className="menuItem">
        <span>View Books</span>
        <span>Search Books</span>
      </div>
      <div className="profile">
        <span>LogOut</span>
      </div>
    </div>
  );
};

export default Navbar;
