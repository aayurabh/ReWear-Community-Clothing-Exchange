import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Register user
export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username: formData.username, // changed from formData.name to formData.username
      email: formData.email,
      password: formData.password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || { message: "Registration failed" };
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || { message: "Login failed" };
  }
};
