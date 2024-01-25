import React, { useEffect, useState } from "react";
import "./Editbook.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import BASEURL from "../../constants/baseurl";

const Editbook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id", id);
  const [BookTitle, setBookTitle] = useState("");
  const [addLogoURL, setAddLogoURL] = useState("");
  const [Price, setPrice] = useState("");
  const [Author, setAuthor] = useState("");
  const [PublicationYear, setPublicationYear] = useState("");
  const [bookDescription, setbookDescription] = useState("");

  useEffect(() => {
    axios
      .get(`${BASEURL}/books/${id}`)
      .then((response) => {
        console.log("response", response.data.bookListing);
        setBookTitle(response.data.bookListing.BookTitle);
        setAddLogoURL(response.data.bookListing.addLogoURL);
        setPrice(response.data.bookListing.Price);
        setAuthor(response.data.bookListing.Author);
        setPublicationYear(response.data.bookListing.PublicationYear);
        setbookDescription(response.data.bookListing.bookDescription);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, [id, navigate]);

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

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

    // Send the edit request
    axios
      .put(`${BASEURL}/book-posting/${id}`, postData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("Book posting successful", response);
        setBookTitle("");
        setAddLogoURL("");
        setPrice("");
        setAuthor("");
        setPublicationYear("");
        setbookDescription("");

        // Handle any success response if needed
        toast.success("Book Updated Successfully", {
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
        }

        toast.error("Book Update Failed. Redirecting to home page", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      });
  };

  const cancelUpdate = () => {
    navigate("/");
  };

  return (
    <div className="edit__book">
      <div className="edit__book__left">
        <h1>Edit Book Details</h1>
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
            <button onClick={cancelUpdate} className="cancel__updatebook">
              Cancel
            </button>
            <button type="submit" className="update__book__button">
              Update
            </button>
          </div>
        </form>
      </div>
      <div className="edit__book__right">
        <h1>Book Seller edit Book details here</h1>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Editbook;
