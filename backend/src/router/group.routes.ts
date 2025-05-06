import express from "express";
import {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
} from "../controllers/group.controller";

const groupRoutes = express.Router();

groupRoutes.post("/", createGroup);
groupRoutes.get("/", getAllGroups);
groupRoutes.get("/:id", getGroupById);
groupRoutes.put("/:id", updateGroup);
groupRoutes.delete("/:id", deleteGroup);

export default groupRoutes;
