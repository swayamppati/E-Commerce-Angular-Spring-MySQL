import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  //properties for pagination
  pageSize: number = 8;
  totalElements: number = 0;
  totalPages: number = 1;
  pageNumber: number = 1;

  prevCategoryId: number = 1;
  currentCategoryId: number = 1;

  prevKeyword: string = "";
  keyword: string = "";

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log("Product List Component Created");
    //Once data recieved from subscription, execute body inside
    //When I commented out the subscription, the products didn't change on category change.
    //=> ProductListComponent got created only once
    //But changes to this methods was 'not subscribed'
    this.route.paramMap.subscribe(() => {
      this.getProductList();
    })
    // this.getTotals();
  }

  getProductList() {
    //get current id from subscribed object
    // console.log(this.route.snapshot.toString());

    if(this.route.snapshot.paramMap.has('keyword'))
      // this.getProductsByName();
      this.getProductsByNamePaginate();

    else
      // this.getProductsByCategory();
      this.getProductsByCategoryPaginate();
 
  }

  getProductsByName(): void {
    // console.log(this.route.snapshot.params);
    this.keyword = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.getProductsByName(this.keyword).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  getProductsByCategory(): void {
    // console.log(this.route.snapshot.params);
    if(this.route.snapshot.paramMap.has('id'))
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProductsByCategory(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  /**
   * Methods with Pagination Support
   */
  getProductsByNamePaginate(): void {
    this.keyword = this.route.snapshot.paramMap.get('keyword')!;

    if(this.prevKeyword != this.keyword)
      this.pageNumber=1;
    this.prevKeyword=this.keyword

    this.productService.getProductsByNamePaginate(
      this.keyword,
      this.pageNumber - 1,
      this.pageSize).subscribe(this.processResponseData());
  }

  getProductsByCategoryPaginate(): void {
    if(this.route.snapshot.paramMap.has('id')) //required when you are providing no id for category(coming back from somewhere)
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

    if(this.prevCategoryId!=this.currentCategoryId)
     this.pageNumber=1;
    this.prevCategoryId=this.currentCategoryId

    this.productService.getProductsByCategoryPaginate(
      this.currentCategoryId, 
      this.pageNumber - 1, 
      this.pageSize).subscribe(this.processResponseData());
  }

  processResponseData() {
    return (data:any) => {
      this.products = data._embedded.products;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
      this.totalPages = data.page.totalPages;
      this.pageNumber = data.page.number + 1;
    }
  }

  updatePageSize(pageSizeSelect: string): void {
    this.pageSize = +pageSizeSelect;
    this.pageNumber = 1;
    this.getProductList();
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
