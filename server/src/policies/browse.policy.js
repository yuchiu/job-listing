import passport from "passport";

const browsePolicy = (req, res, next) => {
  passport.authenticate("jwt", (err, user) => {
    if (err || !user) {
      req.user = null;
      next();
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};

export default browsePolicy;
