import { Request, Response } from "express";
import { Degree } from "../models/degree.model";
import mongoose from "mongoose";
import { Faculty } from "../models/faculty.model";

export const createDegree = async (req: Request, res: Response) => {
  try {
    const { name, duration, facultyId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(facultyId)) {
      return res.status(400).json({ error: "Invalid facultyId" });
    }

    const newDegree = new Degree({
      name,
      duration,
      facultyId: new mongoose.Types.ObjectId(String(facultyId)),
    });

    const savedDegree = await newDegree.save();

    await Faculty.findByIdAndUpdate(facultyId, {
      $push: { degreeId: savedDegree._id },
    });

    res.status(201).json(savedDegree);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllDegrees = async (_req: Request, res: Response) => {
  try {
    const degree = await Degree.find();
    res.json(degree);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDegreeById = async (req: Request, res: Response) => {
  try {
    const degree = await Degree.findById(req.params.id);
    if (!degree) return res.status(404).json({ error: "Degree not found" });
    res.json(degree);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDegree = async (req: Request, res: Response) => {
  try {
    const updated = await Degree.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Degree not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteDegree = async (req: Request, res: Response) => {
  try {
    const deleted = await Degree.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Degree not found" });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
