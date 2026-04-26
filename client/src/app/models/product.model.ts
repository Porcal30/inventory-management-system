export interface Product {
  id: string;
  name: string;
  category_id: string;
  supplier_id: string;

  category?: {
    id: string;
    name: string;
  };

  supplier?: {
    id: string;
    name: string;
  };

  category_name?: string;
  supplier_name?: string;

  price: number;
  quantity: number;
  status: 'active' | 'inactive';
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductQueryParams {
  search?: string;
  category_id?: string;
  supplier_id?: string;
  status?: string;
  page?: number;
  limit?: number;
}