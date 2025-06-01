import mongoose, { Schema, Document } from "mongoose";

export interface Itask extends Document {
  task: string;
  description: string;
}

const taskSchema: Schema = new Schema({
  task: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.models.Task ||
  mongoose.model<Itask>("Task", taskSchema, "all_tasks");
