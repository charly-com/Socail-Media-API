import mongoose, { Document, Model } from 'mongoose';


export interface IUser extends Document {
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
    avater: string; 
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avater: {
    type: String,
    required: false,
  }
});



export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
