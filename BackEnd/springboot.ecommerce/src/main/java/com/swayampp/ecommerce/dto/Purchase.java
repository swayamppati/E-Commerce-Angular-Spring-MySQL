package com.swayampp.ecommerce.dto;

import com.swayampp.ecommerce.entity.Address;
import com.swayampp.ecommerce.entity.Customer;
import com.swayampp.ecommerce.entity.Order;
import com.swayampp.ecommerce.entity.OrderItem;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Order order;
    private Address shippingAddr;
    private Address billingAddr;
    private Set<OrderItem> orderItems;
}
