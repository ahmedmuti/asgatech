import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  constructor(private _HttpClient: HttpClient) { }
  getOrders(): Observable<any> {
    return this._HttpClient.get(environment.baseURL + 'orders.json')
  }
  getOrder(orderId: number): Observable<any> {
    return this.getOrders().pipe(
      map((data: any) => {
        return data.find((item: any) => item.OrderId === orderId);
      })
    );
  }

  addOrder(order: object): Observable<any> {
    return this._HttpClient.post(environment.baseURL + 'orders.json', order)
  }
}
