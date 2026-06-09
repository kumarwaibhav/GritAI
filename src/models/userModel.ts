import mongoose, { Schema, Document } from "mongoose";

interface ILecture {
  topic: string;
  transcript: string | null;
  createdAt: Date;
  notes: string | null;
  qwiz: string | null;
  flashcards: string | null;
  cheatSheet: string | null;
}

export interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber: string | null;
  password: string;
  role: "user" | "turf" | "admin";
  dateOfBirth: string | null;
  gender: "male" | "female" | "others" | null;
  isVerified: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
  lectures: ILecture[];
}

const LectureSchema = new Schema<ILecture>({
  topic: { type: String, required: [true, "Please provide a lecture topic"] },
  transcript: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  notes: { type: String, default: null },
  qwiz: { type: String, default: null },
  flashcards: { type: String, default: null },
  cheatSheet: { type: String, default: null },
});

const UserSchema = new Schema<IUser>({
  name: { type: String, required: [true, "Please provide name"] },
  email: { type: String, required: [true, "Please provide email"], unique: true },
  phoneNumber: { type: String, required: false, default: null },
  password: { type: String, required: [true, "Please provide password"] },
  role: { type: String, enum: ["user", "turf", "admin"], default: "user" },
  dateOfBirth: { type: String, default: null },
  gender: { type: String, enum: ["male", "female", "others"], default: null },
  isVerified: { type: Boolean, default: false },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  lectures: [LectureSchema],
});

const User = mongoose.models.users || mongoose.model<IUser>("users", UserSchema);

export default User;
