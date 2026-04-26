import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface CategoryPayload {
  name: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<any>(this.apiUrl);
  }

  createCategory(data: CategoryPayload) {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateCategory(id: string, data: CategoryPayload) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteCategory(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}