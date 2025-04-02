// import React from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
// import Main from "../components/layout/Main";
// import Home from "../pages/Home";
// import Profile from "../pages/Profile";
// import Rtl from "../pages/Rtl";
// import SignIn from "../pages/SignIn";
// import SignUp from "../pages/SignUp";
// import Tables from "../pages/Tables";

// // const AuthRoutes = () => (
// //   <Routes>
// //     <Route exact path={RouteConstants.ROOT_PAGE} element={<Welcome />} />
// //     <Route path={RouteConstants.REGISTER_PAGE} element={<Register />} />
// //     <Route path={RouteConstants.LOGIN_PAGE} element={<Signin />} />
// //   </Routes>
// // );

// // const MainRoutes = () => (
// //   <Routes>
// //     <Route exact path={RouteConstants.ROOT_PAGE} element={<Dashboard />}>
// //       <Route exact path={RouteConstants.BOOK_PAGE} element={<Books />} />
// //       <Route path={RouteConstants.ADD_BOOK_PAGE} element={<AddBook />} />
// //       <Route path={RouteConstants.ALL_USER_PAGE} element={<AllUsers />} />
// //       <Route
// //         path={RouteConstants.REQUEST_BOOK_PAGE}
// //         element={<RequestBook />}
// //       />
// //       <Route
// //         path={RouteConstants.FAVOURITE_BOOKS_PAGE}
// //         element={<FavouriteBooks />}
// //       />
// //       <Route path={RouteConstants.BOOK_DETAIL_PAGE} element={<BookDetails />} />
// //       <Route
// //         path={RouteConstants.USER_REQUESTED_BOOKS}
// //         element={<UserRequestBooks />}
// //       />

// //       {/* <Route
// //         path={RouteConstants.VIEW_PROFILE_PAGE}
// //         element={<ViewProfile />}
// //       /> */}
// //     </Route>
// //     {/* <Route path="/books" element={<Books />} /> */}
// //     <Route
// //       path={RouteConstants.CHANGE_PASSWORD_PAGE}
// //       element={<ChangePassword />}
// //     />
// //     <Route path={RouteConstants.UPDATE_BOOK_PAGE} element={<UpdateBook />} />
// //     <Route path={RouteConstants.VIEW_PROFILE_PAGE} element={<ViewProfile />} />
// //     <Route path={RouteConstants.EDIT_USER_PROFILE} element={<EditProfile />} />
// //     <Route path={RouteConstants.BOOK_DETAIL_PAGE} element={<BookDetails />} />
// //   </Routes>
// // );

// // export const DashboardRoutes = () => (
// //   <Routes>
// //     <Route path={RouteConstants.BOOK_PAGE} element={<Books />} />
// //     <Route path={RouteConstants.ADD_BOOK_PAGE} element={<AddBook />} />
// //     <Route path={RouteConstants.REQUEST_BOOK_PAGE} element={<RequestBook />} />
// //     <Route
// //       path={RouteConstants.USER_REQUESTED_BOOKS}
// //       element={<UserRequestBooks />}
// //     />
// //     <Route path={RouteConstants.ALL_USER_PAGE} element={<AllUsers />} />
// //     <Route
// //       path={RouteConstants.CHANGE_PASSWORD_PAGE}
// //       element={<ChangePassword />}
// //     />
// //     {/* <Route path={RouteConstants.VIEW_PROFILE_PAGE} element={<ViewProfile />} /> */}
// //     <Route path={RouteConstants.BOOK_DETAIL_PAGE} element={<BookDetails />} />
// //     <Route
// //       path={RouteConstants.FAVOURITE_BOOKS_PAGE}
// //       element={<FavouriteBooks />}
// //     />
// //   </Routes>
// // );

// const NavigationRoutes = () => {
//   return (
//     <Routes>
//       {/* Authentication Routes */}
//       <Route path="/sign-up" element={<SignUp />} />
//       <Route path="/" element={<SignIn />} />

//       {/* Main Layout Routes */}
//     </Routes>
//   );

//   // <Route path="/" element={<Main />}>
//   //   <Route path="dashboard" element={<Home />} />
//   //   <Route path="tables" element={<Tables />} />
//   //   <Route path="rtl" element={<Rtl />} />
//   //   <Route path="profile" element={<Profile />} />
//   //   {/* Redirect any unmatched paths */}
//   //   <Route path="*" element={<Navigate to="/dashboard" replace />} />
//   // </Route>
//   // const { token } = useSelector((state) => state.auth);

//   // return token ? <MainRoutes /> : <AuthRoutes />;
// };

// export default NavigationRoutes;

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Main from "../components/layout/Main";
import RouteConstants from "../constants/navigationRouteConstant";
import BookList from "../pages/Book.Page/BookList.page";
import BookDetails from "../pages/BookDetails.Page/BookDetails.Page";
import Home from "../pages/Home";
import ViewProfile from "../pages/Profile.Page/ViewProfile.page";
import Rtl from "../pages/Rtl";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Tables from "../pages/Tables";
import AllUsers from "../pages/AllUsers.Page/AllUsers.page";
import UserRequestBooks from "../pages/UserRequestBook.Page/UserRequestBooks.page";
import FavBooks from "../pages/FavBooks.Page/FavBooks.page";
import BookRequest from "../pages/BookRequest.Page.Admin/BookRequest.page.admin";
import Chat from "../pages/Chat.Page/Chat.page";
// import { useSelector } from "react-redux";

