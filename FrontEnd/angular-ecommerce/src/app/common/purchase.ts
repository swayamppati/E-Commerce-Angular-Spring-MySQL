import { Address } from "./address";
import { Customer } from "./customer";
import { Order } from "./order";
import { OrderItem } from "./order-item";

export class Purchase {
    constructor(
        public customer: Customer,
        public order: Order,
        public shippingAddr: Address,
        public billingAddr: Address,
        public orderItems: OrderItem[]
    ) {}
}