import React, { useState } from "react";
import "./Addbook.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import BASEURL from "../../constants/baseurl";

const Addbook = () => {
  const [BookTitle, setBookTitle] = useState("");
  const [addLogoURL, setAddLogoURL] = useState("");
  const [Price, setPrice] = useState("");
  const [Author, setAuthor] = useState("");
  const [PublicationYear, setPublicationYear] = useState("");
  const [bookDescription, setbookDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to be sent in the POST request
    const postData = {
      BookTitle,
      addLogoURL,
      Price,
      Author,
      PublicationYear,
      bookDescription,
    };
    console.log("postData", postData);

    // Send the POST request
    axios
      .post(`${BASEURL}/book-posting`, postData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("book posting successful", response);
        setBookTitle("");
        setAddLogoURL("");
        setPrice("");
        setAuthor("");
        setPublicationYear("");
        setbookDescription("");
        // Handle any success response if needed
        toast.success("book posted successfully!", {
          position: "top-center",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error("Unauthorized Access. Redirecting to home page", {
            position: "top-center",
            autoClose: 2000,
          });
          localStorage.clear();
          setTimeout(() => {
            navigate("/");
          }, 2000);
          return;
        } else if (error.response.status === 400) {
          toast.error("Please provide all the fields!", {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.error("book posting failed!", {
            position: "top-center",
            autoClose: 2000,
          });
        }

        console.error("book posting failed", error);
        // Handle any error response if needed
      });
    console.log(postData);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };
  const cancelAddbook = () => {
    toast.error("book posting cancelled!", {
      position: "top-center",
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="add__book">
      <div className="add__book__left">
        <h1>Add Book </h1>
        <form className="book__form" onSubmit={handleSubmit}>
          <div className="book__input">
            <label htmlFor="BookTitle">Book Title</label>
            <input
              type="text"
              placeholder="Book Title"
              value={BookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
            />
          </div>
          <div className="book__input">
            <label htmlFor="addLogoURL">Book Image</label>
            <input
              type="text"
              placeholder="Book Image URL"
              value={addLogoURL}
              onChange={(e) => setAddLogoURL(e.target.value)}
            />
          </div>
          <div className="book__input">
            <label htmlFor="Price">Book Price</label>
            <input
              type="number"
              placeholder="Book Price"
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="book__input">
            <label htmlFor="Author">Author Name</label>
            <input
              type="text"
              placeholder="Author Name"
              value={Author}
              onChange={handleAuthorChange}
            ></input>
          </div>
          <div className="book__input">
            <label htmlFor="PublicationYear">Publication Year</label>
            <input
              type="number"
              placeholder="Publication Year"
              value={PublicationYear}
              onChange={(e) => setPublicationYear(e.target.value)}
            />
          </div>
          <div className="book__input">
            <label htmlFor="bookDescription">Book Description</label>
            <textarea
              placeholder="Book Description"
              value={bookDescription}
              onChange={(e) => setbookDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="book__buttons">
            <button className="cancel__addbook" onClick={cancelAddbook}>
              Cancel
            </button>
            <button type="submit" className="add__book__button">
              Add book
            </button>
          </div>
        </form>
      </div>
      <div className="add__book__right">
        <h1>Book Seller add Book details here</h1>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Addbook;
