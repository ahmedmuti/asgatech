import { Product } from "./product";

export interface Order {
    OrderId: number;
    OrderDate: string;
    UserId: string;
    Products: Product[];
    PaymentType: string;
}