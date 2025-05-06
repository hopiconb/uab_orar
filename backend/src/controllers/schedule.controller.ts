import { Request, Response } from "express";
import { Schedule } from "../models/schedule.model";
import mongoose from "mongoose";

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

export const getScheduleByRoom = async (req: Request, res: Response) => {
  const { roomName } = req.params;

  const schedule = await Schedule.find({ room: roomName })
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

export const updateSchedule = async (req: Request, res: Response) => {
  const updated = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

export const deleteSchedule = async (req: Request, res: Response) => {
  await Schedule.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};

export const getScheduleForGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;

    const groupObjectId = new mongoose.Types.ObjectId(groupId);

    // pipeline agregare
    const result = await Schedule.aggregate([
      {
        $match: {
          groupId: groupObjectId,
        },
      },
      {
        $lookup: {
          from: "disciplines",
          localField: "disciplineId",
          foreignField: "_id",
          as: "disciplineDetails",
        },
      },
      {
        $lookup: {
          from: "groups",
          localField: "groupId",
          foreignField: "_id",
          as: "groupDetails",
        },
      },
      {
        $unwind: "$disciplineDetails",
      },
      {
        $unwind: "$groupDetails",
      },
      {
        $project: {
          _id: 1,
          name: "$groupDetails.name",
          discipline: "$disciplineDetails.name",
          professor: "$disciplineDetails.professor",
          room: 1,
          dayOfWeek: 1,
          startTime: 1,
          endTime: 1,
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
