import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import User from "../model/User";
import jwt from "jsonwebtoken";
import { LoginRequestBody } from "interfaces/interface";

export const register: RequestHandler = async (req, res) => {
  try {
    const { email, password, name,phone,adress } = req.body;
    if (!email || !password || !name || !phone || !adress)
      return res.status(400).json({ message: "Please enter all fields" });

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(200).json({
        message: "User already exists",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user=await User.create({
      name,
      email,
      password: hash,
      phone,
      adress,
      status:'online'
    });
    res.status(200).json({ message: "User created",user,success:true });
  } catch (err) {
    res.status(500).json({
      message: "error",
      err,
    });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password }: LoginRequestBody = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT
    );

    const modifiedUser = {
      _id: existingUser._id,
      email: existingUser.email,
    };

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        data:modifiedUser,
        success: true,
      });
  } catch (err) {
    res.status(500).json({
      message: "error",
      err,
    });
  }
};

export const logout: RequestHandler = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({
      message: "error",
      err,
    });
  }
};
