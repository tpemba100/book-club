import BookContext from "./BookContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import ViewBook from "./pages/viewBook/ViewBook";
import Search from "./pages/search/Search";
import LoginForm from "./pages/login/LoginForm";
import { AuthContext, AuthContextProvider } from "./authContext/AuthContext";
import Navbar from "./components/navbar/Navbar";
import RegisterForm from "./pages/register/RegisterForm";

function App() {
  const { user } = useContext(AuthContext);
  const [bookList, setBookList] = useState([]); // User BookList IDs
  const [currentBook, setCurrentBook] = useState("null");

  const URL = "http://localhost:8800";
  // const URL = "https://lowkey-bookclub-api.onrender.com";

  // console.log(currentBook);
  console.log(user);

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
        <BookContext.Provider
          value={{ bookList, setBookList, URL, currentBook, setCurrentBook }}
        >
          <BrowserRouter basename="/">
            {user && <Navbar />}
            <Routes>
              {/* When there is user data that means user is loged in and is saved in local storage */}
              {/* If there is user -> then go to <This/> :else go to <THIS/> */}
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
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
            </Routes>
          </BrowserRouter>
        </BookContext.Provider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
