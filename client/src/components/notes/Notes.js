import React from "react";

const Notes = ({ chapter, quote, note }) => {
  return (
    <div
      style={{
        display: "flex",
        margin: "0.5rem 0",
        width: "100%",
      }}
    >
      <div>
        <p style={{ margin: "0 1rem " }}> Chapter {chapter}</p>
        <spanp style={{ margin: "0 1rem ", color: "gray" }}>"{quote}"</spanp>
        <p style={{ margin: "0.5rem 0" }}>{note}</p>
      </div>
    </div>
  );
};

export default Notes;
