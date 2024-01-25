import React, { useEffect, useState } from "react";
import "./BookDetails.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import useBookContext from "../../hooks/usebookContext";
import BASEURL from "../../constants/baseurl";
import Loading from "../Loading/Loading";

const BookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setbookDetails] = useState({});
  const navigate = useNavigate();
  const { loggedIn, setLoading, loading } = useBookContext();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASEURL}/books/` + id)
      .then((response) => {
        setbookDetails(response.data.bookListing);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        navigate("/404");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, navigate, setLoading]);

  const getbookDetails = () => {
    navigate(`/editbook/${id}`);
  };
  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`${BASEURL}/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        navigate("/");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        // Display an error toast
      });
  };

  return (
    <div className="book__details__container">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="book__details__upper">
            <span>{`${bookDetails.BookTitle} By ${bookDetails.Author}`}</span>
          </div>
          <div className="book__details__lower">
            <div className="book__details__first__section">
              <span>{moment(new Date(bookDetails.createdAt)).fromNow()}</span>
            </div>
            <div className="book__details__second__section">
              <img src={bookDetails.addLogoURL} alt="groupIcon" />
            </div>
            <div className="book__details__third__section">
              <span>{bookDetails.BookTitle}</span>
            </div>
            <div className="book__details__fourth__section">
              <span>By {bookDetails.Author}</span>
            </div>
            <div className="book__details__fifth__section">
              <span>Published In: {bookDetails.PublicationYear}</span>
            </div>
            <div className="book__details__sixth__section">
              <span>Price: ₹ {bookDetails.Price}</span>
            </div>
            <div className="book__details__seventh__section">
              <h1>About the Book</h1>
              <p>{bookDetails.bookDescription}</p>
            </div>
            <div className="book__details__eight__section">
              {loggedIn && <button onClick={getbookDetails}>Edit book</button>}
              {loggedIn && <button onClick={handleDelete}>Delete book</button>}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookDetails;
