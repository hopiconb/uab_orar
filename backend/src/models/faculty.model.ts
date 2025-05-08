import { Schema, model, Document, Types } from "mongoose";

export interface IFaculty extends Document {
  degreeId: Types.ObjectId;
  name: string;
}

const facultySchema = new Schema<IFaculty>({
  degreeId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Degree",
      required: true,
      select: false, // sa nu apare cand il cauti, nu il include
    },
  ],
  name: { type: String, required: true, unique: true }, // exemplu: "Informatica si Inginerie"
});

export const Faculty = model<IFaculty>("Faculty", facultySchema);
