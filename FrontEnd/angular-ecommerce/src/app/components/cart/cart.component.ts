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

  productQtyMap = new Map();

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
    this.productQtyMap = this.cartService.productQtyMap;
  }

  getTotals(): void {
    this.cartService.totalQty.subscribe(data => { this.totalQty = data; });
    this.cartService.totalPrice.subscribe(data => { this.totalPrice = data; });

    //Not needed anymore due to BehaviourSubject
    // //This component has subscribed lately, so triggered the Obervable Again.
    // this.cartService.computeTotals();
  }
}

