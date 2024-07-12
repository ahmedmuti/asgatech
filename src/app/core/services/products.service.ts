import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private _HttpClient: HttpClient) { }
  getProducts(): Observable<any> {
    return this._HttpClient.get(environment.baseURL + 'products.json')
  }
  updateQuantity(id: number, quantity: number): Observable<any> {
    return this._HttpClient.get(environment.baseURL + 'products.json').pipe(
      map((data: any) => {
        const updatedData = data.map((item: any) => {
          if (item.ProductId === id) { item.AvailablePieces = quantity }
          return item;
        });
        return updatedData;
      })
    );
  }
}
