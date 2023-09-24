package com.swayampp.ecommerce.dao;

import com.swayampp.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200/")
public interface ProductRepository extends JpaRepository<Product, Integer> {
}
