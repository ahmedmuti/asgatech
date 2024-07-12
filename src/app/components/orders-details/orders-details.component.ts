import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { OrdersService } from '../../core/services/orders.service';
import { CommonModule } from '@angular/common';
import { CustomersService } from '../../core/services/customers.service';
import { Order } from '../../core/interfaces/order';
import { Product } from '../../core/interfaces/product';
import { User } from '../../core/interfaces/user';

@Component({
  selector: 'app-orders-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-details.component.html',
  styleUrl: './orders-details.component.scss'
})
export class OrdersDetailsComponent {
  orderId!: number;
  order!: Order;
  products!: Product[];
  orderProducts: Product[] = [];
  customer!: User;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _OrdersService: OrdersService,
    private _CustomersService: CustomersService,
  ) { }



  ngOnInit(): void {
    this.orderId = Number(this._ActivatedRoute.snapshot.params['id']);
    this.loadOrderDetails();
    this.loadCustomerDetails();
  }

  private loadOrderDetails(): void {
    this._OrdersService.getOrder(this.orderId).subscribe({
      next: (response) => {
        this.order = response
        this.loadProducts();
      },
      error: (err) => {
        console.error('Failed to load orders', err);
      }
    })
  }

  private loadProducts(): void {
    this._ProductsService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.populateOrderProducts();
      },
      error: (err) => {
        console.error('Failed to load products', err);
      }
    });
  }

  private populateOrderProducts(): void {
    this.orderProducts = this.order.Products.map((orderProduct: Product) => {
      const product: Product = this.products.find((p: any) => p.ProductId === orderProduct.ProductId)!;
      return {
        ...product,
        Quantity: orderProduct.Quantity
      };
    });
  }

  private loadCustomerDetails(): void {
    this._CustomersService.getCustomers().subscribe({
      next: (customers) => {
        this.customer = customers.find((customer: User) => customer.Id === this.order.UserId);
        if (!this.customer)
          console.error(`Customer with ID ${this.order.UserId} not found`);
      },
      error: (err) => {
        console.error('Failed to load customers', err);
      }
    });
  }

}
