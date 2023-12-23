import { RequestHandler } from "express";
import InstaPost from "../model/Post";
import InstaUser from "../model/InstaUser";

export const createPost: RequestHandler = async (req, res) => {
  try {
    const { userId, files, content } = req.body;
    const post = await InstaPost.create({
      userId,
      files,
      content,
    });
    return res.status(201).json({ post, success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//get all the posts of the users that the logged in user is following
export const getPosts: RequestHandler = async (req, res) => {
  try {
    // const { loggedInUserId } = req.query;
    const { loggedInUserId } = req.params;
    const loggedInUser=await InstaUser.findOne({
        userId:loggedInUserId
    })
    const posts = await InstaPost.find({
       $or: [{userId: { $in: loggedInUser.following }},{userId:loggedInUserId}] 
    });

    return res.status(200).json({ success: true, posts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
