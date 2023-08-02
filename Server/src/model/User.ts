import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  email: string;
  password: string ;
  avatar?: string;
  newMessages?: object;
  status?: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true,unique:true },
  password:{type:String, required:true},
  avatar: { type: String, required: false },
  newMessages: {
    type: Object,
    default: {}
  },
  status: {
    type: String,
    default: 'online'
  }
});

// 3. Create a Model.
const User = model<IUser>('User', userSchema);

export default User;