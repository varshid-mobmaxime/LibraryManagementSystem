import { loaderRef } from "../../components/Loader";
import ApiConstants from "../../constants/apiConstant";
import { ToastError, ToastSuccess } from "../../constants/toastConstant";
import { apiPost, apiPut } from "../../Services/api";
import { onProfilePicUpdate } from "../slice/authSlice";

export const ChangePasswordRequest = (data, callBack) => {
  loaderRef.current.show();
  return () => {
    apiPost(ApiConstants.ChangePasswordUrl, data)
      .then((response) => {
        loaderRef.current.hide();
        console.log("response?.data is =--> ", response?.data);

        if (response?.data?.success) {
          ToastSuccess("Password Change successfully.");
          //set value in redux
        } else {
          ToastError(response?.data?.message);
        }
        callBack?.(response?.data?.success, response?.data); // CallBack Function Call
      })
      .catch((err) => {
        console.log("SignIn Err => ", err);
      });
  };
};

export const UpdateProfilePic = (data, callBack) => {
  loaderRef.current.show();
  return (dispatch) => {
    apiPost(ApiConstants.UpdateProfilePicUrl, data)
      .then((response) => {
        loaderRef.current.hide();
        console.log("response?.data is =--> ", response?.data);

        if (response?.data?.success) {
          dispatch(onProfilePicUpdate(data?.avatar));
          ToastSuccess(response?.data?.message);
          //set value in redux
        } else {
          ToastError(response?.data?.message);
        }
        callBack?.(response?.data?.success); // CallBack Function Call
      })
      .catch((err) => {
        console.log("SignIn Err => ", err);
      });
  };
};
