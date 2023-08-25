
import mongoose, { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IRight {
    staff_id:object,
    right:string,
}

// 2. Create a Schema corresponding to the document interface.
//RighModel ar sathey StaffModel ar relation=>staff_id ta StaffModel ar _id
const rightSchema = new Schema<IRight>(
  {
    staff_id: { type:Schema.Types.ObjectId,ref:"Staff" },  //relation between staff and right model
    right: { type: String },
  },
  { timestamps: true }
);
//minimize option is used within a schema to control whether empty objects (objects with no properties) should be saved in the MongoDB documents or not. When minimize is set to false, Mongoose will store empty objects in the documents, while setting it to true (which is the default) will remove empty objects when saving.

// 3. Create a Model.
const RightModel = model<IRight>("Right", rightSchema);

export default RightModel;