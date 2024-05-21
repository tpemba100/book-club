import React, { useEffect } from "react";

const Notes = ({ note }) => {
  // Add useEffect to log whenever the note prop changes
  useEffect(() => {
    console.log("Note has changed:", note);
  }, [note]);

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
    justifyContent: "center",
    padding: "1rem",
    margin: "0.5rem",
    width: "90%", // Adjusted width for smaller screens
    maxWidth: "600px", // Limit maximum width for larger screens
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
    ":hover": {
      transform: "scale(1.02)",
    },
  },
  noteText: {
    margin: 0,
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    maxWidth: "100%", // Ensure text does not overflow on smaller screens
  },
};

export default Notes;
