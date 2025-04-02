import { loaderRef } from "../../components/Loader";
import ApiConstants from "../../constants/apiConstant";
import { ToastError, ToastSuccess } from "../../constants/toastConstant";
import { apiPost } from "../../Services/api";
import { onSignIn } from "../slice/authSlice";

export const SignInRequest = (data, callBack) => {
  loaderRef.current.show();
  return (dispatch) => {
    apiPost(ApiConstants.SignInRequest, data)
      .then((response) => {
        console.log("response =--> ", response.data);
        loaderRef.current.hide();
        callBack?.(response?.data?.success, response?.data?.user); // CallBack Function Call
        if (response?.data?.success) {
          ToastSuccess("Sign in successfully.");
          //set value in redux
          dispatch(onSignIn(response.data));
        } else {
          ToastError(response?.data?.message);
        }
      })
      .catch((err) => {
        console.log("SignIn Err => ", err);
      });
  };
};

export const RegisterUserRequest = (data, callBack) => {
  loaderRef.current.show();
  return (dispatch) => {
    apiPost(ApiConstants.SignUpRequest, data)
      .then((response) => {
        console.log("response =--> ", response.data);
        loaderRef.current.hide();
        if (response?.data?.success) {
          ToastSuccess("Register successfully.");
          //set value in redux
          dispatch(onSignIn(response.data));
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
