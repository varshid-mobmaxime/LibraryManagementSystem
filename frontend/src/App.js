import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/Navbar/NavBar";
import NavigationRoutes from "./route/NavigationRoutes";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader";

const App = () => {
  return (
    // <div style={{ display: "contents" }}>
    <Router>
      <NavBar />
      <div className="h-full">
        <NavigationRoutes />
        <ToastContainer />
        <Loader />
      </div>
    </Router>
    // </div>
  );
};

export default App;
