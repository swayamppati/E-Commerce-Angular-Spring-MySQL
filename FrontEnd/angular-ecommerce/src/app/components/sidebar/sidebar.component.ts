import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { LoginStatusService } from 'src/app/services/login-status.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public productCategories: ProductCategory[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private productService: ProductService,
    private loginStatusService : LoginStatusService,
  ) { }

  ngOnInit(): void {
    this.getProductCategoryList();
    this.loginStatusService.isLoggedIn.subscribe(response => this.isLoggedIn=response);
  }

  getProductCategoryList(): void {
    this.productService.getProductCategoryList().subscribe(
      data => {
        this.productCategories=data;
      }
    )
  }

}
