import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsBaseUrl: string = "http://localhost:8080/api/products";
  private productCategoriesBaseUrl: string = 'http://localhost:8080/api/product-categories';

  constructor(
    private _httpClient: HttpClient
  ) { }

  getProductList(currentCategoryId: number): Observable<Product[]> {

    let searchUrl = `${this.productsBaseUrl}/search/findByProductCategoryId?id=${currentCategoryId}`;
    console.log(searchUrl);

    return this._httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategoryList(): Observable<ProductCategory[]> {
    return this._httpClient.get<GetResponseProductCategories>(this.productCategoriesBaseUrl).pipe(
      map(response => response._embedded.productCategories)
    );
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[]
  }
}

interface GetResponseProductCategories {
  _embedded: {
    productCategories: ProductCategory[]
  }
}
