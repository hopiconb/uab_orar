import { Request, Response } from "express";
import { Degree } from "../models/degree.model";

export const createDegree = async (req: Request, res: Response) => {
  try {
    const degree = new Degree(req.body);
    await degree.save();
    res.status(201).json(degree);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
