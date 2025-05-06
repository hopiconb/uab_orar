import { Schema, model, Document, Types } from "mongoose";

export interface IDegree extends Document {
  facultyId: Types.ObjectId;
  name: string;
  duration: number;
}

const degreeSchema = new Schema<IDegree>({
  facultyId: [{ type: Schema.Types.ObjectId, ref: "Faculty", required: true }],
  name: { type: String, required: true },
  duration: { type: Number, required: true },
});

export const Degree = model<IDegree>("Degree", degreeSchema);