const AuthRoutes = () => (
  <Routes>
    {/* Authentication Routes */}
    <Route path={RouteConstants.SIGNIN_PAGE} element={<SignIn />} />
    <Route path={RouteConstants.SIGNUP_PAGE} element={<SignUp />} />

    {/* Main Layout Routes */}
  </Routes>
  // <Routes>
  //   <Route exact path={RouteConstants.ROOT_PAGE} element={<Welcome />} />
  //   <Route path={RouteConstants.REGISTER_PAGE} element={<Register />} />
  //   <Route path={RouteConstants.LOGIN_PAGE} element={<Signin />} />
  // </Routes>
);

const MainRoutes = ({ isAdmin }) => (
  <Routes>
    <Route path={RouteConstants.ROOT_PAGE} element={<Main />}>
      <Route
        path={RouteConstants.DASHBOARD_PAGE}
        element={isAdmin ? <Home /> : <BookList />}
      />
      <Route path={RouteConstants.BOOK_PAGE} element={<BookList />} />
      <Route path={RouteConstants.CHAT_PAGE} element={<Chat />} />
      <Route
        path={RouteConstants.USER_REQUESTED_BOOKS}
        element={<UserRequestBooks />}
      />
      <Route
        path={RouteConstants.ADMIN_REQUESTED_BOOKS}
        element={<BookRequest />}
      />
      <Route
        path={RouteConstants.USER_FAVOURITE_BOOKS_PAGE}
        element={<FavBooks />}
      />
      <Route path={RouteConstants.ALL_USER_PAGE} element={<Tables />} />
      <Route
        path={RouteConstants.VIEW_USER_PROFILE_PAGE}
        element={<ViewProfile />}
      />
      <Route
        path={RouteConstants.USER_BOOK_DETAIL_PAGE}
        element={<BookDetails />}
      />
      <Route
        path={RouteConstants.USER_FAV_BOOK_DETAIL_PAGE}
        element={<BookDetails />}
      />
      <Route path="tables" element={<Tables />} />
      <Route path="rtl" element={<Rtl />} />
      <Route
        path={RouteConstants.VIEW_PROFILE_PAGE}
        element={<ViewProfile />}
      />
      {/* Redirect any unmatched paths */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Route>
  </Routes>
  // <Routes>
  //   <Route exact path={RouteConstants.ROOT_PAGE} element={<Dashboard />}>
  //     <Route exact path={RouteConstants.BOOK_PAGE} element={<Books />} />
  //     <Route path={RouteConstants.ADD_BOOK_PAGE} element={<AddBook />} />
  //     <Route path={RouteConstants.ALL_USER_PAGE} element={<AllUsers />} />
  //     <Route
  //       path={RouteConstants.REQUEST_BOOK_PAGE}
  //       element={<RequestBook />}
  //     />
  //     <Route
  //       path={RouteConstants.FAVOURITE_BOOKS_PAGE}
  //       element={<FavouriteBooks />}
  //     />
  //     <Route path={RouteConstants.BOOK_DETAIL_PAGE} element={<BookDetails />} />
  //     <Route
  //       path={RouteConstants.USER_REQUESTED_BOOKS}
  //       element={<UserRequestBooks />}
  //     />

  //     {/* <Route
  //       path={RouteConstants.VIEW_PROFILE_PAGE}
  //       element={<ViewProfile />}
  //     /> */}
  //   </Route>
  //   {/* <Route path="/books" element={<Books />} /> */}
  //   <Route
  //     path={RouteConstants.CHANGE_PASSWORD_PAGE}
  //     element={<ChangePassword />}
  //   />
  //   <Route path={RouteConstants.UPDATE_BOOK_PAGE} element={<UpdateBook />} />
  //   <Route path={RouteConstants.VIEW_PROFILE_PAGE} element={<ViewProfile />} />
  //   <Route path={RouteConstants.EDIT_USER_PROFILE} element={<EditProfile />} />
  //   <Route path={RouteConstants.BOOK_DETAIL_PAGE} element={<BookDetails />} />
  // </Routes>
);

// export const DashboardRoutes = () => (
//   <Routes>
//     <Route path={RouteConstants.BOOK_PAGE} element={<Books />} />
//     <Route path={RouteConstants.ADD_BOOK_PAGE} element={<AddBook />} />
//     <Route path={RouteConstants.REQUEST_BOOK_PAGE} element={<RequestBook />} />
//     <Route
//       path={RouteConstants.USER_REQUESTED_BOOKS}
//       element={<UserRequestBooks />}
//     />
//     <Route path={RouteConstants.ALL_USER_PAGE} element={<AllUsers />} />
//     <Route
//       path={RouteConstants.CHANGE_PASSWORD_PAGE}
//       element={<ChangePassword />}
//     />
//     {/* <Route path={RouteConstants.VIEW_PROFILE_PAGE} element={<ViewProfile />} /> */}
//     <Route path={RouteConstants.BOOK_DETAIL_PAGE} element={<BookDetails />} />
//     <Route
//       path={RouteConstants.FAVOURITE_BOOKS_PAGE}
//       element={<FavouriteBooks />}
//     />
//   </Routes>
// );

const NavigationRoutes = () => {
  const { token, isAdmin } = useSelector((state) => state.auth);

  return token ? <MainRoutes isAdmin={isAdmin} /> : <AuthRoutes />;
};

export default NavigationRoutes;
