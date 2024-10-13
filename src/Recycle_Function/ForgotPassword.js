import axios from "axios";

export const sendOTP = async (phoneNumber) => {
  try {
    const response = await axios.post("http://localhost:8000/api/users/forgot-password/", {
      phone_number: phoneNumber,
    });
    return { success: true, message: response.data.message };
  } catch (error) {
    return { success: false, message: error.response?.data?.error || "Error occurred." };
  }
};

export const verifyOTP = async (phoneNumber, otp, newPassword) => {
  try {
    const response = await axios.post("http://localhost:8000/api/users/reset-password/", {
      phone_number: phoneNumber,
      otp: otp,
      new_password: newPassword,
    });
    return { success: true, message: response.data.message };
  } catch (error) {
    return { success: false, message: error.response?.data?.error || "Error occurred." };
  }
};
