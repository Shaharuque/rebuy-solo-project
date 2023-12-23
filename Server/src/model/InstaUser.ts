import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  userId:string,
  userEmail:string,
  userPassword:string,
  userPhone:string, 
  userName:string,
  followers:any,  //followers:Array<object>,
  following:any,  //following:Array<object>,
  avatar:string,
}
// 2. Create a Schema corresponding to the document interface.
const instaUserSchema = new Schema<IUser>(
  {
    userId:{
      type:String,
    },
    userEmail:{
      type:String,
    },
    userPassword: {
      type:String,
    },
    userName: {
      type: String,
    },
    followers: [
      {
        type: String,
      },
    ],
    following: [
      {
        type: String,
      },
    // following: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    ],
    avatar: {
      type: String,
    }
    
  },
  { minimize: false,timestamps: true }
);
//minimize option is used within a schema to control whether empty objects (objects with no properties) should be saved in the MongoDB documents or not. When minimize is set to false, Mongoose will store empty objects in the documents, while setting it to true (which is the default) will remove empty objects when saving.

// 3. Create a Model.
const InstaUser = model<IUser>("InstUser", instaUserSchema);

export default InstaUser;
