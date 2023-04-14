import React from "react";
import { useForm } from "react-hook-form";
import "./login.css";
import { useContext } from "react";
import { doLogin } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";

export default function Login() {
  const { dispatch } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await doLogin(
        { username: data.Username, password: data.Password },
        dispatch
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Welcome Back!</h2>
        <span>Login with your details</span>

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
        {/* <div>
          <p>Email</p>
          <input
            type="text"
            placeholder="Enter Email"
            {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          <span className="error_message">
            {errors.Email && <p className="error">Email is required</p>}
          </span>
        </div> */}
        <div>
          <p>Password</p>
          <input
            type="password"
            placeholder="Enter password"
            {...register("Password", { required: true, maxLength: 2 })}
          />
          <span className="error_message">
            {errors.Password && <p className="error">Password is required</p>}
          </span>
          <div className="forgot_link">
            <a>Forgot Password?</a>
          </div>
        </div>
        <input type="submit" className="inputBtn " value="Sign in" />

        <div className="signup_link">
          <span>Don't have an account? </span>
          <a>Sign up</a>
        </div>
      </form>
      {/* {formData && <div className="welcome">Welcome {formData.Username}!</div>} */}
    </div>
  );
}
