import {
  createDegree,
  deleteDegree,
  getAllDegrees,
  getDegreeById,
  updateDegree,
} from "../controllers/degree.controller";
import express from "express";

const degreeRoutes = express.Router();

degreeRoutes.get("/", getAllDegrees);
degreeRoutes.get("/:id", getDegreeById);
degreeRoutes.post("/", createDegree);
degreeRoutes.put("/:id", updateDegree);
degreeRoutes.delete("/:id", deleteDegree);

export default degreeRoutes;
