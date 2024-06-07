import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import "./notes.css";

const Notes = ({ note, onDelete }) => {
  return (
    <div className="noteContainer">
      {/* Display the note text */}
      <p className="noteText">{note}</p>
      <div className="deleteIconContainer">
        <MdDeleteOutline className="deleteIcon" onClick={onDelete} />
      </div>
    </div>
  );
};

export default Notes;
