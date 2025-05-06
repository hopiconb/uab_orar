import express from "express";

import {
  getAllUsers,
  deleteUser,
  updateUser,
  getMyUserData,
  logoutUser,
} from "../controllers/user.controller";
import { isAuthenticated, isOwner } from "../middlewares";

const userRoutes = express.Router();

userRoutes.get("/", isAuthenticated, getAllUsers);
userRoutes.get("/me", isAuthenticated, getMyUserData);
userRoutes.get("/logout", isAuthenticated, logoutUser);
userRoutes.delete("/:id", isAuthenticated, isOwner, deleteUser);
userRoutes.patch("/:id", isAuthenticated, isOwner, updateUser);

export default userRoutes;
