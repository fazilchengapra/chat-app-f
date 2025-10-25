import React, { useState } from "react";
import axios from "axios";

const Login = ({ setIsLogin, setUserName }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const path = isRegister ? "register" : "login";
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/${path}`, {
        username,
        password,
      });
      alert(`${path} success`);
      if (isRegister) alert("please login");
      else {
        console.log(res);
        
        setIsLogin(true);
        setUserName(res.data.username);
      }
    } catch (error) {
        alert(`${path} failed!`)
      console.log("error:", error);
    }
  };
  return (
    <div className="login-container">
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Switch to Login" : "Switch to Register"}
      </button>
    </div>
  );
};

export default Login;
