import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/Auth/Register.page";
import Signin from "../pages/Auth/Signin.page";
import Welcome from "../pages/Auth/Welcome.page";
import BookDetails from "../pages/Books/BookDetails.page";
import Books from "../pages/Books/Books.page";
import Dashboard from "../pages/Dashboard/Dashboard.page";
import ChangePassword from "../pages/Profile/ChangePassword.page";
import ViewProfile from "../pages/Profile/ViewProfile.page";
import FavouriteBooks from "../pages/Books/FavouriteBooks.page";
import AddBook from "../pages/Books/AddBook.page";
import AllUsers from "../pages/User/AllUsers.page";
import RouteConstants from "../constants/navigationRouteConstant";
import UpdateBook from "../pages/Books/UpdateBook.page";
import EditProfile from "../pages/Profile/EditProfile.page";
import RequestBook from "../pages/Books/RequestBook.page";
import UserRequestBooks from "../pages/Books/UserRequestBooks.page";

const AuthRoutes = () => (
  <Routes>
    <Route exact path={RouteConstants.ROOT_PAGE} element={<Welcome />} />
    <Route path={RouteConstants.REGISTER_PAGE} element={<Register />} />
    <Route path={RouteConstants.LOGIN_PAGE} element={<Signin />} />
  </Routes>
);

const MainRoutes = () => (
  <Routes>
    <Route exact path={RouteConstants.ROOT_PAGE} element={<Dashboard />}>
      <Route exact path={RouteConstants.BOOK_PAGE} element={<Books />} />
      <Route path={RouteConstants.ADD_BOOK_PAGE} element={<AddBook />} />
      <Route path={RouteConstants.ALL_USER_PAGE} element={<AllUsers />} />
      <Route
        path={RouteConstants.REQUEST_BOOK_PAGE}
        element={<RequestBook />}
      />
      <Route
        path={RouteConstants.FAVOURITE_BOOKS_PAGE}
        element={<FavouriteBooks />}
      />
      <Route path={RouteConstants.BOOK_DETAIL_PAGE} element={<BookDetails />} />
      <Route
        path={RouteConstants.USER_REQUESTED_BOOKS}
        element={<UserRequestBooks />}
      />

      {/* <Route
        path={RouteConstants.VIEW_PROFILE_PAGE}
        element={<ViewProfile />}
      /> */}
    </Route>
    {/* <Route path="/books" element={<Books />} /> */}
    <Route
      path={RouteConstants.CHANGE_PASSWORD_PAGE}
      element={<ChangePassword />}
    />
    <Route path={RouteConstants.UPDATE_BOOK_PAGE} element={<UpdateBook />} />
    <Route path={RouteConstants.VIEW_PROFILE_PAGE} element={<ViewProfile />} />
    <Route path={RouteConstants.EDIT_USER_PROFILE} element={<EditProfile />} />
    <Route path={RouteConstants.BOOK_DETAIL_PAGE} element={<BookDetails />} />
  </Routes>
);

export const DashboardRoutes = () => (
  <Routes>
    <Route path={RouteConstants.BOOK_PAGE} element={<Books />} />
    <Route path={RouteConstants.ADD_BOOK_PAGE} element={<AddBook />} />
    <Route path={RouteConstants.REQUEST_BOOK_PAGE} element={<RequestBook />} />
    <Route
      path={RouteConstants.USER_REQUESTED_BOOKS}
      element={<UserRequestBooks />}
    />
    <Route path={RouteConstants.ALL_USER_PAGE} element={<AllUsers />} />
    <Route
      path={RouteConstants.CHANGE_PASSWORD_PAGE}
      element={<ChangePassword />}
    />
    {/* <Route path={RouteConstants.VIEW_PROFILE_PAGE} element={<ViewProfile />} /> */}
    <Route path={RouteConstants.BOOK_DETAIL_PAGE} element={<BookDetails />} />
    <Route
      path={RouteConstants.FAVOURITE_BOOKS_PAGE}
      element={<FavouriteBooks />}
    />
  </Routes>
);

const NavigationRoutes = () => {
  const { token } = useSelector((state) => state.auth);

  return token ? <MainRoutes /> : <AuthRoutes />;
};

export default NavigationRoutes;
