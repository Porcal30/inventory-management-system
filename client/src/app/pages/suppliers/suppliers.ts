import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SupplierService } from '../../services/supplier.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-suppliers',
  imports: [CommonModule, FormsModule],
  templateUrl: './suppliers.html',
  styleUrl: './suppliers.css'
})
export class Suppliers implements OnInit {
  private supplierService = inject(SupplierService);
  public authService = inject(AuthService);

  suppliers: any[] = [];

  loading = false;
  errorMessage = '';
  successMessage = '';

  newSupplier = {
    name: '',
    contact_person: '',
    phone: '',
    email: '',
    address: ''
  };

  editingId: string | null = null;
  editingSupplier = {
    name: '',
    contact_person: '',
    phone: '',
    email: '',
    address: ''
  };

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.loading = true;
    this.errorMessage = '';

    this.supplierService.getSuppliers().subscribe({
      next: (res: any) => {
        this.suppliers = res.data || res.suppliers || res || [];
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Failed to load suppliers.';
      }
    });
  }

  addSupplier(): void {
    if (!this.newSupplier.name.trim()) return;

    this.supplierService.createSupplier(this.newSupplier).subscribe({
      next: () => {
        this.successMessage = 'Supplier added successfully.';
        this.newSupplier = {
          name: '',
          contact_person: '',
          phone: '',
          email: '',
          address: ''
        };
        this.loadSuppliers();
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to add supplier.';
      }
    });
  }

  startEdit(supplier: any): void {
    this.editingId = supplier.id;
    this.editingSupplier = {
      name: supplier.name || '',
      contact_person: supplier.contact_person || '',
      phone: supplier.phone || '',
      email: supplier.email || '',
      address: supplier.address || ''
    };
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editingSupplier = {
      name: '',
      contact_person: '',
      phone: '',
      email: '',
      address: ''
    };
  }

  updateSupplier(): void {
    if (!this.editingId || !this.editingSupplier.name.trim()) return;

    this.supplierService.updateSupplier(this.editingId, this.editingSupplier).subscribe({
      next: () => {
        this.successMessage = 'Supplier updated successfully.';
        this.cancelEdit();
        this.loadSuppliers();
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to update supplier.';
      }
    });
  }

  deleteSupplier(id: string): void {
    if (!confirm('Delete this supplier?')) return;

    this.supplierService.deleteSupplier(id).subscribe({
      next: () => {
        this.successMessage = 'Supplier deleted successfully.';
        this.loadSuppliers();
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to delete supplier.';
      }
    });
  }
}