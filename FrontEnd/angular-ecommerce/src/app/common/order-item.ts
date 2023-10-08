import { CartItem } from "./cart-item"

export class OrderItem {
    public productId: number;
    public imageUrl: string;
    public unitPrice: number;
    public quantity: number;

    constructor(cartItem: CartItem) {
        this.productId = cartItem.product.id;
        this.imageUrl = cartItem.product.imageUrl;
        this.unitPrice = cartItem.product.unitPrice;
        this.quantity = cartItem.quantity;
    }
}
