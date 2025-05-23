import { loaderRef } from "../../components/Loader";
import ApiConstants from "../../constants/apiConstant";
import { apiDelete, apiGet, apiPost, apiPut } from "../../Services/api";

export const AddBookRequest = (payload, callBack) => {
  loaderRef.current.show();
  return () => {
    apiPost(ApiConstants.BookUrl, payload)
      .then((response) => {
        loaderRef.current.hide();
        console.log("response is =--> ", response);
        callBack?.(response?.data?.success, response?.data?.message); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Get all books APi Err => ", err);
      });
  };
};

export const AllRequestedBookList = (callBack) => {
  loaderRef.current.show();
  return () => {
    apiGet(ApiConstants.AllRequestedBookList)
      .then((response) => {
        loaderRef.current.hide();
        console.log("response is =--> ", response);
        callBack?.(response?.data?.success, response?.data?.result); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Get all books APi Err => ", err);
      });
  };
};

export const getAllBooksList = (search, callBack) => {
  loaderRef.current.show();

  return () => {
    let url = ApiConstants.BookUrl;
    search && (url = `${url}?search=${search}`);
    apiGet(url)
      .then((response) => {
        loaderRef.current.hide();
        callBack?.(response?.data?.success, response?.data?.result); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Get all books APi Err => ", err);
      });
  };
};

export const getFavouriteBooksList = (callBack) => {
  loaderRef.current.show();
  return () => {
    apiGet(ApiConstants.GetFavouriteBooksListUrl)
      .then((response) => {
        loaderRef.current.hide();
        callBack?.(response?.data?.success, response?.data?.result); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Get all books APi Err => ", err);
      });
  };
};

export const getBookDetails = (id, callBack) => {
  loaderRef.current.show();
  return () => {
    apiGet(`${ApiConstants.BookUrl}/${id}`)
      .then((response) => {
        console.log("Bok Details response is =--> ", response);

        loaderRef.current.hide();
        callBack?.(response?.data?.success, response?.data?.result); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Get all books APi Err => ", err);
      });
  };
};

export const BookFavourite = (data, callBack) => {
  loaderRef.current.show();
  return () => {
    apiPost(ApiConstants.BookFavourite, data)
      .then((response) => {
        loaderRef.current.hide();
        console.log("response is =--> ", response);

        callBack?.(
          response?.data?.success,
          response?.data?.result,
          response?.data?.message
        ); // CallBack Function Call
      })
      .catch((err) => {
        console.log("books favourite APi Err => ", err);
      });
  };
};

export const UpdateBookRequest = (bookId, data, callBack) => {
  loaderRef.current.show();
  return () => {
    apiPut(`${ApiConstants.BookUrl}/${bookId}`, data)
      .then((response) => {
        loaderRef.current.hide();
        console.log("response is =--> ", response);
        callBack?.(response?.data?.success, response?.data?.message); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Update book APi Err => ", err);
      });
  };
};

export const DeleteBookRequest = (bookId, callBack) => {
  loaderRef.current.show();
  return () => {
    apiDelete(`${ApiConstants.BookUrl}/${bookId}`)
      .then((response) => {
        loaderRef.current.hide();
        console.log("response is =--> ", response);
        callBack?.(response?.data?.success, response?.data?.message); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Delete books APi Err => ", err);
      });
  };
};

export const RequestBook = (payload, callBack) => {
  loaderRef.current.show();
  return () => {
    apiPost(ApiConstants.RequestBookUrl, payload)
      .then((response) => {
        loaderRef.current.hide();
        console.log("Request Book response is =--> ", response);
        callBack?.(response?.data?.success, response?.data?.message); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Delete books APi Err => ", err);
      });
  };
};

export const UserAllBook = (id, callBack) => {
  loaderRef.current.show();
  return () => {
    apiGet(`${ApiConstants.UserAllBookUrl}/${id}`)
      .then((response) => {
        loaderRef.current.hide();
        callBack?.(response?.data?.success, response?.data?.result); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Delete books APi Err => ", err);
      });
  };
};

export const UserRequestBook = (callBack) => {
  loaderRef.current.show();
  return () => {
    apiGet(ApiConstants.UserBookRequestUrl)
      .then((response) => {
        loaderRef.current.hide();
        callBack?.(response?.data?.success, response?.data?.result); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Delete books APi Err => ", err);
      });
  };
};

export const UserIssueBook = (callBack) => {
  loaderRef.current.show();
  return () => {
    apiGet(ApiConstants.UserBookIssueUrl)
      .then((response) => {
        console.log("response is =--> ", response);

        loaderRef.current.hide();
        callBack?.(response?.data?.success, response?.data?.result); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Delete books APi Err => ", err);
      });
  };
};

export const UserReturnBook = (callBack) => {
  loaderRef.current.show();
  return () => {
    apiGet(ApiConstants.UserBookReturnUrl)
      .then((response) => {
        loaderRef.current.hide();
        callBack?.(response?.data?.success, response?.data?.result); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Delete books APi Err => ", err);
      });
  };
};

export const UserCancelBook = (callBack) => {
  loaderRef.current.show();
  return () => {
    apiGet(ApiConstants.UserBookCancelUrl)
      .then((response) => {
        loaderRef.current.hide();
        callBack?.(response?.data?.success, response?.data?.result); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Delete books APi Err => ", err);
      });
  };
};

export const UpdateBookStatus = (payload, callBack) => {
  loaderRef.current.show();
  return () => {
    apiPost(ApiConstants.UpdateBookStatusUrl, payload)
      .then((response) => {
        loaderRef.current.hide();
        console.log("Request Book response is =--> ", response);
        callBack?.(response?.data?.success, response?.data?.message); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Delete books APi Err => ", err);
      });
  };
};

//Add Book Rating
export const AddBookRating = (payload, callBack) => {
  loaderRef.current.show();
  return () => {
    apiPost(ApiConstants.BookRating, payload)
      .then((response) => {
        loaderRef.current.hide();
        console.log("Request Book response is =--> ", response);
        callBack?.(response?.data?.success, response?.data?.message); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Delete books APi Err => ", err);
      });
  };
};
