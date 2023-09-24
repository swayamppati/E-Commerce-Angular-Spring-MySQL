package com.swayampp.ecommerce.dao;

import com.swayampp.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "product-categories", collectionResourceRel = "productCategories")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Integer> {
}
