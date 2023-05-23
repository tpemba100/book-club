import React from "react";
import "./search.css";
import SearchBar from "../../components/searchBar/SearchBar";
import BestSellerShow from "../../components/bestSellerShow/BestSellerShow";

const Search = () => {
  return (
    <div className="cont_search">
      <SearchBar />
      <BestSellerShow />
    </div>
  );
};

export default Search;
