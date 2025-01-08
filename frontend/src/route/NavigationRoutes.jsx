import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Books from "../pages/Books/Books.page";
import Dashboard from "../pages/Dashboard/Dashboard.page";
import Register from "../pages/Auth/Register.page";
import Signin from "../pages/Auth/Signin.page";
import Welcome from "../pages/Auth/Welcome.page";
import ChangePassword from "../pages/Profile/ChangePassword.page";
import ViewProfile from "../pages/Profile/ViewProfile.page";
import BookDetails from "../pages/Books/BookDetails.page";

const AuthRoutes = () => (
  <Routes>
    <Route exact path="/" element={<Welcome />} />
    <Route path="/Register" element={<Register />} />
    <Route path="/Signin" element={<Signin />} />
  </Routes>
);

const DashboardRoutes = () => (
  <Routes>
    <Route exact path="/" element={<Dashboard />} />
    <Route path="/books" element={<Books />} />
    <Route path="/change-password" element={<ChangePassword />} />
    <Route path="/view-profile" element={<ViewProfile />} />
    <Route path="/book-details" element={<BookDetails />} />
  </Routes>
);

const NavigationRoutes = () => {
  const { token } = useSelector((state) => state.auth);

  return token ? <DashboardRoutes /> : <AuthRoutes />;
};

export default NavigationRoutes;
