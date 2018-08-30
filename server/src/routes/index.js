import {
  testController,
  authController,
  userController,
  browseController,
  messageController
} from "../controllers";
import { registerPolicy, authPolicy, browsePolicy } from "../policies";

const routes = app => {
  app.get("/test", testController.getTest);

  app.get("/auth/auto-login", authPolicy, authController.autoLogin);
  app.post("/auth/register", registerPolicy.register, authController.register);
  app.post("/auth/login", authController.login);
  app.post("/auth/update-profile", authController.updateProfile);

  app.get("/user/info/:userId", userController.getUserInfo);
  app.post("/user/followup", userController.followUp);

  app.get("/message/getmsglist", authPolicy, messageController.getMsgList);

  app.get("/api/v1/browse-list", browsePolicy, browseController.getBrowseList);
};

export default routes;
