import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String, default: '' },
  },
  { timestamps: true }
);

const userModel = mongoose.model('Users', UserSchema);

export default userModel;
