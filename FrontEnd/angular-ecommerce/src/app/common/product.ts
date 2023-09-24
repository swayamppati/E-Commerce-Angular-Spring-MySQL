export class Product {

    constructor(
        public id: number,
        public sku: string,
        public name: string,
        public desc: string,
        public unitPrice: number,
        public imageUrl: string,
        public active: boolean,
        public unitsIntStock: number,
        public dateCreated: Date,
        public lastUpdated: Date,
    ) {}
    
}
