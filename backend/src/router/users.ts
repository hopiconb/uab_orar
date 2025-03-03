import express from "express";

import { getAllUsers, deleteUser, updateUser } from "../controllers/users";
import { isAuthenticated, isSuperAdmin } from "../middlewares";

export default (router: express.Router) => {
  router.delete("/users/:id", isAuthenticated, isSuperAdmin, deleteUser);
  router.patch("/users/:id", isAuthenticated, isSuperAdmin, updateUser);
};
