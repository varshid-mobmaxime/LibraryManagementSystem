import { loaderRef } from "../../components/Loader";
import ApiConstants from "../../constants/apiConstant";
import { ToastError, ToastSuccess } from "../../constants/toastConstant";
import { apiPost } from "../../Services/api";

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
