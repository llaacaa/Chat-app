import mongoose, { Document, Schema } from "mongoose";

export interface IRoom extends Document {
  name: string; // Name of the chat room
  members: mongoose.Types.ObjectId[]; // Users in the room
  messages: mongoose.Types.ObjectId[]; // Messages sent in the room
  isPrivate: boolean; // Whether the room is private or public
  createdAt: Date; // When the room was created
  isGroupChat: boolean;
}

const roomSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  isPrivate: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isGroupChat: {
    type: Boolean,
    default: false,
  },
});

const Room = mongoose.model<IRoom>("Room", roomSchema);

export default Room;
