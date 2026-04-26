import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private supplierService = inject(SupplierService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loading = false;
  errorMessage = '';
  isEdit = false;
  productId: string | null = null;

  categories: any[] = [];
  suppliers: any[] = [];

  selectedFile: File | null = null;
  imagePreview: string | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    category_id: ['', Validators.required],
    supplier_id: ['', Validators.required],
    price: [0, Validators.required],
    quantity: [0, Validators.required],
    status: ['active', Validators.required],
    description: ['']
  });

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.productId;

    this.loadDropdowns();

    if (this.isEdit && this.productId) {
      this.loadProduct(this.productId);
    }
  }

  loadDropdowns(): void {
    this.categoryService.getCategories().subscribe((res: any) => {
      this.categories = res.data || res;
    });

    this.supplierService.getSuppliers().subscribe((res: any) => {
      this.suppliers = res.data || res;
    });
  }

  loadProduct(id: string): void {
    this.productService.getProductById(id).subscribe((res: any) => {
      const product = res.data || res;

      this.form.patchValue(product);

      if (product.image_url) {
        this.imagePreview = product.image_url;
      }
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  submit(): void {
    if (this.form.invalid) return;

    const formData = new FormData();

    Object.entries(this.form.value).forEach(([key, value]) => {
      if (value !== null) formData.append(key, String(value));
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.loading = true;

    const request = this.isEdit
      ? this.productService.updateProduct(this.productId!, formData)
      : this.productService.createProduct(formData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Failed to save product.';
      }
    });
  }
}