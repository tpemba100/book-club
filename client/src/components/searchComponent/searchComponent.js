import React, { useState, useEffect } from "react";
import axios from "axios";
import "./searchComponent.css";
import { useForm } from "react-hook-form";
import DisplaySearchedBooks from "../searchedBooks/searchedBooks";

const SearchComponent = () => {
  const apiURL = "https://www.googleapis.com/books/v1/volumes";
  const apiKey = "AIzaSyCIxIIcpTwWrV5HmCj_q4AWZRAqD7y6CFI";
  const resultAmount = "10";

  const [book, setBook] = useState([]);
  const [totalItems, setTotalItems] = useState(null);

  //useForm to update and register data, handleSubmit and formState (react hook form)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // When we click sign in
  const onSubmit = async (data) => {
    console.log(data.Title);
    const response = await axios.get(
      `${apiURL}?key=${apiKey}&langRestrict=en&maxResults=${resultAmount}&orderBy=relevance&q=${data.Title}`
    );
    console.log(response.data);
    setBook(response.data.items);
    setTotalItems(response.data.totalItems);
  };

  useEffect(() => {
    console.log(book);
  }, [book]);

  return (
    <div className="search_container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Search Books</h2>
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
      {totalItems && <p>Total Results: {totalItems}</p>}
      <DisplaySearchedBooks book={book} />
    </div>
  );
};

export default SearchComponent;
