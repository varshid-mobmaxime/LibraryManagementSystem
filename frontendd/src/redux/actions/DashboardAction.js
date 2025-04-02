import { loaderRef } from "../../components/Loader";
import ApiConstants from "../../constants/apiConstant";
import { apiGet } from "../../Services/api";

export const getDashboardDetails = (callBack) => {
  loaderRef.current.show();
  return () => {
    apiGet(ApiConstants.DashboardDetailsUrl)
      .then((response) => {
        loaderRef.current.hide();
        callBack?.(response?.data?.success, response?.data?.result); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Get all books APi Err => ", err);
      });
  };
};
