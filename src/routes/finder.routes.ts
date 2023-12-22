import { Router } from "express";
import {
  getAllRepositories,
  getStarredRepos,
  makeStarredRepo,
  deleteStarredRepo,
  getProfile,
  updateProfile,
  getFeaturedRepositories,
} from "../controllers/finder.controller";

const FinderRouter = Router();

FinderRouter.get("/", getFeaturedRepositories);

FinderRouter.put("/updateProfile", updateProfile);

FinderRouter.get("/search/:repo", getAllRepositories);

FinderRouter.get("/starred", getStarredRepos);

FinderRouter.post("/starred/:repo", makeStarredRepo);

FinderRouter.delete("/starred/:repo", deleteStarredRepo);

export default FinderRouter;
