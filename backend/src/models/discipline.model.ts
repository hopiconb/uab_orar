import { Schema, model, Document } from "mongoose";

export interface IDiscipline extends Document {
  name: string;
  code?: string;
  professor: string;
}

const disciplineSchema = new Schema<IDiscipline>({
  name: { type: String, required: true },
  code: String,
  professor: String,
});

export const Discipline = model<IDiscipline>("Discipline", disciplineSchema);
