package com.swayampp.ecommerce.dao;

import com.swayampp.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200/")
@RepositoryRestResource(path = "product-categories", collectionResourceRel = "productCategories")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Integer> {
}
