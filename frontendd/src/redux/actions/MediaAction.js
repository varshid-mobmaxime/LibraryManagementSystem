import { loaderRef } from "../../components/Loader";
import ApiConstants from "../../constants/apiConstant";
import { ToastError, ToastSuccess } from "../../constants/toastConstant";
import { apiPost } from "../../Services/api";

export const UploadProfileMedia = (data, callBack) => {
  loaderRef.current.show();
  return (dispatch) => {
    apiPost(ApiConstants.ProfilePicUploadUrl, data)
      .then((response) => {
        console.log("response =--> ", response.data);
        loaderRef.current.hide();
        if (response?.data?.success) {
          ToastSuccess("Register successfully.");
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
