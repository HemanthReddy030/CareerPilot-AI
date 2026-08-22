import API from "../api/axios";

// Register User
export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};

// Get User Profile
export const getProfile = async (token) => {
  const response = await API.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Verify Email
export const verifyEmail = async (token) => {
  const response = await API.get(`/auth/verify-email/${token}`);
  return response.data;
};

// Resend Verification Email
export const resendVerification = async (email) => {
  const response = await API.post("/auth/resend-verification", { email });
  return response.data;
};

// Social Login (Google / Apple)
export const socialLoginUser = async (socialData) => {
  const response = await API.post("/auth/social-login", socialData);
  return response.data;
};