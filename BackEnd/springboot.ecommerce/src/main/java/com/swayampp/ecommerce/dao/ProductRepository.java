package com.swayampp.ecommerce.dao;

import com.swayampp.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin("http://localhost:4200/")
public interface ProductRepository extends JpaRepository<Product, Integer> {
    //Search for product by Category ID.
    Page<Product> findByProductCategoryId(@Param("id") Long id, Pageable pageable);

    //Search for name having the keyword
    Page<Product> findByNameContaining(@Param("keyword") String name, Pageable pageable);
}
