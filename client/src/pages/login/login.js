import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState({});
  const URL = "http://localhost:8800/api/users/login";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(URL, { username: username });
      setUserData(res.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div className="login">
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Sign In</h1>
        <input
          type="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "200px" }}
        />
        <button className="loginButton" onClick={handleLogin}>
          Sign In
        </button>
        {Object.keys(userData).length > 0 && (
          <>
            <p>Welcome, {userData.username}!</p>
            <Link to="/" className="custom-link">
              ENTER
            </Link>
          </>
        )}
      </form>
    </div>
  );
}
