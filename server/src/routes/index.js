import { testController } from "../controllers";

const routes = app => {
  app.get("/test", testController.getTest);
};

export default routes;
