import API from "./API";

const authService = {
  validateJWT: async token => {
    const payload = await API().get(`/auth/verifyuser`, token);
    return payload.data;
  },
  registerUser: async credentials => {
    const payload = await API().post(`/auth/register`, credentials);
    return payload.data;
  },

  loginUser: async credentials => {
    const payload = await API().post(`/auth/login`, credentials);
    return payload.data;
  },
  followupUser: async (followUpCredentials, userId) => {
    const payload = await API().post(`/user/followup`, followUpCredentials);
    return payload.data;
  }
};

export default authService;
