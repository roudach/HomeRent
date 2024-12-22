import React, { useState } from "react";
import "./LoginPage.css";
import api from "../../api";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation()
  const navigate = useNavigate()

  const userInfo = {username, password}

  function handleSubmit(e){
    e.preventDefault()

    api.post("token/", userInfo)
    .then(res => {
        console.log(res.data)
        localStorage.setItem("access", res.data.access)
        localStorage.setItem("refresh", res.data.refresh)
        setUsername("")
        setPassword("")

        const from = "/";
        navigate(from, {replace:true});

       
    })

    .catch(err => {
        console.log(err.message)
    
    })

    
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">username</label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
