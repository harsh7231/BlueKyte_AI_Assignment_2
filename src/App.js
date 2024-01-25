import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import BookDetails from "./components/Home/Book_Details";
import Header from "./components/Home/Header";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Addbook from "./components/Addbook/Addbook";
import Editbook from "./components/Editbook/Editbook";
import Error404 from "./components/NotFound/Error404";
import Health from "./components/Health/Health";
import { Provider } from "./context/bookContext";

function App() {
  return (
    <Provider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Home />
                </>
              }
            />
            <Route
              path="/:id"
              element={
                <>
                  <Header />
                  <BookDetails />
                </>
              }
            />
            <Route path="/health" element={<Health />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addbook" element={<Addbook />} />
            <Route path="/editbook/:id" element={<Editbook />} />
            <Route path="/404" element={<Error404 />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
