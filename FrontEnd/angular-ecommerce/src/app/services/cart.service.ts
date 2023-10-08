import { Injectable, OnInit } from '@angular/core';
import { Product } from '../common/product';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit{

  /** 
   * Dont need these to be static. :-) 
   * Services are implemented for whole app, once required, not for individual initialisations
   * */
  //Map of product -> qty
  // idProductMap = new Map();
  cartItems: CartItem[] = [];

  //Emitters for their Observers
  totalQty: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  storage : Storage = sessionStorage;

  constructor() {

    //read data from storage
    let data = JSON.parse(this.storage.getItem('cartItems')!);

    //computeTotal based on read data
    if(data != null) {
      this.cartItems = data;
      this.computeTotals();
    }
   }

  ngOnInit(): void {
    console.log("Cart Service Object Created\n");

  }

  findItemIndex(id: number): number {
    for(let i=0; i<this.cartItems.length; ++i) {
      if(this.cartItems[i].product.id == id)
        return i;
    }

    return -1;
  }

  addToCart(product: Product): void {
    // console.log(`added:  ${product.id}`);
    let ind = this.findItemIndex(product.id);
    if(ind != -1)
      this.cartItems[ind].quantity+=1;
    else {
      this.cartItems.push(new CartItem(product, 1));
    }
    this.computeTotals();
  }

  /**
   * 
   * Doesn't remove, just can decreament till 0.
   */
  decreamentFromCart(product: Product): void {
    let ind = this.findItemIndex(product.id);
    if(ind != -1 && this.cartItems[ind].quantity>0) {
      // console.log(`decreamented:  ${product.id}`);
      this.cartItems[ind].quantity-=1;
    }
    else
      console.log(`decreament NP`);
    this.computeTotals();
  }

  removeFromCart(product: Product): void {
    let ind = this.findItemIndex(product.id);
    this.cartItems.splice(ind, 1);
    this.computeTotals();
  }

  computeTotals(): void {
    // console.log(`computeTotals()`);
    let totalQty = 0;
    let totalPrice = 0;
    for(let cartItem of this.cartItems) {
      totalQty += cartItem.quantity;
      totalPrice = totalPrice + cartItem.product.unitPrice * cartItem.quantity;
    }

    this.totalQty.next(totalQty);
    this.totalPrice.next(totalPrice);

    console.log(this.cartItems);
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
