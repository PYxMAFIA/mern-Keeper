import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/utils.js";


export async function userSignUp(req, res) {
  try {
    const { email, password } = req.body;
    if(!email || !password)
      return res.status(400).json({message:"All fields are required"});
    if(password.length < 6)
      return res.status(404).json({message:"Password must be at least 6 characters"});
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hashPassword });
    if (user) {
      //jwt token gen here
      generateToken(user._id, res);
      await user.save();
      res.status(201).json({
        _id:user._id,
        email:user.email
      });
    } else {
      res.status(400).json({ message: "Invalid User" });
    }
  } catch (error) {
    console.error("Error in signup controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found!" });
    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    if (!isPasswordCorrect) return res.status(404).json({ message: "Invalid credentials" });
    generateToken(user._id,res);
    res.status(200).json({
        _id:user._id,
        email:user.email
    });
  } catch (error) {
    console.error("Error in userLogin controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};