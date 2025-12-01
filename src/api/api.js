
import axios from "axios";
const url = "https://fourhelp-uhvs.onrender.com";

//ROTA DE LOGIN E REGISTRO

export async function registerUser(userData) {
    const response = await axios.post(`${url}/auth/register`, userData);
    return response.data;
}

export async function loginUser(credentials) {
    const response = await axios.post(`${url}/auth/login`, credentials);
    return response.data;
}

// ROTA DE QUIZ

export async function fetchQuizQuestions() {
    const response = await axios.get(`${url}/api/question`);
    return response.data;
}   

export async function submitQuizAnswers() {
    const response = await axios.post(`${url}/rank/acerto`);
    return response.data;
}

// ROTA DE RANKING

export async function rankTopThree(token) {
    const response = await axios.get(`${url}/rank/ranktop`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}

//*export async function rankTopSchool(token) {
//       const response = await axios.get(`${url}/rank/rankbyescola`, {
//            headers: { Authorization: `Bearer ${token}` }
//        });
//        return response.data;   
//}

//ROTA QUIZ

export async function fetchQuizByCategory(token) {
    const response = await axios.get(`${url}/api/question`,{
        headers: { Authorization: `Bearer ${token}` }
    }

    );
    return response.data;
}

export async function submitAnswers( user_id, token) {
    const response = await axios.post(`${url}/rank/acerto`, {user_id: user_id}, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}  