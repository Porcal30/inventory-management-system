import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StockTransactionService } from '../../services/stock-transaction.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-stock-transactions',
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-transactions.html',
  styleUrl: './stock-transactions.css'
})
export class StockTransactions implements OnInit {
  private stockService = inject(StockTransactionService);
  private productService = inject(ProductService);
  public authService = inject(AuthService);

  transactions: any[] = [];
  products: any[] = [];

  loading = false;
  saving = false;
  errorMessage = '';
  successMessage = '';

  form = {
    product_id: '',
    type: 'stock-in' as 'stock-in' | 'stock-out',
    quantity: 1,
    remarks: ''
  };

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.errorMessage = '';

    this.productService.getProducts({ limit: 100 }).subscribe({
      next: (productRes: any) => {
        const productData = productRes.data || productRes.products || productRes;
        this.products = Array.isArray(productData) ? productData : productData.products || [];

        this.stockService.getTransactions().subscribe({
          next: (transactionRes: any) => {
            const transactionData =
              transactionRes.data ||
              transactionRes.transactions ||
              transactionRes;

            this.transactions = Array.isArray(transactionData) ? transactionData : [];
            this.loading = false;
          },
          error: (error) => {
            this.loading = false;
            this.errorMessage = error.error?.message || 'Failed to load transactions.';
          }
        });
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Failed to load products.';
      }
    });
  }

  createTransaction(): void {
    if (!this.form.product_id || this.form.quantity <= 0) {
      this.errorMessage = 'Please select a product and enter a valid quantity.';
      return;
    }

    this.saving = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.stockService.createTransaction({
      product_id: this.form.product_id,
      type: this.form.type,
      quantity: Number(this.form.quantity),
      remarks: this.form.remarks
    }).subscribe({
      next: () => {
        this.saving = false;
        this.successMessage = 'Stock transaction saved successfully.';
        this.form = {
          product_id: '',
          type: 'stock-in',
          quantity: 1,
          remarks: ''
        };
        this.loadData();
      },
      error: (error) => {
        this.saving = false;
        this.errorMessage = error.error?.message || 'Failed to save stock transaction.';
      }
    });
  }

  getProductName(transaction: any): string {
    return (
      transaction.product?.name ||
      transaction.product_name ||
      this.products.find((p) => p.id === transaction.product_id)?.name ||
      'Unknown Product'
    );
  }
}