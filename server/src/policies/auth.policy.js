import passport from "passport";

const authPolicy = (req, res, next) => {
  passport.authenticate("jwt", (err, user) => {
    if (err || !user) {
      res.status(403).send({
        confirmation: false,
        message: "you do not have access to this resource"
      });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};

export default authPolicy;
