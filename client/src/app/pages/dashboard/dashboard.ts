import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  private dashboardService = inject(DashboardService);

  loading = true;
  errorMessage = '';

  stats = {
    totalProducts: 0,
    totalCategories: 0,
    totalSuppliers: 0,
    lowStockItems: 0
  };

  recentTransactions: any[] = [];
  lowStockProducts: any[] = [];

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.errorMessage = '';

    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        this.stats = {
          totalProducts: data.totalProducts,
          totalCategories: data.totalCategories,
          totalSuppliers: data.totalSuppliers,
          lowStockItems: data.lowStockItems
        };

        this.recentTransactions = data.recentTransactions;
        this.lowStockProducts = data.products
          .filter((product: any) => Number(product.quantity) <= 5)
          .slice(0, 5);

        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Failed to load dashboard data.';
      }
    });
  }
}