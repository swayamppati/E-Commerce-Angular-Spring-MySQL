import { Injectable, OnInit } from '@angular/core';
import { Product } from '../common/product';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit{

  /** Dont need these to be static. :-) */
  //Map of product -> qty
  productQtyMap = new Map()

  //Emitters for their Observers
  totalQty: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  ngOnInit(): void {
    console.log("Cart Service Object Created\n");
  }

  addToCart(product: Product): void {
    // console.log(`added:  ${product.id}`);
    if(this.productQtyMap.has(product))
      this.productQtyMap.set(product, this.productQtyMap.get(product) + 1);
    else {
      this.productQtyMap.set(product, 1);
    }
    this.computeTotals();
  }

  /**
   * 
   * Doesn't remove, just can decreament till 0.
   */
  decreamentFromCart(product: Product): void {
    if(this.productQtyMap.get(product)>0) {
      // console.log(`decreamented:  ${product.id}`);
      this.productQtyMap.set(product, this.productQtyMap.get(product) - 1);
    }
    else
      console.log(`decreament NP`);
    this.computeTotals();
  }

  removeFromCart(product: Product): void {
    while(this.productQtyMap.get(product)>0)
      this.decreamentFromCart(product);
    this.productQtyMap.delete(product);
  }

  computeTotals(): void {
    // console.log(`computeTotals()`);
    let totalQty = 0;
    let totalPrice = 0;
    for(let [product, qty] of this.productQtyMap) {
      totalQty = totalQty + qty;
      totalPrice = totalPrice + product.unitPrice * qty;
    }

    this.totalQty.next(totalQty);
    this.totalPrice.next(totalPrice);
  }
}
