import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import { uploadImageToSupabase } from "../utils/uploadToSupabase";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";

// ✅ GET PRODUCTS (with search/filter/pagination)
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const {
    search = "",
    category_id,
    supplier_id,
    status,
    page = "1",
    limit = "10"
  } = req.query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const from = (pageNumber - 1) * limitNumber;
  const to = from + limitNumber - 1;

  let query = supabase
    .from("products")
    .select(
      `
      *,
      categories (id, name),
      suppliers (id, name)
    `,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  if (category_id) {
    query = query.eq("category_id", category_id as string);
  }

  if (supplier_id) {
    query = query.eq("supplier_id", supplier_id as string);
  }

  if (status) {
    query = query.eq("status", status as string);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new AppError(error.message, 400);
  }

  res.json({
    success: true,
    message: "Products fetched successfully",
    data,
    pagination: {
      totalItems: count,
      currentPage: pageNumber,
      totalPages: Math.ceil((count || 0) / limitNumber),
      limit: limitNumber
    }
  });
});


// ✅ GET PRODUCT BY ID
export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (id, name),
      suppliers (id, name)
    `)
    .eq("id", id)
    .single();

  if (error || !data) {
    throw new AppError("Product not found", 404);
  }

  res.json({
    success: true,
    message: "Product fetched successfully",
    data
  });
});


// ✅ CREATE PRODUCT
export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    description,
    category_id,
    supplier_id,
    quantity,
    price,
    status
  } = req.body;

  let image_url = null;

  if (req.file) {
    image_url = await uploadImageToSupabase(req.file);
  }

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        name,
        description,
        category_id,
        supplier_id,
        quantity: Number(quantity),
        price: Number(price),
        image_url,
        status: status || "active"
      }
    ])
    .select()
    .single();

  if (error) {
    throw new AppError(error.message, 400);
  }

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data
  });
});


// ✅ UPDATE PRODUCT
export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const {
    name,
    description,
    category_id,
    supplier_id,
    quantity,
    price,
    status
  } = req.body;

  const updateData: any = {
    name,
    description,
    category_id,
    supplier_id,
    quantity: Number(quantity),
    price: Number(price),
    status
  };

  if (req.file) {
    updateData.image_url = await uploadImageToSupabase(req.file);
  }

  const { data, error } = await supabase
    .from("products")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error || !data) {
    throw new AppError("Product not found", 404);
  }

  res.json({
    success: true,
    message: "Product updated successfully",
    data
  });
});


// ✅ DELETE PRODUCT
export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    throw new AppError(error.message, 400);
  }

  res.json({
    success: true,
    message: "Product deleted successfully"
  });
});