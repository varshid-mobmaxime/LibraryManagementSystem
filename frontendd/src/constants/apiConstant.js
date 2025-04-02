const ApiConstants = {
  //Auth Urls
  SignInRequest: "user/login",
  SignUpRequest: "user/register",

  //Dashboard Urls
  DashboardDetailsUrl: "admin/dashboard-details",

  //Media Upload
  ProfilePicUploadUrl: "media-upload/profile",
  BookPicUploadUrl: "media-upload/book",

  //Profile Urls
  ChangePasswordUrl: "user/change-password",
  UpdateProfilePicUrl: "user/update-profile",
  UserBookHistoryUrl: "user/book-history",

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

  //Chat URLs
  getChatListUrl: "message",
  SendChatUrl: "message/send",

  //Book Rating
  BookRating: "books-rating",
};

export default ApiConstants;
