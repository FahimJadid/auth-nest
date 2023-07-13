import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  async comparePassword(candidatePassword: string): Promise<boolean> {
    const isPasswordValid = await bcrypt.compare(
      candidatePassword,
      this.password,
    );
    return isPasswordValid;
  }
}
export type UserDocument = User & Document;
export const UserModel = SchemaFactory.createForClass(User);
