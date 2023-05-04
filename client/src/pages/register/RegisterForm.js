import React from "react";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { doRegister } from "../../authContext/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const { dispatch } = useContext(AuthContext);
  const { error } = useContext(AuthContext);
  const navigate = useNavigate();

  const notify = () =>
    toast.success("Registered successfully!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  //useForm to update and register data, handleSubmit and formState (react hook form)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // When we click sign in
  const onSubmit = async (data) => {
    console.log(data);
    console.log(error);
    try {
      await doRegister(
        { username: data.Username, email: data.Email, password: data.Password },
        dispatch
      );
    } catch (error) {
      console.log(error);
    }
    {
      !error && navigate("/login");
      !error && notify();
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Join us & Connect.</h2>
        <span>Sign up with your details</span>

        {error && (
          <p className="error_signin">
            We apologize, There was a Issue Signing up!!
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
          <p>Email</p>
          <input
            type="text"
            placeholder="Enter Email"
            {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          <span className="error_message">
            {errors.Email && <p className="error">Email is required</p>}
          </span>
        </div>
        <div>
          <p>Password</p>
          <input
            type="password"
            placeholder="Enter password"
            {...register("Password", { required: true, maxLength: 8 })}
          />
          <span className="error_message">
            {errors.Password && <p className="error">Password is required</p>}
          </span>
        </div>
        {/* Sign up */}
        <input type="submit" className="inputBtn " value="Sign Up" />

        <div className="signup_link">
          <span>Already have an account? </span>
          <Link to="/login" className="custom-link">
            <a>Log in</a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
