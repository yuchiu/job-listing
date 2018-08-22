import {
  testController,
  authController,
  userController,
  browseController
} from "../controllers";
import { authPolicy } from "../utils";

const routes = app => {
  app.get("/test", testController.getTest);
  app.post("/auth/register", authPolicy.register, authController.register);
  app.post("/auth/login", authController.login);
  app.post("/user/followup", userController.followUp);
  app.get("/api/v1/browse-list", browseController.getBrowseList);
};

export default routes;
