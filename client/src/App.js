// import "./App.css";
import BookForm from "./components/bookForm/BookForm";
import BookList from "./components/list/BookList";
import BookContext from "./BookContext";
import { useState, useEffect } from "react";
import axios from "axios";
// import Navbar from "./components/navbar/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./app.css";
import Home from "./pages/home/Home";
import ViewBook from "./pages/viewBook/ViewBook";
import Search from "./pages/search/Search";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [bookList, setBookList] = useState([]);
  // const URL = "http://localhost:8800";
  const URL = "https://lowkey-bookclub-api.onrender.com";

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
      <BookContext.Provider value={{ bookList, setBookList, URL }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ViewBook />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </BrowserRouter>
      </BookContext.Provider>
    </div>
  );
}

export default App;
