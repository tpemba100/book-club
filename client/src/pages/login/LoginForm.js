import React from "react";
import { useForm } from "react-hook-form";
import "./login.css";
import { useContext } from "react";
import { doLogin } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { useEffect } from "react";

const LoginForm = () => {
  const { dispatch } = useContext(AuthContext);
  const { user, error, URL, isFetching } = useContext(AuthContext);
  const navigate = useNavigate();

  //useForm to update and register data, handleSubmit and formState (react hook form)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //guest login
  const guestLogin = async () => {
    //call doLogin and pass user data and dispatch to do Login Api call

    try {
      await doLogin({ username: "guest", password: "guest" }, dispatch, URL);
    } catch (error) {
      console.log("ayyy" + error);
    }
  };

  // When we click sign in
  const onSubmit = async (data) => {
    //call doLogin and pass user data and dispatch to do Login Api call

    try {
      await doLogin(
        { username: data.Username, password: data.Password },
        dispatch,
        URL
      );
    } catch (error) {
      console.log("ayyy" + error);
    }
  };

  useEffect(() => {
    if (user) {
      window.location.href = "/login";
    }
  }, [user]);

  return (
    <div className="container">
      {/* If there is no user yet then display login */}
      <div>
        <h1
          style={{
            width: "100%",
            textAlign: "center",
            color: "white",
            marginBottom: "2rem",
          }}
        >
          Book Share
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {isFetching && (
            <ReactLoading
              type={"bars"}
              color={"white"}
              height={"15%"}
              width={"15%"}
            />
          )}
        </div>

        <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Welcome Back!</h2>
          <span>Login with your details</span>

          {error && (
            <p className="error_signin">
              Please Enter a valid username or password
            </p>
          )}

          <div>
            <p>Username</p>
            <input
              type="text"
              placeholder="Enter username"
              {...register("Username", { required: true, maxLength: 80 })}
            />
            <span className="error_message">
              {errors.Username && <p className="error">Username is required</p>}
            </span>
          </div>

          <div>
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter password"
              {...register("Password", { required: true, maxLength: 10 })}
            />
            <span className="error_message">
              {errors.Password && <p className="error">Password is required</p>}
            </span>
            <div className="forgot_link">
              <a>Forgot Password?</a>
            </div>
          </div>

          {/* Sign in */}
          <input type="submit" className="inputBtn " value="Sign in" />
          <p
            style={{ cursor: "pointer", marginTop: "0.5rem" }}
            onClick={() => {
              guestLogin();
            }}
          >
            Login as Guest
          </p>
          <div className="signup_link">
            <span>Don't have an account? </span>
            <Link to="/register" className="custom-link">
              <p>Sign up</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
