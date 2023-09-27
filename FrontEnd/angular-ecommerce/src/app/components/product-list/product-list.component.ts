import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  currentCategoryId: number = 1;

  keyword: string = "";

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //Once data recieved from subscription, execute body inside
    //When I commented out the subscription, the products didn't change on category change.
    //=> ProductListComponent got created only once
    //But changes to this methods was 'not subscribed'
    this.route.paramMap.subscribe(() => {
      this.getProductList();
    })
  }

  getProductList() {
    //get current id from subscribed object
    console.log(this.route.snapshot.toString());

    if(this.route.snapshot.paramMap.has('keyword'))
      this.getProductsByName();

    else
      this.getProductsByCategory();
 
  }

  getProductsByName(): void {
    console.log(this.route.snapshot.params);
    this.keyword = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.getProductsByName(this.keyword).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  getProductsByCategory(): void {
    console.log(this.route.snapshot.params);
    if(this.route.snapshot.paramMap.has('id'))
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductsByCategory(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    );
  }
}
