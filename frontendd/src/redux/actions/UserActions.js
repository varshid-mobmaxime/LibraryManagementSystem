import { loaderRef } from "../../components/Loader";
import ApiConstants from "../../constants/apiConstant";
import { apiDelete, apiGet, apiPut } from "../../Services/api";
import { ToastError, ToastSuccess } from "../../constants/toastConstant";

export const getAllUserList = (callBack) => {
  loaderRef.current.show();
  return () => {
    apiGet(ApiConstants.UserListUrl)
      .then((response) => {
        loaderRef.current.hide();
        console.log("get all user response is =--> ", response.data);

        callBack?.(response?.data?.users); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Get all books APi Err => ", err);
      });
  };
};

export const getUserDetails = (userId, callBack) => {
  loaderRef.current.show();
  return () => {
    apiGet(`${ApiConstants.UserUrl}/${userId}`)
      .then((response) => {
        loaderRef.current.hide();
        console.log("User details response is =--> ", response);
        callBack?.(response?.data?.success, response?.data?.result); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Get all books APi Err => ", err);
      });
  };
};

export const updateUserDetails = (userId, payload, callBack) => {
  loaderRef.current.show();
  return () => {
    apiPut(`${ApiConstants.UpdateUserProfileUrl}/${userId}`, payload)
      .then((response) => {
        loaderRef.current.hide();

        if (response?.data?.success) {
          ToastSuccess(response?.data?.message);
        }

        console.log("User details response is =--> ", response);
        callBack?.(response?.data?.success, response?.data?.message); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Get all books APi Err => ", err);
      });
  };
};

export const deleteUserRequest = (userId, callBack) => {
  loaderRef.current.show();
  return () => {
    apiDelete(`${ApiConstants.DeleteUserProfileUrl}/${userId}`)
      .then((response) => {
        loaderRef.current.hide();

        if (response?.data?.success) {
          ToastSuccess(response?.data?.message);
        } else {
          ToastError(response?.data?.message);
        }

        callBack?.(response?.data?.success); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Get all books APi Err => ", err);
      });
  };
};
