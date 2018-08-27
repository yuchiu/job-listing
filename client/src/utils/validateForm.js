import Validator from "validator";

export default {
  signIn: data => {
    const clientErrors = {};
    if (!data.email) {
      clientErrors.email = "Can't be blank";
    } else if (!Validator.isEmail(data.email)) {
      clientErrors.email = "Invalid email";
    }
    if (!data.password) {
      clientErrors.password = "Can't be blank";
    } else if (data.password.length < 4 || data.password.length > 50) {
      clientErrors.password = "Length of user name have to be between 4 to 50";
    }
    return clientErrors;
  },
  signUp: data => {
    const clientErrors = {};
    if (!data.username) {
      clientErrors.username = "Can't be blank";
    } else if (data.username.length < 3 || data.username.length > 30) {
      clientErrors.username = "Length of user name have to be between 3 to 30";
    }
    if (!data.password) {
      clientErrors.password = "Can't be blank";
    } else if (data.password.length < 4 || data.password.length > 50) {
      clientErrors.password = "Length of password have to be between 4 to 50";
    }
    if (!data.email) {
      clientErrors.email = "Can't be blank";
    } else if (!Validator.isEmail(data.email)) {
      clientErrors.email = "Invalid email";
    }
    return clientErrors;
  },
  bossFollowUp: data => {
    const clientErrors = {};
    if (!data.avatar) {
      clientErrors.avatar = "Can't be blank";
    }
    if (!data.title) {
      clientErrors.title = "Can't be blank";
    } else if (data.title.length < 1 || data.title.length > 50) {
      clientErrors.title = "Length of title can not be more than 50 characters";
    }
    if (!data.desc) {
      clientErrors.desc = "Can't be blank";
    } else if (data.desc.length < 1 || data.desc.length > 100) {
      clientErrors.desc =
        "Length of description can not be more than 100 characers";
    }
    if (!data.salary) {
      clientErrors.salary = "Can't be blank";
    } else if (data.salary.length < 1 || data.salary.length > 50) {
      clientErrors.salary =
        "Length of salary can not be more than 50 characers";
    }
    return clientErrors;
  },
  geniusFollowUp: data => {
    const clientErrors = {};
    if (!data.avatar) {
      clientErrors.avatar = "Can't be blank";
    }
    if (!data.title) {
      clientErrors.title = "Can't be blank";
    } else if (data.title.length < 1 || data.title.length > 50) {
      clientErrors.title = "Length of title can not be more than 50 characters";
    }
    if (!data.desc) {
      clientErrors.desc = "Can't be blank";
    } else if (data.desc.length < 1 || data.desc.length > 100) {
      clientErrors.desc =
        "Length of description can not be more than 100 characers";
    }
    return clientErrors;
  },
  editProfile: data => {
    const clientErrors = {};
    if (!data.password) {
      clientErrors.password = "Can't be blank";
    } else if (data.password.length < 4 || data.password.length > 50) {
      clientErrors.password = "Length of password have to be between 4 to 50";
    }
    if (!data.newPassword) {
      clientErrors.newPassword = "Can't be blank";
    } else if (data.newPassword.length < 4 || data.newPassword.length > 50) {
      clientErrors.newPassword =
        "Length of password have to be between 4 to 50";
    }
    return clientErrors;
  }
};
