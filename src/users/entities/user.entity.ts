import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

  constructor(props: User) {
    Object.assign(this, props);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
