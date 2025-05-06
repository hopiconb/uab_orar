import { Request, Response } from "express";
import { Discipline } from "../models/discipline.model";

// Create discipline
export const createDiscipline = async (req: Request, res: Response) => {
  const discipline = new Discipline(req.body);
  await discipline.save();
  res.status(201).json(discipline);
};

// Read all disciplines
export const getAllDisciplines = async (req: Request, res: Response) => {
  const disciplines = await Discipline.find();
  res.json(disciplines);
};

// Read one discipline
export const getDisciplineById = async (req: Request, res: Response) => {
  const discipline = await Discipline.findById(req.params.id);
  if (!discipline) return res.status(404).json({ error: "Not found" });
  res.json(discipline);
};

// Update discipline
export const updateDiscipline = async (req: Request, res: Response) => {
  const updated = await Discipline.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

// Delete discipline
export const deleteDiscipline = async (req: Request, res: Response) => {
  await Discipline.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};
