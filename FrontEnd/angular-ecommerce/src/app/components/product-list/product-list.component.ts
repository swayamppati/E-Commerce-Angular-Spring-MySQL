import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  rows: number[] = [1,2];

  constructor(
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this._productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
