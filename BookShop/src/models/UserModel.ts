import { Schema, model, Types } from 'mongoose';

const userSchema = new Schema({
  id: {
    type: Types.ObjectId,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: new Date(),
  },
});

export = model('User', userSchema);
