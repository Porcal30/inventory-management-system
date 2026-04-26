import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface StockTransactionPayload {
  product_id: string;
  type: 'stock-in' | 'stock-out';
  quantity: number;
  remarks?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StockTransactionService {
  private apiUrl = `${environment.apiUrl}/stock-transactions`;

  constructor(private http: HttpClient) {}

  getTransactions() {
    return this.http.get<any>(this.apiUrl);
  }

  createTransaction(data: StockTransactionPayload) {
    return this.http.post<any>(this.apiUrl, data);
  }
}