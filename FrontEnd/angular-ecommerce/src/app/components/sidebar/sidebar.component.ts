import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public productCategories: ProductCategory[] = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProductCategoryList();
  }

  getProductCategoryList(): void {
    this.productService.getProductCategoryList().subscribe(
      data => {
        this.productCategories=data;
      }
    )
  }

}
