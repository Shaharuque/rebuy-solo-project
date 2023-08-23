import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import User from "../model/User";
import jwt from "jsonwebtoken";

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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    //decrypt the hased password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(200).json({ message: "Invalid Password" });
    }

    //sign a token to the loggedin user
    const token = jwt.sign(
      { id: user._id, isAdmin: user.admin },
      process.env.JWT
    );
    // const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: user, token });
  } catch (err) {
    res.status(500).json({
      message: "error",
      err,
    });
  }
};
