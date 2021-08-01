import { Schema, model } from 'mongoose';

interface UserInterface {
  _id?: string;
  login: string;
  password: string;
}

const UserSchema = new Schema<UserInterface>(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { autoCreate: true },
);

const UserModel = model('users', UserSchema);

export { UserInterface, UserSchema, UserModel };
