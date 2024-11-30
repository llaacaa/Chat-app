import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  sender: mongoose.Types.ObjectId; // Reference to the User who sent the message
  content: string; // The actual text of the message
  room: mongoose.Types.ObjectId; // Reference to the Room where the message was sent
  timestamp: Date; // When the message was sent
}

const messageSchema: Schema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model<IMessage>('Message', messageSchema);

export default Message;
