import React from "react";

const Comment = ({ name, date, comment }) => {
  return (
    <div
      style={{
        display: "flex",
        margin: "0.5rem 0",
        marginLeft: "1rem",
      }}
    >
      <div style={{ backgroundColor: "gray", height: "100%" }}>icon</div>
      <div>
        <p style={{ margin: "0 1rem " }}>
          {name}
          <span style={{ marginLeft: "2rem", color: "gray" }}>{date}</span>
        </p>
        <p style={{ margin: "0.5rem 0" }}>{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
