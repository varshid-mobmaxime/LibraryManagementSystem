import axios from "axios";
import { store } from "../redux/store";
import { Strings } from "../config/strings";

const apiClient = () => {
  const BaseUrl = process.env.REACT_APP_API_URL;
  // const BaseUrl = "https://localhost:5001/";

  const defaultOptions = {
    baseURL: BaseUrl,
    headers: {
      "Content-Type": "application/json",
      Accept: "Application/json",
    },
  };

  // Create instance
  const instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  try {
    instance.interceptors.request.use(
      async function (config) {
        try {
          const token = store?.getState()?.auth?.token;
          console.log("token is =--> ", token);

          config.headers.Authorization = token ? `Bearer ${token}` : "";
          return config;
        } catch (error) {
          return await Promise.reject(
            new Error(Strings.ErrorSettingAuthorizationToken + error.message)
          );
        }
      },
      async (error) =>
        await Promise.reject(
          new Error("Request Interceptor Error: " + error.message)
        )
    );

    return instance;
  } catch (error) {
    console.log("Err is =--> ", error);
  }
};

export { apiClient };
