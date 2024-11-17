import express from "express";
import * as ProjectController from "../controllers/ProjectController";

import authentication from "./authentication";

const router = express.Router();

// router.get("/projects", ProjectController.getAllProjects);
// router.post("/project", ProjectController.createProject);
// router.get("/project/:text", ProjectController.getProject);
// router.put("/project/:text", ProjectController.updateProject);
// router.delete("/project/:text", ProjectController.deleteProject);

export default (): express.Router => {
  authentication(router);

  return router;
};
