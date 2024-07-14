import { Component } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/interfaces/product';
import { HighlightPipe } from '../../core/pipes/highlight.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HighlightPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  allProducts: Product[] = []
  constructor(private _ProductsService: ProductsService) { }

  loadProducts() {
    this._ProductsService.getProducts().subscribe({
      next: (response) => {
        this.allProducts = response
      }
    })
  }
  updateQuantity(productId: number, newQuantity: number) {
    this._ProductsService.updateQuantity(productId, newQuantity).subscribe({
      next: response => {
        this.allProducts = response
      },
      error: error => {
        console.error('Failed to update quantity', error);
      }
    });
  }
  async updateAlert(productId: number) {
    let { value: qty } = await Swal.fire({
      title: 'Update Quantity!',
      input: "number",
      confirmButtonText: 'OK'
    });
    if (qty && qty >= 0) this.updateQuantity(productId, qty)
  }
  ngOnInit() {
    this.loadProducts()
  }

}
