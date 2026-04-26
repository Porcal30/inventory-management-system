import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin, Subject, debounceTime } from 'rxjs';

import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { SupplierService } from '../../services/supplier.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private supplierService = inject(SupplierService);
  public authService = inject(AuthService);

  private filterChanges = new Subject<void>();

  products: Product[] = [];
  categories: any[] = [];
  suppliers: any[] = [];

  loading = false;
  errorMessage = '';
  successMessage = '';

  search = '';
  status = '';
  page = 1;
  limit = 5;
  totalPages = 1;

  ngOnInit(): void {
    this.loadInitialData();

    this.filterChanges
      .pipe(debounceTime(400))
      .subscribe(() => {
        this.page = 1;
        this.loadProducts();
      });
  }

  loadInitialData(): void {
    this.loading = true;

    forkJoin({
      categoriesResponse: this.categoryService.getCategories(),
      suppliersResponse: this.supplierService.getSuppliers()
    }).subscribe({
      next: (response) => {
        const categoriesData =
          response.categoriesResponse.data ||
          response.categoriesResponse.categories ||
          response.categoriesResponse;

        const suppliersData =
          response.suppliersResponse.data ||
          response.suppliersResponse.suppliers ||
          response.suppliersResponse;

        this.categories = Array.isArray(categoriesData) ? categoriesData : [];
        this.suppliers = Array.isArray(suppliersData) ? suppliersData : [];

        this.loadProducts();
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Failed to load categories and suppliers.';
      }
    });
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.productService.getProducts({
      search: this.search,
      status: this.status,
      page: this.page,
      limit: this.limit
    }).subscribe({
      next: (response) => {
        console.log('Products response:', response);

        const data =
          response.data?.products ||
          response.products ||
          response.data ||
          response;

        this.products = Array.isArray(data) ? data : [];

        const total =
          response.total ||
          response.totalItems ||
          response.count ||
          response.data?.total ||
          response.data?.totalItems ||
          response.pagination?.total ||
          response.data?.pagination?.total ||
          this.products.length;

        this.totalPages =
          response.totalPages ||
          response.data?.totalPages ||
          response.pagination?.totalPages ||
          response.data?.pagination?.totalPages ||
          Math.ceil(total / this.limit) ||
          1;

        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Failed to load products.';
      }
    });
  }

  onFilterChange(): void {
    this.filterChanges.next();
  }

  getCategoryName(product: Product): string {
    const category = this.categories.find(
      (item) => item.id === product.category_id
    );

    return category?.name || 'Uncategorized';
  }

  getSupplierName(product: Product): string {
    const supplier = this.suppliers.find(
      (item) => item.id === product.supplier_id
    );

    return supplier?.name || 'No supplier';
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadProducts();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadProducts();
    }
  }

  deleteProduct(id: string): void {
    const confirmed = confirm('Are you sure you want to delete this product?');

    if (!confirmed) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.successMessage = 'Product deleted successfully.';
        this.loadProducts();
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to delete product.';
      }
    });
  }
}