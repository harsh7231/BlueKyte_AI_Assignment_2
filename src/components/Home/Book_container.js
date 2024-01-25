import React from "react";
import "./BookContainer.css";
import useBookContext from "../../hooks/usebookContext";
import Loading from "../Loading/Loading";
import BookBox from "./Book_Box";

const BookContainer = () => {
  const { bookListings, loading } = useBookContext();

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="bookContainer">
          {bookListings.map((book) => (
            <BookBox key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookContainer;
