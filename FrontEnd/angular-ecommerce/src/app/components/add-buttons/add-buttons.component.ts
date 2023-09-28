import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-add-buttons',
  templateUrl: './add-buttons.component.html',
  styleUrls: ['./add-buttons.component.css']
})
export class AddButtonsComponent implements OnInit {

  @Input() product!: Product;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Cart Handlers
   */
    addToCart(product: Product): void {
      console.log(`${product.name} added`);
      this.cartService.addToCart(product);
    }
  
    removeFromCart(id: number): void {
      console.log(`${id} removed`);
      this.cartService.removeFromCart(id);
    }
  
    isAdded(id: number): boolean {
      return this.cartService.qtyMap.has(id);
    }
  
    getQuantity(id: number): boolean {
      return this.cartService.qtyMap.get(id);
    }

}
