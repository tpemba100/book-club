import React from "react";
import "./search.css";
import SearchBar from "../../components/searchBar/SearchBar";
import BestSellerShow from "../../components/bestSellerShow/BestSellerShow";
import Divider from "@mui/material/Divider";

const Search = () => {
  return (
    <div className="cont_search">
      <SearchBar />
      <Divider className="divider"></Divider>
      <BestSellerShow />
    </div>
  );
};

export default Search;
