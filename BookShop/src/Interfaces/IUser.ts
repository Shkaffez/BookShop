import { Types } from 'mongoose';

export interface CreateUserDto {
  id: Types.ObjectId;
  username: string;
  password: string;
  registrationDate: Date;
}
