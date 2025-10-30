import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";

export const adminLogin = async (req: Request, res: Response) => {
  try {
    console.log("Request body:", req.body);
    const { email, password } = req.body;
    console.log("Email:", email, "Password:", password);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("No admin found with email:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, "-password").sort({ createdAt: -1 });
      res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyDevice = async (req: Request, res: Response) => {
  try {
    const { deviceId } = req.params;
    const { status } = req.body;

    if (!["verified", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const user = await User.findOneAndUpdate(
      { deviceId },
      { status },
      { new: true, select: "-password" }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: `Device ${status} successfully`,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
