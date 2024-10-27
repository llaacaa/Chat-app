import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  friends: mongoose.Types.ObjectId[];
  createdAt: Date;
  lastOnline: Date;
  verified: boolean;
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastOnline: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false,
  }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
