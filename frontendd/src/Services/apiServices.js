// Local Imports
import {loaderRef} from '../components/Loader';
import {apiClient} from './client';

// Get Api Calling
const apiGet = async (endPoint, data = {}) => {
  loaderRef.current.show(); // Loader Show Functionality
  return await apiClient()
    .get(endPoint, data)
    .then(res => {
      loaderRef.current.hide(); // Loader Hide Functionality
      return res;
    })
    .catch(err => {
      loaderRef.current.hide(); // Loader Hide Functionality
      return err.message;
    });
};

const apiPost = async (endPoint, data, headers = {}) => {
  loaderRef.current.show();
  return await apiClient()
    .post(endPoint, data, {
      headers,
    })
    .then(res => {
      loaderRef.current.hide(); // Loader Hide Functionality
      return res;
    })
    .catch(err => {
      loaderRef.current.hide(); // Loader Hide Functionality
      return err.message;
    });
};

// Put and Update Api Calling
const apiPut = async (endPoint, data = {}) => {
  loaderRef.current.show(); // Loader Show Functionality
  return await apiClient()
    .put(endPoint, data)
    .then(res => {
      loaderRef.current.hide(); // Loader Hide Functionality
      return res;
    })
    .catch(err => {
      loaderRef.current.hide(); // Loader Hide Functionality
      return err.message;
    });
};

// Delete Api Calling
const apiDelete = async (endPoint, data = {}) => {
  loaderRef.current.show(); // Loader Show Functionality
  return await apiClient()
    .delete(
      endPoint,
      {},
      {
        data,
      },
    )
    .then(res => {
      loaderRef.current.hide(); // Loader Hide Functionality
      return res;
    })
    .catch(err => {
      loaderRef.current.hide(); // Loader Hide Functionality
      return err.message;
    });
};

export {apiDelete, apiGet, apiPost, apiPut};
