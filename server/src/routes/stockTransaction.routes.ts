import { Router } from "express";
import {
  getStockTransactions,
  createStockTransaction
} from "../controllers/stockTransaction.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";
import { validate } from "../middleware/validate.middleware";
import { stockTransactionSchema } from "../validators/stockTransaction.validator";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Stock Transactions
 *   description: Stock transaction management endpoints
 */

/**
 * @swagger
 * /api/stock-transactions:
 *   get:
 *     summary: Get all stock transactions
 *     tags: [Stock Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stock transactions fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, getStockTransactions);

/**
 * @swagger
 * /api/stock-transactions:
 *   post:
 *     summary: Create a stock transaction
 *     tags: [Stock Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - type
 *               - quantity
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: uuid-product-id
 *               type:
 *                 type: string
 *                 example: in
 *               quantity:
 *                 type: number
 *                 example: 10
 *               remarks:
 *                 type: string
 *                 example: Added new stock
 *     responses:
 *       201:
 *         description: Stock transaction created successfully
 *       400:
 *         description: Bad request
 */
router.post(
  "/",
  authenticate,
  authorizeRoles("admin"),
  validate(stockTransactionSchema),
  createStockTransaction
);

export default router;