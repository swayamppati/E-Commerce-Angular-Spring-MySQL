package com.swayampp.ecommerce.service;

import com.swayampp.ecommerce.dao.CustomerRepository;
import com.swayampp.ecommerce.dao.ProductRepository;
import com.swayampp.ecommerce.dto.Purchase;
import com.swayampp.ecommerce.dto.PurchaseResponse;
import com.swayampp.ecommerce.entity.Customer;
import com.swayampp.ecommerce.entity.Order;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Transactional
public class CheckoutServiceImpl implements CheckoutService {
    private CustomerRepository customerRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }
    @Override
    public PurchaseResponse placeOrder(Purchase purchase) {
        // retrieve the order info from dto
        Customer customer = purchase.getCustomer();
        Order order = purchase.getOrder();

        //Prepare Customer
        customer.addOrder(order); // <-> Bridge 1

        String orderTrackingNumber = generateOrderTrackingNumber();
        //Prepare Order
        {
            // populate order with shippingAddress and billingAddress  -> Bridge 2
            order.setShippingAddr(purchase.getShippingAddr());
            order.setBillingAddr(purchase.getShippingAddr());

            // populate order with orderItems  -> Bridge 3
            purchase.getOrderItems().forEach(order::addOrderItem);

            // populate with tracking number and rest
            order.setOrderTrackingNumber(orderTrackingNumber);
        }

        //Prepare Address -> ready

        //Prepare OrderItem -> ready

        //Save Customer -> will persist
        customerRepository.save(customer);

        // return response
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        //generate a random UUID number (UUID version-4)
        return UUID.randomUUID().toString();
    }
}