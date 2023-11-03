import React from "react";
import "./imgCard.css"; // Import your CSS file for styling

const ImgCard = ({ img, title, txt }) => {
  return (
    <div className="imgCard_container">
      <img src={img} alt="Your Image Alt Text" className="image" />
      <div className="text">
        <h2> {title}</h2>
        <p> {txt}</p>
      </div>
    </div>
  );
};

export default ImgCard;
