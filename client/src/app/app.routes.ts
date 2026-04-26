import { Routes } from '@angular/router';

import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { Products } from './pages/products/products';
import { ProductForm } from './pages/product-form/product-form';
import { Categories } from './pages/categories/categories';
import { Suppliers } from './pages/suppliers/suppliers';
import { StockTransactions } from './pages/stock-transactions/stock-transactions';
import { authGuard } from './core/auth.guard';
import { adminGuard } from './core/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ],
  },
  {
    path: '',
    component: DashboardLayout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'products', component: Products },

      // Admin-only product actions
      { path: 'products/create', component: ProductForm, canActivate: [adminGuard] },
      { path: 'products/edit/:id', component: ProductForm, canActivate: [adminGuard] },

      // Admin-only sections
      { path: 'categories', component: Categories, canActivate: [adminGuard] },
      { path: 'suppliers', component: Suppliers, canActivate: [adminGuard] },
      { path: 'stock-transactions', component: StockTransactions, canActivate: [adminGuard] },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];