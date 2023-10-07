import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private purchaseBaseUrl = "http://localhost:8080/api/checkout/purchase";

  placeOrder(purchase: Purchase): Observable<any> {
    console.log(JSON.parse(JSON.stringify(purchase)));

    // return new BehaviorSubject<string>("Done");
    return this.httpClient.post<Purchase>(this.purchaseBaseUrl, purchase);
  }
}
