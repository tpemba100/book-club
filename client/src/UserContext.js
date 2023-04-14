import React, { useState, useEffect } from "react";

export const UserContext = React.createContext({
  user: null,
  setUser: () => {},
});

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  // Set user data in local storage when user state changes
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  // Get user data from local storage on component mount
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
