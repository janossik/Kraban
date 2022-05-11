import userController from "../controllers/user";
import { Router } from "express";
import { catchAsync } from "../middlewares/errors";

export default () => {
  const router = Router();

  // find one user by id
  router.get("/:id", catchAsync(userController.getOne));

  // find all users by params
  router.get("/", catchAsync(userController.getAll));

  // create user
  router.post("/", catchAsync(userController.create));

  // update user
  router.put("/:id", catchAsync(userController.update));

  // delete user
  router.delete("/:id", catchAsync(userController.remove));

  return router;
};
