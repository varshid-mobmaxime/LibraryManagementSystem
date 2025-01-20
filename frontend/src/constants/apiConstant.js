const ApiConstants = {
  //Auth Urls
  SignInRequest: "user/login",
  SignUpRequest: "user/register",

  //Media Upload
  ProfilePicUploadUrl: "media-upload/profile",
  BookPicUploadUrl: "media-upload/book",

  //Profile Urls
  ChangePasswordUrl: "user/change-password",
  UpdateProfilePicUrl: "user/update-profile",

  //Users
  UserUrl: "user",
  UserListUrl: "admin/users",
  UpdateUserProfileUrl: "admin/update-user",
  DeleteUserProfileUrl: "admin/delete-user",
  UserAllBookUrl: "request-book/user",
  UserBookRequestUrl: "request-book/user-request",
  UserBookIssueUrl: "request-book/user-issue",
  UserBookReturnUrl: "request-book/user-return",
  UserBookCancelUrl: "request-book/user-cancel",

  //Books Urls
  BookUrl: "books",
  AllRequestedBookList: "request-book/list",
  RequestBookUrl: "request-book",
  UpdateBookStatusUrl: "request-book/update-record",
  GetFavouriteBooksListUrl: "books/get-favourite-books",
  BookFavourite: "books/favourite",
};

export default ApiConstants;
