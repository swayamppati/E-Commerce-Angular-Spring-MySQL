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
    private httpClient: HttpClient
  ) { }

  /**
   * Methods for Getting Products
   */
  getProductsByCategory(currentCategoryId: number): Observable<Product[]> {
    let searchUrl = `${this.productsBaseUrl}/search/findByProductCategoryId?id=${currentCategoryId}`;
    console.log(`Search Product by Category URL: ${searchUrl}`);

    return this.getProducts(searchUrl);
  }

  getProductsByName(keyword: string): Observable<Product[]> {
    let searchUrl =`${this.productsBaseUrl}/search/findByNameContaining?keyword=${keyword}`;
    console.log(`Search Product by Keyword URL: ${searchUrl}`);

    return this.getProducts(searchUrl);
  }

  getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductById(id: number): Observable<Product> {

    let searchUrl =`${this.productsBaseUrl}/${id}`;
    console.log(`Search Product by ID URL: ${searchUrl}`);

    return this.httpClient.get<Product>(searchUrl);
  }

  /**
   * 
   * Methods for Getting Categories
   */

  getProductCategoryList(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategories>(this.productCategoriesBaseUrl).pipe(
      map(response => response._embedded.productCategories)
    );
  }

  /** 
   * Methods with Pagination Support 
   * */
  getProductsByCategoryPaginate(currentCategoryId: number, 
                                pageNumber: number, 
                                pageSize: number): Observable<GetResponseProductsPaginate> {

    let searchUrl = `${this.productsBaseUrl}/search/findByProductCategoryId`
                    + `?id=${currentCategoryId}`
                    + `&page=${pageNumber}`
                    + `&size=${pageSize}`;
    console.log(`Search Product by Category URL: ${searchUrl}`);

    return this.httpClient.get<GetResponseProductsPaginate>(searchUrl);
  }

  getProductsByNamePaginate(keyword: string,
                            pageNumber: number, 
                            pageSize: number): Observable<GetResponseProductsPaginate> {
    let searchUrl =`${this.productsBaseUrl}/search/findByNameContaining`
                  + `?keyword=${keyword}`
                  + `&page=${pageNumber}`
                  + `&size=${pageSize}`;

    console.log(`Search Product by Keyword URL: ${searchUrl}`);

    return this.httpClient.get<GetResponseProductsPaginate>(searchUrl);
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

interface GetResponseProductsPaginate {
  _embedded: {
    products: Product[]
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
