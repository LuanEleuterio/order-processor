import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type UserDocument = User & Document;

export interface UserProps {
  id: number;
  name: string;
}

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  user_id: number;

  @Prop({ required: true })
  name: string;

  _id: Types.ObjectId;

  constructor(props: UserProps) {
    Object.assign(this, props);
  }

  public static create(data: UserProps) {
    return new User(data);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
