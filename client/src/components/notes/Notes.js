import React from "react";

const Notes = ({ note }) => {
  return (
    <div style={styles.noteContainer}>
      {/* Display the note text */}
      <p style={styles.noteText}>{note}</p>
    </div>
  );
};

// Inline CSS styles
const styles = {
  noteContainer: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "center",
    padding: "1rem",
    margin: "0.5rem",
    // backgroundColor: "#f0f0f0",
    // borderRadius: "10px",
    // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "cursive", // Mimic handwriting font
    fontSize: "1.2rem", // Adjust font size as needed
    lineHeight: "1.5", // Adjust line height for readability
    padding: "1rem 2rem", // Adjust padding for spacing
  },
  noteText: {
    margin: 0,
    color: "#333",
    textAlign: "left",
    backgroundColor: "transparent",
    width: "100%",
  },
};

export default Notes;
