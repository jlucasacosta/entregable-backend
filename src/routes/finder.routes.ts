import { Router } from "express";
import {
  getAllRepositories,
  getStarredRepos,
  makeStarredRepo,
  deleteStarredRepo,
  getProfile,
  updateProfile
} from "../controllers/finder.controller";

const FinderRouter = Router();

FinderRouter.get("", (req, res) => {
  res.send("Hola mundo");
});

FinderRouter.get("/search/:name", getAllRepositories);

FinderRouter.get("/starred", getStarredRepos);

FinderRouter.post("/starred/:repo", makeStarredRepo);

FinderRouter.delete("/starred/:repo", deleteStarredRepo);

// se agrega nueva logica en frontend posteriormente
FinderRouter.get('/profile', getProfile)

FinderRouter.put("/profile/:name", updateProfile)

export default FinderRouter;
