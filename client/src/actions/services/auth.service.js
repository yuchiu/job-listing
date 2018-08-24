import API from "./API";

const authService = {
  registerUser: async credentials => {
    const payload = await API().post(`/auth/register`, credentials);
    return payload.data;
  },

  loginUser: async credentials => {
    const payload = await API().post(`/auth/login`, credentials);
    return payload.data;
  },
  editProfileRequest: async credentials => {
    const payload = await API().post(`/auth/update-profile`, credentials);
    return payload.data;
  },
  followupUser: async (followUpCredentials, userId) => {
    const payload = await API().post(`/user/followup`, followUpCredentials);
    return payload.data;
  }
};

export default authService;
