import { loaderRef } from "../../components/Loader";
import ApiConstants from "../../constants/apiConstant";
import { apiGet, apiPost } from "../../Services/api";

export const getAllBooksList = (callBack) => {
  loaderRef.current.show();
  return () => {
    apiGet(ApiConstants.GetAllBooksListUrl)
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
    apiGet(`${ApiConstants.GetAllBooksListUrl}/${id}`)
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

        callBack?.(response?.data?.success, response?.data?.result); // CallBack Function Call
      })
      .catch((err) => {
        console.log("books favourite APi Err => ", err);
      });
  };
};
