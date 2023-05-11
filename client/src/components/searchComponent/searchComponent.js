import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import SearchedBooks from "../searchedBooks/searchedBooks";


const SearchComponent = () => {
    const apiURL = 'https://www.googleapis.com/books/v1/volumes';
    const apiKey = 'AIzaSyCIxIIcpTwWrV5HmCj_q4AWZRAqD7y6CFI';

  
const [book, setBook] = useState([]);
  

  //useForm to update and register data, handleSubmit and formState (react hook form)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    
  // When we click sign in
  const onSubmit = async (data) => {
    console.log(data.Title)
    const response = await axios.get(`${apiURL}?key=${apiKey}&langRestrict=en&maxResults=5&orderBy=relevance&q=${data.Title}`);
    console.log(response.data);
    setBook(response.data.items);
    
  };

  useEffect(() => {
    
    console.log(book);
  }, [book])
  



  return (
    <div className="container">

        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Welcome Back!</h2>
          <span>Login with your details</span>

          <div>
            <p>Book Title</p>
            <input
              type="text"
              placeholder="Enter title"
              {...register("Title", { required: true, maxLength: 80 })}
            />
            
          </div>
        
          <input type="submit" className="inputBtn " value="Search" />
          </form>
        
          <SearchedBooks book= {book}/>

  
            
    </div>
  );
};

export default SearchComponent;
