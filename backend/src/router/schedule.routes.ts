import express from "express";
import {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
  getScheduleForGroup,
} from "../controllers/schedule.controller";

const scheduleRoutes = express.Router();

scheduleRoutes.post("/", createSchedule);
scheduleRoutes.get("/", getAllSchedules);
scheduleRoutes.get("/:id", getScheduleById);
scheduleRoutes.put("/:id", updateSchedule);
scheduleRoutes.delete("/:id", deleteSchedule);
scheduleRoutes.get("/group/:groupId", getScheduleForGroup);

export default scheduleRoutes;
