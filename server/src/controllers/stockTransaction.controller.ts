import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const getStockTransactions = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("stock_transactions")
      .select(`
        *,
        products (
          id,
          name,
          quantity
        ),
        users (
          id,
          name,
          email
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.json({
      success: true,
      message: "Stock transactions fetched successfully",
      data
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const createStockTransaction = async (req: Request, res: Response) => {
  try {
    const { product_id, type, quantity, remarks } = req.body;
    const user = (req as any).user;

    if (!["stock-in", "stock-out"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Type must be stock-in or stock-out"
      });
    }

    const transactionQuantity = Number(quantity);

    if (transactionQuantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0"
      });
    }

    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id, name, quantity")
      .eq("id", product_id)
      .single();

    if (productError || !product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    let newQuantity = product.quantity;

    if (type === "stock-in") {
      newQuantity = product.quantity + transactionQuantity;
    }

    if (type === "stock-out") {
      if (product.quantity < transactionQuantity) {
        return res.status(400).json({
          success: false,
          message: "Insufficient stock"
        });
      }

      newQuantity = product.quantity - transactionQuantity;
    }

    const { data: transaction, error: transactionError } = await supabase
      .from("stock_transactions")
      .insert([
        {
          product_id,
          type,
          quantity: transactionQuantity,
          remarks,
          created_by: user.id
        }
      ])
      .select()
      .single();

    if (transactionError) {
      return res.status(400).json({
        success: false,
        message: transactionError.message
      });
    }

    const { error: updateError } = await supabase
      .from("products")
      .update({ quantity: newQuantity })
      .eq("id", product_id);

    if (updateError) {
      return res.status(400).json({
        success: false,
        message: updateError.message
      });
    }

    return res.status(201).json({
      success: true,
      message: "Stock transaction created successfully",
      data: {
        transaction,
        updated_quantity: newQuantity
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};