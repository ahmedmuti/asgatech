import { Routes } from '@angular/router';
export const routes: Routes = [
    { path: '', redirectTo: "home", pathMatch: 'full' },
    { path: 'products', loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent), title: "Products" },
    { path: 'orders', loadComponent: () => import('./components/orders/orders.component').then(m => m.OrdersComponent), title: "Orders" },
    { path: 'order-details/:id', loadComponent: () => import('./components/orders-details/orders-details.component').then(m => m.OrdersDetailsComponent), title: "Order Details" },
    { path: '**', loadComponent: () => import('./components/notfound/notfound.component').then(m => m.NotfoundComponent), title: "404 Not Found" },
];
