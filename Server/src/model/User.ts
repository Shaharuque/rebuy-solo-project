import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  email: string;
  password: string ;
  avatar?: string;
  newMessages?: object;
  status?: string;
  groupAdmin:boolean;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true,unique:true },
  password:{type:String, required:true},
  avatar: { type: String, required: false },
  newMessages: {
    type: Object,
  },
  status: {
    type: String,
    default: 'online'
  },
  groupAdmin:{
    type:Boolean,
    default:false
  }
},{minimize:false,timestamps:true});
//minimize option is used within a schema to control whether empty objects (objects with no properties) should be saved in the MongoDB documents or not. When minimize is set to false, Mongoose will store empty objects in the documents, while setting it to true (which is the default) will remove empty objects when saving.

// 3. Create a Model.
const User = model<IUser>('User', userSchema);

export default User;