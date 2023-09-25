import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;

  constructor(
    private _productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //Once data recieved from subscription, execute body inside
    this.route.paramMap.subscribe(() => {
      this.getProductList();
    })
  }

  getProductList() {
    //get current id from subscribed object
    if(this.route.snapshot.paramMap.has('id')) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      this.currentCategoryId = 1;
    }

    this._productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
