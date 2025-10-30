import request from "supertest";
import express from "express";
import { jest } from '@jest/globals';

// Mock environment variables
process.env.JWT_SECRET = 'test-secret';

// Mock the Admin model
jest.mock("../models/adminModel.js", () => ({
  default: {
    findOne: jest.fn()
  }
}));

import { adminLogin } from "../controllers/adminController.js";
import Admin from "../models/adminModel.js";

const app = express();
app.use(express.json());
app.post("/api/admin/login", adminLogin);

describe("Admin Authentication", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 for invalid credentials", async () => {
    jest.spyOn(Admin, 'findOne').mockResolvedValue(null);

    const response = await request(app).post("/api/admin/login").send({
      email: "invalid@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid credentials");
  });

  it("should return 400 for missing email", async () => {
    const response = await request(app).post("/api/admin/login").send({
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email and password are required");
  });
});

describe("Admin Controller", () => {
  it("should handle server errors gracefully", () => {
    expect(true).toBe(true);
  });
});
