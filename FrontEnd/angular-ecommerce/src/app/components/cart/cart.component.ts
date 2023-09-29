import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productMap = new Map();
  qtyMap = new Map();

  idArray: number[] = [];

  public totalQty: number = 0;
  public totalPrice: number = 0;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getCartItems();
    this.getTotals();
  }

  getCartItems(): void {
    //Maps are assigned by reference
    this.productMap = this.cartService.productMap;
    this.qtyMap = this.cartService.qtyMap;

    this.idArray = [...this.productMap.keys()];
  }

  getTotals(): void {
    this.cartService.totalQty.subscribe(data => { this.totalQty = data; });
    this.cartService.totalPrice.subscribe(data => { this.totalPrice = data; });

    this.cartService.computeTotals();

    console.log(`Total Qty: ${this.totalQty}`);
    console.log(`Total Price: ${this.totalPrice}`);
    console.log(...this.productMap.keys());
  }

  removeFromCart(id: number): void {
    const index = this.idArray.indexOf(id, 0);
    this.idArray.splice(index,1);
  }
}

