import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";

// const User = {
//   _id: "6434cd9134332f75181cb7e1",
//   username: "phurba",
// };

{
}

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  console.log(state);

  useEffect(() => {
    // localStorage.setItem("user", JSON.stringify(User));
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
