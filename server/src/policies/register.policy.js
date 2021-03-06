import Joi from "joi";

const authPolicy = {
  register: (req, res, next) => {
    const schema = {
      username: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{4,32}$")),
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{4,32}$")),
      role: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{2,32}$"))
    };
    const { error, value } = Joi.validate(req.body, schema);
    if (error) {
      switch (error.details[0].context.key) {
        case "username":
          res.send({
            confirmation: false,
            error: "username is not valid"
          });
          break;
        case "email":
          res.send({
            confirmation: false,
            error: "email address is not valid"
          });
          break;
        case "password":
          res.send({
            confirmation: false,
            error: `the password provided failed to match the following rules:
                    <br>
                    1. It must contain ONLY the following characters: lower case, upper case, numerics
                    <br>
                    2. It must be at least 4 characters and not greater than 32 characters.
                    `
          });
          break;
        case "role":
          res.send({
            confirmation: false,
            error: "role is not valid"
          });
          break;
        default:
          res.send({
            confirmation: false,
            error: "invalid registration infomation"
          });
      }
    } else {
      next(); // call next if no errors in validation
    }
  }
};
export default authPolicy;
