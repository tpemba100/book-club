import BookContext from "./BookContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import ViewBook from "./pages/viewBook/ViewBook";
import Search from "./pages/search/Search";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [bookList, setBookList] = useState([]);
  const [currentBook, setCurrentBook] = useState("null");
  // const URL = "http://localhost:8800";
  const URL = "https://lowkey-bookclub-api.onrender.com";

  const options = {
    method: "GET",
    url: "https://books-search.p.rapidapi.com/complete",
    params: { query: "harry potter" },
    headers: {
      "X-RapidAPI-Key": "12980fb924msh2f8523e1ad50193p1b7d43jsn85ea8901b2dc",
      "X-RapidAPI-Host": "books-search.p.rapidapi.com",
    },
  };

  console.log(currentBook);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get(URL + `/api/books`);
        setBookList(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getBooks();
  }, []);

  // useEffect(() => {
  //   const options = {
  //     method: "GET",
  //     url: "https://book-finder1.p.rapidapi.com/api/search",
  //     params: {
  //       title: "Rich Dad Poor Dad",
  //       lexile_min: "600",
  //       lexile_max: "800",
  //       results_per_page: "25",
  //       page: "1",
  //     },
  //     headers: {
  //       "X-RapidAPI-Key": "12980fb924msh2f8523e1ad50193p1b7d43jsn85ea8901b2dc",
  //       "X-RapidAPI-Host": "book-finder1.p.rapidapi.com",
  //     },
  //   };

  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  //   options();
  // }, []);

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* <Route path="/movies" element={<Home type="movie" />} /> */}
      <BookContext.Provider
        value={{ bookList, setBookList, URL, currentBook, setCurrentBook }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/view-books" element={<ViewBook />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </BrowserRouter>
      </BookContext.Provider>
    </div>
  );
}

export default App;
