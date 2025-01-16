const ApiConstants = {
  //Auth Urls
  SignInRequest: "user/login",
  SignUpRequest: "user/register",

  //Profile Urls
  ChangePasswordUrl: "user/change-password",

  //Users
  UserUrl: "user",
  UserListUrl: "admin/users",
  UpdateUserProfileUrl: "admin/update-user",
  DeleteUserProfileUrl: "admin/delete-user",
  UserBookRequestUrl: "request-book/user",

  //Books Urls
  BookUrl: "books",
  AllRequestedBookList: "request-book/list",
  RequestBookUrl: "request-book",
  UpdateBookStatusUrl: "request-book/update-record",
  GetFavouriteBooksListUrl: "books/get-favourite-books",
  BookFavourite: "books/favourite",
};

export default ApiConstants;
