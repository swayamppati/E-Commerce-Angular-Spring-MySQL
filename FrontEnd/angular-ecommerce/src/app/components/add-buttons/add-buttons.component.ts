import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-add-buttons',
  templateUrl: './add-buttons.component.html',
  styleUrls: ['./add-buttons.component.css']
})
export class AddButtonsComponent implements OnInit {

  @Input() product!: Product;
  @Input() inCart?: boolean = false;
  @Input() addButton?: boolean = true;
  @Input() qtyDisplay?: boolean = true;
  @Input() qtyStyle?: string = "btn-outline-info";
  @Input() color?: string = "white";
  @Input() removeButton?: boolean = false;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Cart Handlers
   */
    addToCart(): void {
      // console.log(`add button: ${this.product.id}`);
      this.cartService.addToCart(this.product);
    }
  
    decreamentFromCart(): void {
      // console.log(`decreament button: ${this.product.id}`);
      this.cartService.decreamentFromCart(this.product);
    }

    /**
     * Handle Event from Remove Button and forward to parent.
     * THIS HANDLING NOT NEEDED ANYMORE< LEVERAGED MAP REFERNCING
     */
    removeFromCart(): void {
      // console.log(`remove button: ${this.product.id}`);
      this.cartService.removeFromCart(this.product);
    }
  
    isAdded(): boolean {
      console.log(`isAdded: ${this.product.id}`)
      return this.cartService.productQtyMap.get(this.product)>0;
    }
  
    getQuantity(): number {
      // console.log(`getQuantity(): ${this.product.id}`);
      if(this.cartService.productQtyMap.has(this.product))
        return this.cartService.productQtyMap.get(this.product);
      else
        return 0;
    }

}
