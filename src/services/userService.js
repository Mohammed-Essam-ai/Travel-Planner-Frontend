import api from "./api";
import axios from "axios";

export async function login(username, password) {
  try {
    localStorage.setItem("username", username);
    const response = await api.post("users/token/", {
      username: username,
      password: password,
    });

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    return { access: response.data.access, refresh: response.data.refresh };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function get_access_token() {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/users/token/refresh/",
      {
        refresh: localStorage.getItem("refresh"),
      },
    );
    const new_access = response.data.access;
    localStorage.setItem("access", new_access);
    return new_access;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function register(user_data) {
  try {
    await api.post("users/register", { ...user_data });
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
