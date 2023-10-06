package com.swayampp.ecommerce.service;

import com.swayampp.ecommerce.dto.Purchase;
import com.swayampp.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
