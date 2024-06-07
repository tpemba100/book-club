import React, { useState } from "react";
import "./commentSection.css";

const CommentSection = ({ addComment }) => {
  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the addComment function passed from the parent component
    addComment(comment);
    // Clear the comment field after submission
    setComment("");
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div className="comment-section">
      <form onSubmit={handleSubmit}>
        <textarea
          className="comment-input"
          placeholder="Write your comment..."
          value={comment}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" className="comment-button">
          Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
