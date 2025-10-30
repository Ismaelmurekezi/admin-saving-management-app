import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";

export class AdminService {
  static async authenticateAdmin(email: string, password: string) {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });

    return {
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    };
  }

  static async getAllUsers() {
    return await User.find({}, "-password").sort({ createdAt: -1 });
  }

  static async verifyDevice(deviceId: string, status: string) {
    if (!["verified", "rejected"].includes(status)) {
      throw new Error("Invalid status");
    }

    const user = await User.findOneAndUpdate(
      { deviceId },
      { status },
      { new: true, select: "-password" }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  static async getAllTransactions() {
    return await transactionModel.find({})
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
  }

  static async getDashboardStats() {
    const [totalUsers, pendingUsers, verifiedUsers, totalDeposits, totalWithdrawals] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ status: "pendingVerification" }),
      User.countDocuments({ status: "verified" }),
      transactionModel.aggregate([
        { $match: { type: "deposit" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      transactionModel.aggregate([
        { $match: { type: "withdraw" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
    ]);

    return {
      totalUsers,
      pendingUsers,
      verifiedUsers,
      totalDeposits: totalDeposits[0]?.total || 0,
      totalWithdrawals: totalWithdrawals[0]?.total || 0,
    };
  }
}