import axios from "axios";

const url = "http://localhost:8080";

export async function registerUser(userData) {
    const response = await axios.post(`${url}/auth/register`, userData);
    return response.data;
}

export async function loginUser(credentials) {
    const response = await axios.post(`${url}/auth/login`, credentials);
    return response.data;
}

