import {
  testController,
  authController,
  userController,
  browseController,
  messageController
} from "../controllers";
import { registerPolicy, authPolicy } from "../utils";

const routes = app => {
  app.get("/test", testController.getTest);

  app.post("/auth/register", registerPolicy.register, authController.register);
  app.post("/auth/login", authController.login);
  app.post("/auth/update-profile", authController.updateProfile);

  app.post("/user/followup", userController.followUp);

  app.get("/message/getmsglist", authPolicy, messageController.getMsgList);

  app.get("/api/v1/browse-list", browseController.getBrowseList);
};

export default routes;
