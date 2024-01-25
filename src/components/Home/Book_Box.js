import React from "react";
import "./BookBox.css";
import useBookContext from "../../hooks/usebookContext";
import { useNavigate } from "react-router-dom";
const BookBox = ({ book }) => {
  const { loggedIn, setbookId } = useBookContext();
  const navigate = useNavigate();

  const getbookDetails = () => {
    navigate(`/editbook/${book._id}`);
  };

  const handleViewDetails = (e) => {
    setbookId(book._id);
    navigate(`/${book._id}`);
  };

  return (
    <div className="bookBox__container">
      <div className="book__left__component">
        <div className="book__logo">
          <img src={book.addLogoURL} alt="groupIcon" />
        </div>
        <div className="second__div">
          <span>{book.BookTitle}</span>
        </div>
        <div className="second__div__footer">
          <span>By {book.Author}</span>
        </div>
        <div className="second__div__text">
          <span>₹ {book.Price}</span>
        </div>
        <div className="third__div">
          <span>Published In: {book.PublicationYear}</span>
        </div>
      </div>
      <div className="book__right__lower">
        {loggedIn ? <button onClick={getbookDetails}>Edit Book</button> : null}
        <button onClick={handleViewDetails}>View Details</button>
      </div>
    </div>
  );
};

export default BookBox;
