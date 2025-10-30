import bcrypt from "bcryptjs";
import Admin from "../models/adminModel.js";

export const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.log("Admin credentials not found in environment variables");
      return;
    }

    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    const admin = new Admin({
      email: adminEmail,
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();
    console.log("Admin user seeded successfully");
  } catch (error) {
    console.error("Error seeding admin:", error);
  }
};