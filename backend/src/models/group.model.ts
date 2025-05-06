import { Schema, model, Document, Types } from "mongoose";

export interface IGroup extends Document {
  year: number;
  name: string;
  degreeId: Types.ObjectId;
}

const groupSchema = new Schema<IGroup>({
  year: { type: Number, required: true },
  name: { type: String, required: true },
  degreeId: { type: Schema.Types.ObjectId, ref: "Degree", required: true },
});

export const Group = model<IGroup>("Group", groupSchema);
