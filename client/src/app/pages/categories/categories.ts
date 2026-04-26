import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CategoryService } from '../../services/category.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories implements OnInit {
  private categoryService = inject(CategoryService);
  public authService = inject(AuthService);

  categories: any[] = [];

  loading = false;
  errorMessage = '';
  successMessage = '';

  newCategory = {
    name: '',
    description: ''
  };

  editingId: string | null = null;
  editingName = '';
  editingDescription = '';

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.errorMessage = '';

    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data || res.categories || res || [];
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Failed to load categories.';
      }
    });
  }

  addCategory(): void {
    if (!this.newCategory.name.trim()) return;

    this.categoryService.createCategory({
      name: this.newCategory.name,
      description: this.newCategory.description
    }).subscribe({
      next: () => {
        this.successMessage = 'Category added successfully.';
        this.newCategory = { name: '', description: '' };
        this.loadCategories();
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to add category.';
      }
    });
  }

  startEdit(category: any): void {
    this.editingId = category.id;
    this.editingName = category.name;
    this.editingDescription = category.description || '';
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editingName = '';
    this.editingDescription = '';
  }

  updateCategory(): void {
    if (!this.editingId || !this.editingName.trim()) return;

    this.categoryService.updateCategory(this.editingId, {
      name: this.editingName,
      description: this.editingDescription
    }).subscribe({
      next: () => {
        this.successMessage = 'Category updated successfully.';
        this.cancelEdit();
        this.loadCategories();
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to update category.';
      }
    });
  }

  deleteCategory(id: string): void {
    if (!confirm('Delete this category?')) return;

    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.successMessage = 'Category deleted successfully.';
        this.loadCategories();
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to delete category.';
      }
    });
  }
}