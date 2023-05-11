import React from 'react'
import BookCard from './bookCard';
import  "./searchedBook.css";

const SearchedBooks = (props) => {
  return (
   
    <div className='bookCard_cont'>
    
    {props.book.map((data) => (
      <div className='bookCont'>
        <BookCard data={data}/>
    
    </div>
      ))}


    </div>
  )
}

export default SearchedBooks;
