export class OrderItem {
    constructor(
        public productId: number,
        public imageUrl: string,
        public unitPrice: number,
        public quantity: number
    ) {}
}
