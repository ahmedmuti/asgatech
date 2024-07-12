import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { ProductsService } from '../../core/services/products.service';
import { Order } from '../../core/interfaces/order';
import { Product } from '../../core/interfaces/product';
import { calculateTotalOrderPrice } from '../../helpers/order-helpers'; // Adjust the path as necessary

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  allOrders: Order[] = []
  allProducts: Product[] = []
  constructor(private _OrdersService: OrdersService, private _ProductsService: ProductsService) { }
  ngOnInit(): void {
    this.loadOrders();
    this.loadProducts();
  }

  private loadOrders(): void {
    this._OrdersService.getOrders().subscribe({
      next: (response) => {
        this.allOrders = response;
      },
      error: (err) => {
        console.error('Failed to load orders', err);
      }
    });
  }

  private loadProducts(): void {
    this._ProductsService.getProducts().subscribe({
      next: (response) => {
        this.allProducts = response;
      },
      error: (err) => {
        console.error('Failed to load products', err);
      }
    });
  }

  getTotalOrderPrice(order: Order): number {
    return calculateTotalOrderPrice(order, this.allProducts);
  }

}
