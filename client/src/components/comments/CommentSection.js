import React, { useState } from "react";
import "./commentSection.css";

const CommentSection = ({ addComment, refreshData }) => {
  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    refreshData();
    // Call the addComment function passed from the parent component
    addComment(comment);
    // Clear the comment field after submission
    setComment("");
  };

  return (
    <div className="comment-section">
      <h2>Comment Section</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="comment-input"
          placeholder="Write your comment..."
          value={comment}
          onChange={handleChange}
        />
        <button type="submit" className="comment-button">
          Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
