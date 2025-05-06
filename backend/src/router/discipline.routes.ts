import express from "express";
import {
  createDiscipline,
  getAllDisciplines,
  getDisciplineById,
  updateDiscipline,
  deleteDiscipline,
} from "../controllers/discipline.controller";

const disciplineRoutes = express.Router();

disciplineRoutes.post("/", createDiscipline);
disciplineRoutes.get("/", getAllDisciplines);
disciplineRoutes.get("/:id", getDisciplineById);
disciplineRoutes.put("/:id", updateDiscipline);
disciplineRoutes.delete("/:id", deleteDiscipline);

export default disciplineRoutes;
