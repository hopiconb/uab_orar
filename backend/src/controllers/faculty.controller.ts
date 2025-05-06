import { Request, Response } from "express";
import { Faculty } from "../models/faculty.model";

export const createFaculty = async (req: Request, res: Response) => {
  try {
    const faculty = new Faculty(req.body);
    await faculty.save();
    res.status(201).json(faculty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllFaculties = async (_req: Request, res: Response) => {
  try {
    const faculties = await Faculty.find().populate("degreeId");
    res.json(faculties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFacultyById = async (req: Request, res: Response) => {
  try {
    const faculty = await Faculty.findById(req.params.id).populate("degreeId");
    if (!faculty) return res.status(404).json({ error: "Faculty not found" });
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateFaculty = async (req: Request, res: Response) => {
  try {
    const updated = await Faculty.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Faculty not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a faculty
export const deleteFaculty = async (req: Request, res: Response) => {
  try {
    const deleted = await Faculty.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Faculty not found" });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
