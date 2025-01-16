import { BOOK_REQUEST_STATUS } from "../constants";

export const getRequestBookStatusString = (status) => {
  const statusMap = Object.entries(BOOK_REQUEST_STATUS).find(
    ([key, value]) => value === status
  );
  return statusMap ? statusMap[0] : "Unknown";
};
