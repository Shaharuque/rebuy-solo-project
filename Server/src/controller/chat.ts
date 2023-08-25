import { RequestHandler } from "express";
import Chat from "../model/Chat";
import User from "../model/User";

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
export const accessChat: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }

    var isChat: any = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user.id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password") //want to populate the Chat model users property with all of the users info except password
      .populate("latestMessage"); //want to populate Chat model latestMessage property with message all infos cuz initially on id silo property tey

    //want to get the user info of latest message
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name avatar email",
    });

    //if chat exists
    if (isChat?.length > 0) {
      res.status(200).json(isChat[0]);
    } else {
      //create new chat with the another user
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user.id, userId],   //logged in user=>req.user.id and jar sathey chat kortey chay=>userId
      };

      try{  
        const creatChat=await Chat.create(chatData)

        const finalResult=await Chat.find({_id:creatChat._id}).populate('users','-password')

        res.status(200).json(finalResult)
      }catch(err){
        res.status(500).json(err)
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
