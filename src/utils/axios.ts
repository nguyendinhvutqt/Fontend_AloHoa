import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Lấy AccessToken và RefreshToken từ Local Storage nếu có
let accessToken: string | null = localStorage.getItem("accessToken");
const refreshToken: string | null = localStorage.getItem("refreshToken");

// Intercept yêu cầu trước khi được gửi đi
instance.interceptors.request.use(
  async (config) => {
    // Nếu có AccessToken, thêm vào header Authorization
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept phản hồi trước khi được trả về
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra nếu lỗi là do AccessToken hết hạn và có RefreshToken
    if (error.response.status === 401 && refreshToken) {
      // Gọi API refresh token để lấy AccessToken mới
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/refresh",
        {
          refreshToken,
        }
      );

      // Lưu AccessToken mới và cập nhật trong Local Storage
      accessToken = response.data.accessToken;
      if (accessToken !== null) {
        localStorage.setItem("accessToken", accessToken);
      }

      // Thử gửi lại yêu cầu gốc
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default instance;
