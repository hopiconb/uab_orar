import express from "express";

import {
  getAllUsers,
  deleteUser,
  updateUser,
  getTestUser,
  getMyUserData,
  logoutUser,
} from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/users/me", isAuthenticated, getMyUserData);
  router.get("/users/logout", isAuthenticated, logoutUser);
  router.get("/users", isAuthenticated, getAllUsers);
  router.get("/usertest", getTestUser);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  router.patch("/users/:id", isAuthenticated, isOwner, updateUser);
};
