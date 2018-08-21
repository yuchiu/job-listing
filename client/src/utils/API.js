import axios from "axios";

const URL = "http://localhost:3200";

const API = {
  registerUser: async credential => {
    const { username, email, password, role } = credential;
    const payload = await axios.post(`${URL}/auth/register`, {
      username,
      email,
      password,
      role
    });
    return payload.data;
  },

  loginUser: async credential => {
    const { email, password } = credential;
    const payload = await axios.post(`${URL}/auth/login`, {
      email,
      password
    });
    return payload.data;
  },
  followupUser: async (credentialFollowUp, user) => {
    const { title, company, salary, desc, avatar } = credentialFollowUp;
    const { id } = user;
    const payload = await axios.post(`${URL}/user/followup`, {
      id,
      title,
      company,
      salary,
      desc,
      avatar
    });
    return payload.data;
  }
};

export default API;
