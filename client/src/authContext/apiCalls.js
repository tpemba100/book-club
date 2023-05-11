import axios from "axios";
import { loginFailure, loginSuccess, loginStart } from "./AuthAction";
import { registerFailure, registerSuccess, registerStart } from "./AuthAction";
import { updateFailure, updateSuccess, updateStart } from "./AuthAction";

// const URL = "http://localhost:8800";
const URL = "https://lowkey-bookclub-api.onrender.com";
//dont forget App.js URL

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
  console.log("USER REGISTRATION STARTED");

  try {
    const res = await axios.post(URL + `/api/users/register`, {
      username: user.username,
      email: user.email,
      password: user.password,
    });

    dispatch(registerSuccess(res.data));
    console.log("USER REGISTRATION SUCCESS");
    console.log(res.data);
  } catch (err) {
    dispatch(registerFailure());
    console.log("USER REGISTRATION FAILED");
  }
};
// export const doCheck = (user) => {
//   console.log(user.password);
//   try {
//     console.log("user register started");

//     const pass = CryptoJS.AES.encrypt(user.password, "pemba").toString();

//     console.log(pass);
//   } catch (err) {
//     console.log("sccccc");
//   }
// };