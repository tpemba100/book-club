import React, { useState, useEffect } from "react";
import axios from "axios";
import "./searchBar.css";
import { useForm } from "react-hook-form";
import DisplaySearchedBooks from "../searchedBooks/searchedBooks";

const SearchBar = () => {
  const googleKey = process.env.REACT_APP_GOOGLE_KEY;

  const apiURL = "https://www.googleapis.com/books/v1/volumes";
  const resultAmount = "10";

  const [book, setBook] = useState([]);
  const [totalItems, setTotalItems] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");

  //useForm to update and register data, handleSubmit and formState (react hook form)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // When we click sign in
  const onSubmit = async (data) => {
    console.log(data.Title);
    setSearchTitle(data.Title);
    const response = await axios.get(
      `${apiURL}?key=${googleKey}&langRestrict=en&maxResults=${resultAmount}&orderBy=relevance&q=${data.Title}`
    );
    console.log(response.data);
    setBook(response.data.items);
    setTotalItems(response.data.totalItems);
  };

  return (
    <div className="search_container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="heading-font">SEARCH BOOKS</h1>
        <div className="search_form">
          <input
            className="searchInput"
            type="text"
            placeholder="Enter Book Title"
            {...register("Title", { required: true, maxLength: 80 })}
          />
          <input type="submit" className="searchInputBtn" value="Search" />
        </div>
      </form>
      {totalItems && <h2>Search Results for : {searchTitle}</h2>}
      {totalItems && <p>Total Results: {totalItems}</p>}
      <DisplaySearchedBooks book={book} />
    </div>
  );
};

export default SearchBar;
