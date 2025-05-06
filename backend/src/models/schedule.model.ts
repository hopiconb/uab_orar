import { Schema, model, Document, Types } from "mongoose";

export interface ISchedule extends Document {
  disciplineId: Types.ObjectId;
  groupId: Types.ObjectId;
  room: { type: string; required: true };
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
}

const scheduleSchema = new Schema<ISchedule>({
  disciplineId: {
    type: Schema.Types.ObjectId,
    ref: "Discipline",
    required: true,
  },
  groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  room: { type: String, required: true },
  dayOfWeek: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Schedule = model<ISchedule>("Schedule", scheduleSchema);
