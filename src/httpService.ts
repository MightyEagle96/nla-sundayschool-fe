import axis from "axios";

export const httpService = axis.create({
  baseURL: "http://localhost:4000/api",
  //withCredentials: true,
  timeout: 10000,
});

httpService.defaults.headers.post["Content-Type"] = "application/json";

httpService.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpService.interceptors.response.use(
  (response) => {
    // ✅ Success case: always wrap in a consistent object
    return {
      status: response.status,
      data: response.data,
    };
  },
  (error) => {
    if (error.response) {
      // ✅ Server responded with an error
      return Promise.resolve({
        status: error.response.status,
        data: error.response.data || error.message,
      });
    } else if (error.request) {
      // ✅ Request made but no response
      return Promise.resolve({
        status: 0,
        data: "No response from server. Please try again.",
      });
    } else {
      // ✅ Something happened setting up request
      return Promise.resolve({
        status: 0,
        data: error.message || "Unexpected error occurred",
      });
    }
  }
);

export default httpService;
