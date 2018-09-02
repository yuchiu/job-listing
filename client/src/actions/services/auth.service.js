import API from "./API";

const authService = {
  autoLogin: async () => {
    const response = await API().get(`/auth/auto-login`);
    return response;
  },
  registerUser: async credentials => {
    const response = await API().post(`/auth/register`, credentials);
    return response;
  },

  loginUser: async credentials => {
    const response = await API().post(`/auth/login`, credentials);
    return response;
  },
  editProfileRequest: async credentials => {
    const response = await API().post(`/auth/update-profile`, credentials);
    return response;
  },
  followupUser: async followUpCredentials => {
    const response = await API().post(`/user/followup`, followUpCredentials);
    return response;
  },
  getUserInfo: async toUserId => {
    const response = await API().get(`/user/info/${toUserId}`);
    return response;
  }
};

export default authService;
