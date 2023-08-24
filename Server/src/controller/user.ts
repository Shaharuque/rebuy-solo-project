import { RequestHandler } from "express";
import User from "../model/User";

export const allUsers:RequestHandler=async(req,res)=>{
    try{
        const users=await User.find()
        console.log(req.user.id)
        res.status(200).json(users)
    }catch(err){
        res.status(500).json({
            message:"error",
            err
        })
    }
}
