import { supabase } from "../config/supabase";

export const uploadImageToSupabase = async (file: Express.Multer.File) => {
  const extension = file.originalname.split(".").pop() || "jpg";

  const safeFileName = file.originalname
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9.-]/g, "");

  const fileName = `${Date.now()}-${safeFileName || `image.${extension}`}`;

  const contentType = file.mimetype.startsWith("image/")
    ? file.mimetype
    : "image/jpeg";

  const { error } = await supabase.storage
    .from("product-images")
    .upload(fileName, file.buffer, {
      contentType,
      upsert: false
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data: publicUrlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
};