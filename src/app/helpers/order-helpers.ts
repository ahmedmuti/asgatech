import { Product } from '../core/interfaces/product';
import { Order } from '../core/interfaces/order';

export function calculateTotalOrderPrice(order: Order, allProducts: Product[]): number {
    return order.Products.reduce((sum: number, item) => {
        const product = allProducts.find((p) => p.ProductId === item.ProductId);
        return sum + (product?.ProductPrice ?? 0) * item.Quantity;
    }, 0);
}