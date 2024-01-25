import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import useBookContext from "../../hooks/usebookContext";

const Header = () => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useBookContext();

  const loginPage = () => {
    navigate("/login");
  };

  const signupPage = () => {
    navigate("/register");
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/");
  };

  const addbookButton = () => {
    navigate("/addbook");
  };

  return (
    <div className="header">
      <div className="book__title">Book Store</div>
      {loggedIn ? (
        <div className="user__icon">
          <button onClick={addbookButton}> Add book</button>
          <button onClick={logout}>Logout</button>
          <span>Hello Book Seller!</span>
          <img
            src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
            alt=""
          />
        </div>
      ) : (
        <div className="signup__buttons">
          <button className="header__login" onClick={loginPage}>
            Login
          </button>
          <button className="header__register" onClick={signupPage}>
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
