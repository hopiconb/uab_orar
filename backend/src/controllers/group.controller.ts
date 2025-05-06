import { Request, Response } from "express";
import { Group } from "../models/group.model";
import mongoose from "mongoose";

export const createGroup = async (req: Request, res: Response) => {
  const group = new Group(req.body);
  await group.save();
  res.status(201).json(group);
};

export const getAllGroups = async (req: Request, res: Response) => {
  const groups = await Group.find().populate("degreeId");
  res.json(groups);
};

export const getAllGroupsFromYear = async (req: Request, res: Response) => {
  try {
    const { degreeId, year } = req.params;

    const degreeObjectId = new mongoose.Types.ObjectId(degreeId);

    const result = await Group.aggregate([
      {
        $match: {
          degreeId: degreeObjectId,
          year: parseInt(year),
        },
      },
      {
        $lookup: {
          from: "degrees",
          localField: "degreeId",
          foreignField: "_id",
          as: "degreeDetails",
        },
      },
      {
        $unwind: "$degreeDetails",
      },
      {
        $project: {
          _id: 1,
          degreename: "$degreeDetails.name",
          name: 1,
        },
      },
    ]);

    res.status(200).json(result); // avem nevoie doar de numarul de grupe existente, de aceea return length
  } catch (error) {
    console.error("Error in aggregation:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getGroupById = async (req: Request, res: Response) => {
  const group = await Group.findById(req.params.id).populate("degreeId");
  if (!group) return res.status(404).json({ error: "Not found" });
  res.json(group);
};

export const updateGroup = async (req: Request, res: Response) => {
  const updated = await Group.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

export const deleteGroup = async (req: Request, res: Response) => {
  await Group.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};
