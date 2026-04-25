import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const getSuppliers = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("suppliers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.json({
      success: true,
      message: "Suppliers fetched successfully",
      data
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const getSupplierById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("suppliers")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found"
      });
    }

    return res.json({
      success: true,
      message: "Supplier fetched successfully",
      data
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const createSupplier = async (req: Request, res: Response) => {
  try {
    const { name, contact_person, phone, email, address } = req.body;

    const { data, error } = await supabase
      .from("suppliers")
      .insert([
        {
          name,
          contact_person,
          phone,
          email,
          address
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(201).json({
      success: true,
      message: "Supplier created successfully",
      data
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, contact_person, phone, email, address } = req.body;

    const { data, error } = await supabase
      .from("suppliers")
      .update({
        name,
        contact_person,
        phone,
        email,
        address
      })
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found"
      });
    }

    return res.json({
      success: true,
      message: "Supplier updated successfully",
      data
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("suppliers")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.json({
      success: true,
      message: "Supplier deleted successfully"
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};