import { useContext } from "react";
import BookContext from "../context/bookContext";

const useBookContext = () => {
  return useContext(BookContext);
};

export default useBookContext;
