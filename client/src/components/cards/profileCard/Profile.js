import React from "react";

const Profile = ({ img, title, name }) => {
  return (
    <div style={{ backgroundColor: "green", display: "flex" }}>
      <img src={img} alt={title} />
      <div>
        <h3>{name}</h3>
        <p>{title}</p>
        <div>
          <div>Books</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
