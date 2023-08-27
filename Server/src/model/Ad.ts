
import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IAd {
    productName: string;
    description: string;
    basePrice: number;
    currentPrice: number;
    duration: number;
    timer: number;
    soldAt: Date;
    image:string[];
    catergory: string;
    auctionStarted: boolean;
    auctionEnded: boolean;
    sold: boolean;
    owner: object;
    purchasedBy: object;
    currentBidder: object;
    bids: Array<object>;
    room: object;
}
// 2. Create a Schema corresponding to the document interface.
const adSchema = new Schema<IAd>(
    {
        productName: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        basePrice: {
          type: Number,
          required: true,
        },
        currentPrice: {
          type: Number,
          required: true,
        },
        duration: {
          type: Number,
          default: 300,
        },
        timer: {
          type: Number,
          default: 300,
        },
        soldAt: {
          type: Date,
        },
        image: {
            type: [String], // Use an array of strings
        },
        catergory: {
          type: String,
        },
        auctionStarted: {
          type: Boolean,
          default: false,
        },
        auctionEnded: {
          type: Boolean,
          default: false,
        },
        sold: {
          type: Boolean,
          default: false,
        },
        owner: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
        purchasedBy: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
        currentBidder: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
        bids: [
          {
            user: {
              type: Schema.Types.ObjectId,
              ref: 'user',
              required: true,
            },
            amount: {
              type: Schema.Types.ObjectId,
              required: true,
            },
            time: {
              type: Date,
              default: Date.now,
            },
          },
        ],
        room: {
          type: Schema.Types.ObjectId,
          ref: 'room',
        },
      },
      { timestamps: true }
);
//minimize option is used within a schema to control whether empty objects (objects with no properties) should be saved in the MongoDB documents or not. When minimize is set to false, Mongoose will store empty objects in the documents, while setting it to true (which is the default) will remove empty objects when saving.

// 3. Create a Model.
const Ad = model<IAd>("Ad", adSchema);

export default Ad;