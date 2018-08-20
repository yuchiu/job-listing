import { testController, authController } from "../controllers";
import { authPolicy } from "../utils";

const routes = app => {
  app.get("/test", testController.getTest);
  app.post("/auth/", authController.auth);
  app.post("/auth/register", authPolicy.register, authController.register);
  app.post("/auth/login", authController.login);
};

export default routes;
