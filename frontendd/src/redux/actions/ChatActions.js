import { loaderRef } from "../../components/Loader";
import ApiConstants from "../../constants/apiConstant";
import { apiGet, apiPost } from "../../Services/api";

export const getAllChatList = (userId, callBack) => {
  loaderRef.current.show();

  return () => {
    apiGet(ApiConstants.getChatListUrl + `/${userId}`)
      .then((response) => {
        loaderRef.current.hide();
        console.log("Chat List response is =--> ", response);

        callBack?.(response?.data?.success, response?.data?.result); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Get all books APi Err => ", err);
      });
  };
};

export const SendChat = (Id, payload, callBack) => {
  loaderRef.current.show();

  return () => {
    apiPost(ApiConstants.SendChatUrl + `/${Id}`, payload)
      .then((response) => {
        loaderRef.current.hide();
        console.log("Chat List response is =--> ", response);

        callBack?.(response?.data?.success, response?.data?.result); // CallBack Function Call
      })
      .catch((err) => {
        console.log("Get all books APi Err => ", err);
      });
  };
};
