import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface SupplierPayload {
  name: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  address?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = `${environment.apiUrl}/suppliers`;

  constructor(private http: HttpClient) {}

  getSuppliers() {
    return this.http.get<any>(this.apiUrl);
  }

  createSupplier(data: SupplierPayload) {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateSupplier(id: string, data: SupplierPayload) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteSupplier(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}