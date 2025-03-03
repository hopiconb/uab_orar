import express from "express";

import { login, register } from "../controllers/authentication";
import { isAuthenticated, isSuperAdmin } from "../middlewares";

export default (router: express.Router) => {
  router.post("/register", isAuthenticated, isSuperAdmin, register);
  router.post("/login", login);
};
