import { createContext, useState } from "react";

const BookContext = createContext({
  loggedIn: false,
  setLoggedIn: () => {},
  loading: false,
  setLoading: () => {},
});

const Provider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [bookListings, setbookListings] = useState([]);
  const [bookId, setbookId] = useState("");
  const [loading, setLoading] = useState(false);

  const valueToShare = {
    loggedIn,
    setLoggedIn,
    bookListings,
    setbookListings,
    bookId,
    setbookId,
    loading,
    setLoading,
  };

  return (
    <BookContext.Provider value={valueToShare}>{children}</BookContext.Provider>
  );
};

export { Provider };

export default BookContext;
