// Local Imports
import { apiClient } from "./client";

// Get Api Calling
const apiGet = async (endPoint, data = {}) => {
  return await apiClient()
    .get(endPoint, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.message;
    });
};

const apiPost = async (endPoint, data, headers = {}) => {
  return await apiClient()
    .post(endPoint, data, {
      headers,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.message;
    });
};

// Put and Update Api Calling
const apiPut = async (endPoint, data = {}) => {
  return await apiClient()
    .put(endPoint, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.message;
    });
};

// Delete Api Calling
const apiDelete = async (endPoint, data = {}) => {
  return await apiClient()
    .delete(
      endPoint,
      {},
      {
        data,
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.message;
    });
};

export { apiDelete, apiGet, apiPost, apiPut };
