import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<any> {
    return forkJoin({
      productsResponse: this.http.get<any>(`${this.apiUrl}/products`),
      categoriesResponse: this.http.get<any>(`${this.apiUrl}/categories`),
      suppliersResponse: this.http.get<any>(`${this.apiUrl}/suppliers`),
      transactionsResponse: this.http.get<any>(`${this.apiUrl}/stock-transactions`)
    }).pipe(
      map((response) => {
        const products = response.productsResponse.data || response.productsResponse.products || response.productsResponse || [];
        const categories = response.categoriesResponse.data || response.categoriesResponse.categories || response.categoriesResponse || [];
        const suppliers = response.suppliersResponse.data || response.suppliersResponse.suppliers || response.suppliersResponse || [];
        const transactions = response.transactionsResponse.data || response.transactionsResponse.transactions || response.transactionsResponse || [];

        const lowStockItems = products.filter((product: any) => Number(product.quantity) <= 5);

        return {
          totalProducts: products.length,
          totalCategories: categories.length,
          totalSuppliers: suppliers.length,
          lowStockItems: lowStockItems.length,
          recentTransactions: transactions.slice(0, 5),
          products,
          categories,
          suppliers,
          transactions
        };
      })
    );
  }
}