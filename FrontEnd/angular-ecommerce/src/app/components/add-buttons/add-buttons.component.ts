import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-add-buttons',
  templateUrl: './add-buttons.component.html',
  styleUrls: ['./add-buttons.component.css']
})
export class AddButtonsComponent implements OnInit {

  @Input() inCart?: boolean = false;
  @Input() product!: Product;
  @Input() addButton?: boolean = true;
  @Input() qty?: boolean = true;
  @Input() qtyStyle?: string = "btn-outline-info";
  @Input() color?: string = "white";
  @Input() removeButton?: boolean = false;

  @Output() removeFromCartEmitter = new EventEmitter<number>();

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Cart Handlers
   */
    addToCart(product: Product): void {
      // console.log(`${product.name} added`);
      console.log(`add button`);
      this.cartService.addToCart(product);
    }
  
    decreamentFromCart(id: number): void {
      // console.log(`${id} removed`);
      console.log(`decreament button`);
      this.cartService.decreamentFromCart(id);
    }

    /**
     * Handle Event from Remove Button and forward to parent.
     */
    removeFromCart(id: number): void {
      console.log(`remove from cart`);
      while(this.cartService.qtyMap.get(id)>0)
        this.decreamentFromCart(id);
      this.removeFromCartEmitter.emit(id);
    }
  
    isAdded(id: number): boolean {
      return this.cartService.qtyMap.get(id)>0;
    }
  
    getQuantity(id: number): number {
      console.log(`getQuantity()`);
      if(this.cartService.qtyMap.has(id))
        return this.cartService.qtyMap.get(id);
      else
        return 0;
    }

}
