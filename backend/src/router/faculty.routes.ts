import express from "express";
import {
  createFaculty,
  deleteFaculty,
  getAllFaculties,
  getFacultyById,
  updateFaculty,
} from "../controllers/faculty.controller";

const facultyRoutes = express.Router();

facultyRoutes.get("/", getAllFaculties);
facultyRoutes.get("/:id", getFacultyById);
facultyRoutes.post("/", createFaculty);
facultyRoutes.put("/:id", updateFaculty);
facultyRoutes.delete("/:id", deleteFaculty);

export default facultyRoutes;
