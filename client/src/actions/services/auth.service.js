import API from "./API";

const authService = {
  autoLogin: async () => {
    const payload = await API().get(`/auth/auto-login`);
    return payload;
  },
  registerUser: async credentials => {
    const payload = await API().post(`/auth/register`, credentials);
    return payload;
  },

  loginUser: async credentials => {
    const payload = await API().post(`/auth/login`, credentials);
    return payload;
  },
  editProfileRequest: async credentials => {
    const payload = await API().post(`/auth/update-profile`, credentials);
    return payload;
  },
  followupUser: async followUpCredentials => {
    const payload = await API().post(`/user/followup`, followUpCredentials);
    return payload;
  },
  getUserInfo: async toUserId => {
    const payload = await API().get(`/user/info/${toUserId}`);
    return payload;
  }
};

export default authService;
