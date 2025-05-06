import express from "express";
import {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
  getScheduleForGroup,
  getScheduleByRoom,
} from "../controllers/schedule.controller";

const scheduleRoutes = express.Router();

scheduleRoutes.get("/", getAllSchedules);
scheduleRoutes.get("/group/:groupId", getScheduleForGroup);
scheduleRoutes.get("/room/:roomName", getScheduleByRoom);
scheduleRoutes.get("/:id", getScheduleById);
scheduleRoutes.post("/", createSchedule);
scheduleRoutes.put("/:id", updateSchedule);
scheduleRoutes.delete("/:id", deleteSchedule);

export default scheduleRoutes;
