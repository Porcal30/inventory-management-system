import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";

import testRoutes from "./routes/test.routes";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import supplierRoutes from "./routes/supplier.routes";
import productRoutes from "./routes/product.routes";
import stockTransactionRoutes from "./routes/stockTransaction.routes";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const allowedOrigins = [
  "http://localhost:4200",
  "http://localhost:3000",
  "https://inventory-management-system-three-psi.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow tools like Postman (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

/**
 * Routes
 */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Inventory Management System API is running"
  });
});

app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", productRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/stock-transactions", stockTransactionRoutes);

/**
 * Swagger
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Error handler
 */
app.use(errorHandler);

export default app;