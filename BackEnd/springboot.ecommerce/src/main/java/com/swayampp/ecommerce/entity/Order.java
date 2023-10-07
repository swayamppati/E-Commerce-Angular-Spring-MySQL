package com.swayampp.ecommerce.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="orders")
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "total_qty")
    private int totalQty;

    @Column(name = "total_price")
    private float totalPrice;

    @Column(name = "order_tracking_number")
    private String orderTrackingNumber;

    @Column(name = "status")
    private String status;

    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date lastUpdated;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "shipping_addr_id")
    private Address shippingAddr;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "billing_addr_id")
    private Address billingAddr;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private Set<OrderItem> orderItems;

    public void addOrderItem(OrderItem orderItem) {
        if(orderItems == null)
            orderItems = new HashSet<>();
        orderItems.add(orderItem);
        orderItem.setOrder(this);
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", totalQty=" + totalQty +
                ", totalPrice=" + totalPrice +
                ", orderTrackingNumber='" + orderTrackingNumber + '\'' +
                ", status='" + status + '\'' +
                ", dateCreated=" + dateCreated +
                ", lastUpdated=" + lastUpdated +
                '}';
    }
}
