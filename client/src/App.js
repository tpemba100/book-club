// import BookContext from "./BookContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import ViewBook from "./pages/viewBook/ViewBook";
import Search from "./pages/search/Search";
import LoginForm from "./pages/login/LoginForm";
import Landing from "./pages/landingPage/Landing";
import BookInfo from "./pages/bookInfo/BookInfo";
import { AuthContext, AuthContextProvider } from "./authContext/AuthContext";
import Navbar from "./components/navbar/Navbar";
import RegisterForm from "./pages/register/RegisterForm";
import axios from "axios";

function App() {
  const { user, URL } = useContext(AuthContext);

  // console.log(currentBook);
  // console.log(user);

  useEffect(() => {
    console.log("ASAP preflight connection. expecting error");
    const bookId = "1";
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://lowkey-bookclub-api.onrender.com/api/books/${bookId}`
        );
        return response.data;
      } catch (error) {
        // console.log(error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="App">
      {/* This is for When form is added a notification pops up */}
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
      <AuthContextProvider>
        {/* UseContext to make book data available across the app */}
        {/* <BookContext.Provider
          value={{ bookList, setBookList, URL, currentBook, setCurrentBook }}
        > */}
        <BrowserRouter basename="/">
          {user && <Navbar />}
          <Routes>
            {/* When there is user data that means user is loged in and is saved in local storage */}
            {/* If there is user -> then go to <This/> :else go to <THIS/> */}
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/landing-page" />}
            />
            <Route
              path="/landing-page"
              element={!user ? <Landing /> : <Navigate to="/" />}
            />

            <Route path="/register" element={!user && <RegisterForm />} />
            <Route
              path="/login"
              element={!user ? <LoginForm /> : <Navigate to="/" />}
              // element={<LoginForm />}
            />
            <Route
              path="/view-books"
              // element={<ViewBook />}
              element={user ? <ViewBook /> : <Navigate to="/login" />}
            />
            <Route
              path="/search"
              element={user ? <Search /> : <Navigate to="/login" />}
            />

            <Route path="/book-info" element={<BookInfo />} />
          </Routes>
        </BrowserRouter>
        {/* </BookContext.Provider> */}
      </AuthContextProvider>
    </div>
  );
}

export default App;
