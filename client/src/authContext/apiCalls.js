import axios from "axios";
import { loginFailure, loginSuccess, loginStart } from "./AuthAction";
import { registerFailure, registerSuccess, registerStart } from "./AuthAction";

const URL = "https://lowkey-bookclub-api.onrender.com";
// const URL = "http://localhost:8800";

export const doLogin = async (user, dispatch) => {
  dispatch(loginStart());
  console.log("user fetch started");
  // console.log(user);

  try {
    const res = await axios.post(URL + `/api/users/login`, {
      username: user.username,
      password: user.password,
    });
    dispatch(loginSuccess(res.data));
    console.log("user fetch success");
  } catch (err) {
    dispatch(loginFailure());
    console.log("user fetch failed");
  }
};

export const doRegister = async (user, dispatch) => {
  dispatch(registerStart());
  console.log("user register started");
  // console.log(user);

  try {
    const res = await axios.post(URL + `/api/users/register`, {
      username: user.username,
      email: user.email,
      password: user.password,
    });
    dispatch(registerSuccess(res.data));
    console.log(res.data);
    console.log("user register success");
  } catch (err) {
    dispatch(registerFailure());
    console.log("user register failed");
  }
};
