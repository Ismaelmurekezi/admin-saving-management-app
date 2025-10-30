import type { Request, Response } from "express";
import { AdminService } from "../services/adminService.js";

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const result = await AdminService.authenticateAdmin(email, password);
    
    res.json({
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server error";
    const status = message === "Invalid credentials" ? 400 : 500;
    res.status(status).json({ message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await AdminService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyDevice = async (req: Request, res: Response) => {
  try {
    const { deviceId } = req.params;
    const { status } = req.body;

    if (!deviceId) {
      return res.status(400).json({ message: "Device ID is required" });
    }

    const user = await AdminService.verifyDevice(deviceId, status);
    
    res.json({
      message: `Device ${status} successfully`,
      user,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server error";
    const statusCode = message === "User not found" ? 404 : 
                      message === "Invalid status" ? 400 : 500;
    res.status(statusCode).json({ message });
  }
};

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await AdminService.getAllTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const stats = await AdminService.getDashboardStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};