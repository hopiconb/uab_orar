import express from "express";
import groupRoutes from "./group.routes";
import disciplineRoutes from "./discipline.routes";
import scheduleRoutes from "./schedule.routes";
import facultyRoutes from "./faculty.routes";
import usersRoutes from "./user.routes";
import authRoute from "./authentication.routes";
import degreeRoutes from "./degree.routes";

const router = express.Router();

router.use("/groups", groupRoutes);
router.use("/disciplines", disciplineRoutes);
router.use("/schedules", scheduleRoutes);
router.use("/faculties", facultyRoutes);
router.use("/users", usersRoutes);
router.use("/auth", authRoute);
router.use("/degrees", degreeRoutes);

export default router;
