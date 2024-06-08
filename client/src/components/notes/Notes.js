import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import "./notes.css";
//DElete function not yet
const Notes = ({ note, onDelete }) => {
  const deleteNote = () => {
    onDelete(note._id);
  };
  return (
    <div className="noteContainer">
      {/* Display the note text */}
      <p className="noteText">{note.text}</p>
      <div className="deleteIconContainer">
        <MdDeleteOutline className="deleteIcon" onClick={deleteNote} />
      </div>
    </div>
  );
};

export default Notes;
