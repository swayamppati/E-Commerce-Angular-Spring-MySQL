import { Injectable, OnInit } from '@angular/core';
import { Product } from '../common/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit{

  /** Dont need these to be static. :-) */
  //Map of id -> Product
  productMap = new Map()

  //Map of id -> Quantity
  qtyMap = new Map()

  //Emitters for their Observers
  totalQty: Subject<number> = new Subject<number>();
  totalPrice: Subject<number> = new Subject<number>();

  constructor() { }

  ngOnInit(): void {
    console.log("Cart Service Object Created\n");
  }

  addToCart(product: Product): void {
    console.log(`add()`);
    if(this.productMap.has(product.id))
      this.qtyMap.set(product.id, this.qtyMap.get(product.id) + 1);
    else {
      this.productMap.set(product.id, product);
      this.qtyMap.set(product.id, 1);
    }
    this.computeTotals();
  }

  decreamentFromCart(id: number): void {
    if(this.qtyMap.get(id)>0) {
      console.log(`removed`);
      this.qtyMap.set(id, this.qtyMap.get(id) - 1);
      /**
       * Needed in Cart, don't delete. Refresh after Checkout or Logout
      if(this.qtyMap.get(id)==0) {
        this.qtyMap.delete(id);
        this.productMap.delete(id);
      }
       */
      this.computeTotals();
    }
    else
      console.log(`remove NP`);
  }

  computeTotals(): void {
    console.log(`computeTotals()`);
    let totalQty = 0;
    let totalPrice = 0;
    for(let [id, product] of this.productMap) {
      totalQty = totalQty + this.qtyMap.get(id);
      totalPrice = totalPrice + this.qtyMap.get(id) * product.unitPrice;
    }

    this.totalQty.next(totalQty);
    this.totalPrice.next(totalPrice);
  }
}
