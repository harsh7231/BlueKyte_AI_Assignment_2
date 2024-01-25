import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import userPageImage from "../../assets/userpageImages/userpage.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useBookContext from "../../hooks/usebookContext";
import BASEURL from "../../constants/baseurl";

const Register = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setusernameError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setLoggedIn } = useBookContext();

  const navigate = useNavigate();

  const handleusernameChange = (e) => {
    setusername(e.target.value.trim());
    setusernameError("");
    setFormError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trim());
    setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setFormError("Please fill in all the fields");
      return;
    }

    // Perform registration logic here if there are no validation errors
    if (!usernameError) {
      setLoading(true);
      axios
        .post(`${BASEURL}/register`, {
          username: username,
          password: password,
        })
        .then((res) => {
          console.log("here");
          if (res.status === 409) {
            toast.error("User already exists. Please Login!", {
              position: "top-center",
              autoClose: 2000,
            });
            setTimeout(() => {
              navigate("/register");
            }, 2000); // Redirect to register page after 2 seconds
            return;
          }
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("username", res.data.username);
          toast.success("Registration Successful", {
            position: "top-center",
            autoClose: 2000,
          });
          setLoggedIn(true);
          setTimeout(() => {
            navigate("/");
          }, 2000);
          console.log("here1");
        })
        .catch((err) => {
          console.log("here2");
          console.log(err);
          if (err.response.status === 409) {
            toast.error("User already exists. Please Login!", {
              position: "top-center",
              autoClose: 2000,
            });
            setTimeout(() => {
              navigate("/register");
            }, 2000); // Redirect to register page after 2 seconds
            return;
          }
          toast.error(err.response.data.message, {
            position: "top-center",
            autoClose: 2000,
          });
          setTimeout(() => {
            navigate("/register");
          }, 2000); // Redirect to register page after 2 seconds
          setFormError(err.response.data.message);
          console.log("here3");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setFormError("Please fill in all the fields");
      toast.error("Please fill in all the fields", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/register");
      }, 2000); // Redirect to register page after 2 seconds
    }
  };

  const loginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="register__page">
      <div className="register__page__left">
        <div className="register__title">
          <h1>Register for Book Store</h1>
          <span>Welcome New User!</span>
        </div>
        <div className="register__form">
          <div>
            <input
              value={username}
              onChange={handleusernameChange}
              type="username"
              placeholder="username"
            />
            {usernameError && <p className="error-message">{usernameError}</p>}
          </div>
          <div>
            <input
              value={password}
              onChange={handlePasswordChange}
              type="password"
              placeholder="Password"
            />
            {formError && <p className="error-message">{formError}</p>}
          </div>
        </div>
        <div className="register__footer">
          <button
            id="register__create__account"
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Create Account"}
          </button>
          <div className="register__footer__text">
            <span>Already have an account? </span>
            <u onClick={loginRedirect} style={{ cursor: "pointer" }}>
              Sign In
            </u>
          </div>
        </div>
      </div>
      <div className="register__page__right">
        <img src={`${userPageImage}`} alt="" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
