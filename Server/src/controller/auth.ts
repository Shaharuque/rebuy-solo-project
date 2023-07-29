import { RequestHandler } from "express";
import bcrypt from "bcryptjs"
import User from "../model/User";


export const register: RequestHandler = async (req, res) => {
  try {
    const {email,password,name}=req.body
    if(!email || !password || !name) return res.status(400).json({message:"Please enter all fields"})

    const existingEmail=await User.findOne({email})
    if(existingEmail){
        return res.status(200).json({
            message:"User already exists"
        })
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    await User.create({
        name,
        email,
        password:hash
    })
    res.status(200).json({message:"User created"})

  } catch (err) {
    res.status(500).json({
      message: "error",
      err,
    });
  }
};

export const login: RequestHandler = async (req, res) => {
    res.status(200).json("login");
  };
