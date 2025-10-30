import { Router } from "express";
import { body } from "express-validator";
import {
  adminLogin,
  getAllTransactions,
  getAllUsers,
  verifyDevice,
} from "../controllers/adminController.js";
import { adminAuth } from "../middlewares/adminAuth.js";


const router = Router();

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
  ],
  adminLogin
);


/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 */
router.get('/users', adminAuth, getAllUsers);

/**
 * @swagger
 * /api/admin/verify-device/{deviceId}:
 *   patch:
 *     summary: Verify or reject user device
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [verified, rejected]
 *     responses:
 *       200:
 *         description: Device status updated
 *       404:
 *         description: User not found
 */
router.patch('/verify-device/:deviceId', adminAuth, [
  body('status').isIn(['verified', 'rejected'])
], verifyDevice);

/**
 * @swagger
 * /api/admin/transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get('/transactions', adminAuth, getAllTransactions);

export default router;
