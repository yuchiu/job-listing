const getRedirectPath = (role, avatar) => {
  //   user.role / boss / genius;
  //   user.avatar / bossinfo / geniusinfo;
  let path = "";
  if (role === "boss" || role === "genius") {
    path = `/${role}`;
    if (avatar) {
      path += "info";
    }
  }
  return path;
};

export default getRedirectPath;
