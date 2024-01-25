import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASEURL from "../../constants/baseurl";

import userPageImage from "../../assets/userpageImages/userpage.png";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signupRedirect = () => {
    navigate("/register");
  };

  const handleusername = (e) => {
    setusername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = () => {
    setLoading(true);
    axios
      .post(`${BASEURL}/login`, {
        username,
        password,
      })
      .then((response) => {
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("token", response.data.token);
        // Handle any success response if needed
        navigate("/");
      })
      .catch((error) => {
        toast.error("Incorrect username or Password. Try again.", {
          position: "top-center",
          autoClose: 3000,
        });
        console.error("Login failed", error); // Handle any error response if needed
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login__page">
      <div className="login__page__left">
        <div className="login__title">
          <h1>Login as a Book Seller</h1>
        </div>
        <div className="login__form">
          <input
            value={username}
            onChange={handleusername}
            type="username"
            placeholder="username"
          />
          <input
            value={password}
            onChange={handlePassword}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="login__footer">
          <button id="login__signin" onClick={login} disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
          <div className="login__footer__text">
            <span>Don't have an account? </span>
            <u onClick={signupRedirect} style={{ cursor: "pointer" }}>
              Sign Up
            </u>
          </div>
        </div>
      </div>
      <div className="login__page__right">
        <img src={`${userPageImage}`} alt="" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
