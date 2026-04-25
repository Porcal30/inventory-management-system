import { Router } from "express";
import {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier
} from "../controllers/supplier.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";
import { validate } from "../middleware/validate.middleware";
import { supplierSchema } from "../validators/supplier.validator";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: Supplier management endpoints
 */

/**
 * @swagger
 * /api/suppliers:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Suppliers fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, getSuppliers);

/**
 * @swagger
 * /api/suppliers/{id}:
 *   get:
 *     summary: Get supplier by ID
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: uuid-supplier-id
 *     responses:
 *       200:
 *         description: Supplier fetched successfully
 *       404:
 *         description: Supplier not found
 */
router.get("/:id", authenticate, getSupplierById);

/**
 * @swagger
 * /api/suppliers:
 *   post:
 *     summary: Create a new supplier
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: ABC Supplies
 *               contact_person:
 *                 type: string
 *                 example: Juan Dela Cruz
 *               phone:
 *                 type: string
 *                 example: 09123456789
 *               email:
 *                 type: string
 *                 example: abc@example.com
 *               address:
 *                 type: string
 *                 example: Manila, Philippines
 *     responses:
 *       201:
 *         description: Supplier created successfully
 *       400:
 *         description: Bad request
 */
router.post(
  "/",
  authenticate,
  authorizeRoles("admin"),
  validate(supplierSchema),
  createSupplier
);

/**
 * @swagger
 * /api/suppliers/{id}:
 *   put:
 *     summary: Update a supplier
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: uuid-supplier-id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Supplier
 *               contact_person:
 *                 type: string
 *                 example: Maria Santos
 *               phone:
 *                 type: string
 *                 example: 09987654321
 *               email:
 *                 type: string
 *                 example: updated@example.com
 *               address:
 *                 type: string
 *                 example: Cebu City, Philippines
 *     responses:
 *       200:
 *         description: Supplier updated successfully
 *       404:
 *         description: Supplier not found
 */
router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  validate(supplierSchema),
  updateSupplier
);

/**
 * @swagger
 * /api/suppliers/{id}:
 *   delete:
 *     summary: Delete a supplier
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: uuid-supplier-id
 *     responses:
 *       200:
 *         description: Supplier deleted successfully
 *       404:
 *         description: Supplier not found
 */
router.delete("/:id", authenticate, authorizeRoles("admin"), deleteSupplier);

export default router;