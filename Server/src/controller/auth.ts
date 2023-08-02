import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import User from "../model/User";
import jwt from "jsonwebtoken";
import { LoginRequestBody } from "interfaces/interface";

export const register: RequestHandler = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
      return res.status(400).json({ message: "Please enter all fields" });

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(200).json({
        message: "User already exists",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    await User.create({
      name,
      email,
      password: hash,
    });
    res.status(200).json({ message: "User created" });
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
      { id: existingUser._id, status: existingUser.status },
      process.env.JWT
    );

    const modifiedUser = {
      _id: existingUser._id,
      email: existingUser.email,
      status: existingUser.status,
    };

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(modifiedUser);
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
