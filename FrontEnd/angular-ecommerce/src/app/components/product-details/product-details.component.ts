import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public product!: Product;
  public catId!: number;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getProduct();
    });
  }

  getProduct(): void {
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    this.catId = +this.route.snapshot.paramMap.get('catId')!;

    this.productService.getProductById(id).subscribe(
      data => {
        this.product = data;
        console.log(this.product);
      }
    );
  }

  /**
   * Add to Card Handler
   */
  addToCart(product: Product): void {
    console.log(`${product.name} added`);
    this.cartService.addToCart(product);
  }

}
