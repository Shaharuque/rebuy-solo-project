import { RequestHandler } from "express";
import InstaUser from "../model/InstaUser";

export const createInstaUser: RequestHandler = async (req, res) => {
  try {
    const {
      userId,
      userEmail,
      userPassword,
      userName,
      followers,
      following,
      avatar,
    } = req.body;
    const instaUser = await InstaUser.create({
      userId,
      userEmail,
      userPassword,
      userName,
      followers,
      following,
      avatar,
    });
    return res.status(201).json({ instaUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//get follow suggestions for a user who is logged in and give suggestion if he is not yet following the user
export const getSuggestions: RequestHandler = async (req, res) => {
  try {
    const  {loggedInUser}  = req.query;

    //get all the users excluding the logged in user
    const appUsers = await InstaUser.find({
      userId: { $ne: loggedInUser },
    });

    // now check if the logged in user present in the followers list of the users
    //if not present then give the user as suggestion
    const suggestions = appUsers.filter((user) => {
      return !user.followers.includes(loggedInUser);
    });

    return res.status(200).json({success:true,suggestions});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//make a user follow another user
export const followUser: RequestHandler = async (req, res) => {
  try {
    const { loggedInUser, userToFollow } = req.body;
    // je follow kortey gesey arek user k tar following a shei user add hobey
    //first check if the user is already following the user
    const user = await InstaUser.findOneAndUpdate(
      { userId: loggedInUser },
      { $push: { following: userToFollow } },
      { new: true }
    );

    // jakey follow kortey gesey tar followers list a loggedin user add hobey
    await InstaUser.findOneAndUpdate(
      { userId: userToFollow }, //finding the user
      { $push: { followers: loggedInUser } },
      { new: true }
    );
    return res.status(200).json({ user, success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
