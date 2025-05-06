import { Request, Response } from "express";
import { Schedule } from "../models/schedule.model";
import mongoose from "mongoose";

// Create schedule with time conflict check
export const createSchedule = async (req: Request, res: Response) => {
  try {
    const { room, dayOfWeek, startTime, endTime } = req.body;

    const conflict = await Schedule.findOne({
      room,
      dayOfWeek,
      $or: [{ startTime: { $lt: endTime }, endTime: { $gt: startTime } }],
    });

    if (conflict) {
      return res
        .status(409)
        .json({ error: "Schedule conflict for room and time." });
    }

    const schedule = new Schedule(req.body);
    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read all schedules
export const getAllSchedules = async (req: Request, res: Response) => {
  const schedules = await Schedule.find()
    .populate({
      path: "disciplineId",
    })
    .populate({
      path: "groupId",
      populate: {
        path: "degreeId",
        populate: {
          path: "facultyId",
        },
      },
    })
    .populate({
      path: "createdBy",
    });

  res.json(schedules);
};

// Read single schedule
export const getScheduleById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const schedule = await Schedule.findById(id)
    .populate("disciplineId")
    .populate({
      path: "groupId",
      populate: {
        path: "degreeId",
        populate: {
          path: "facultyId",
        },
      },
    })
    .populate("createdBy");

  if (!schedule) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json(schedule);
};

// Update schedule
export const updateSchedule = async (req: Request, res: Response) => {
  const updated = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

// Delete schedule
export const deleteSchedule = async (req: Request, res: Response) => {
  await Schedule.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};

// Aggregate Pipeline for Groups
export const getScheduleForGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params; // Extract groupId from URL parameters

    // Ensure the groupId is converted to an ObjectId (if it's not already)
    const groupObjectId = new mongoose.Types.ObjectId(groupId);

    // Aggregation pipeline
    const result = await Schedule.aggregate([
      {
        $match: {
          groupId: groupObjectId, // Use the ObjectId for the groupId
        },
      },
      {
        $lookup: {
          from: "disciplines", // Lookup disciplines from the disciplines collection
          localField: "disciplineId",
          foreignField: "_id",
          as: "disciplineDetails",
        },
      },
      {
        $unwind: "$disciplineDetails", // Unwind the disciplineDetails array
      },
      {
        $project: {
          _id: 0, // Exclude _id from the output
          discipline: "$disciplineDetails.name", // Show discipline name
          professor: "$disciplineDetails.professor", // Show professor name
          room: 1, // Show room
          dayOfWeek: 1, // Show day of week
          startTime: 1, // Show start time
          endTime: 1, // Show end time
        },
      },
    ]);

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No schedule found for the given groupId" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in aggregation:", error);
    res.status(500).json({ message: "Server error" });
  }
};
