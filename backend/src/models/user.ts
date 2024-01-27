import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, select: false }, // select: false , they wont be retuned back in the server or json
  password: { type: String, required: true, select: false },
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>('User', userSchema);