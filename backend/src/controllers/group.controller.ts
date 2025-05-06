import { Request, Response } from "express";
import { Group } from "../models/group.model";

// Create group
export const createGroup = async (req: Request, res: Response) => {
  const group = new Group(req.body);
  await group.save();
  res.status(201).json(group);
};

// Read all groups
export const getAllGroups = async (req: Request, res: Response) => {
  const groups = await Group.find().populate("degreeId");
  res.json(groups);
};

// Read one group
export const getGroupById = async (req: Request, res: Response) => {
  const group = await Group.findById(req.params.id).populate("degreeId");
  if (!group) return res.status(404).json({ error: "Not found" });
  res.json(group);
};

// Update group
export const updateGroup = async (req: Request, res: Response) => {
  const updated = await Group.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

// Delete group
export const deleteGroup = async (req: Request, res: Response) => {
  await Group.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};
