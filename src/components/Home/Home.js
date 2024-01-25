import React, { useEffect } from "react";
import BookContainer from "./Book_container.js";
import useBookContext from "../../hooks/usebookContext.js";
import axios from "axios";
import BASEURL from "../../constants/baseurl";

const Home = () => {
  const { loggedIn, setLoggedIn, setbookListings, setLoading } =
    useBookContext();
  useEffect(() => {
    localStorage.getItem("token") ? setLoggedIn(true) : setLoggedIn(false);

    const getbookListings = () => {
      setLoading(true);
      axios
        .get(`${BASEURL}/books`)
        .then((response) => {
          setbookListings(response.data.bookListings);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getbookListings();
  }, [loggedIn, setLoggedIn, setbookListings, setLoading]);

  return (
    <div className="home">
      <BookContainer />
    </div>
  );
};

export default Home;
