import axios from "axios";
import { loginFailure, loginSuccess, loginStart } from "./AuthAction";

export const doLogin = async (user, dispatch) => {
  dispatch(loginStart());
  console.log("user fetch started");
  // console.log(user);

  const URL = "https://lowkey-bookclub-api.onrender.com";

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