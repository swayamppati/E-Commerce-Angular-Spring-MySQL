DROP TABLE IF EXISTS `full-stack-ecommerce`.`order_items`;
DROP TABLE IF EXISTS `full-stack-ecommerce`.`orders`;
DROP TABLE IF EXISTS `full-stack-ecommerce`.`customers`;
DROP TABLE IF EXISTS `full-stack-ecommerce`.`addresses`;


-- ---------------------------------------------------------
-- Create Table `full-stack-ecommerce`.`customers`
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`customers`(
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
)
ENGINE=InnoDB
AUTO_INCREMENT=1;


-- ---------------------------------------------------------
-- Create Table `full-stack-ecommerce`.`addresses`
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`addresses`(
	id INT NOT NULL AUTO_INCREMENT,
    country VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    pin INT NOT NULL,
    PRIMARY KEY(id)
)
ENGINE=InnoDB
AUTO_INCREMENT=1;


-- ---------------------------------------------------------
-- Create Table `full-stack-ecommerce`.`orders`
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`orders`(
	id INT NOT NULL AUTO_INCREMENT,
	customer_id INT NOT NULL,
	shipping_addr_id INT NOT NULL,
	billing_addr_id INT NOT NULL,
	/*order_item_id  will map this*/
	total_qty INT NOT NULL,
	total_price FLOAT NOT NULL,
    order_tracking_number VARCHAR(255) NOT NULL,
    status VARCHAR(128) DEFAULT NULL,
    date_created DATETIME(6),
    last_updated DATETIME(6),
    PRIMARY KEY(id),
    CONSTRAINT fk_customers_orders_customer_id
    FOREIGN KEY (`customer_id`) REFERENCES `full-stack-ecommerce`.`customers`(`id`),
    CONSTRAINT fk_addresses_orders_shipping_addr_id
    FOREIGN KEY (`shipping_addr_id`) REFERENCES `full-stack-ecommerce`.`addresses`(`id`),
    CONSTRAINT fk_addresses_orders_billing_addr_id
    FOREIGN KEY (`billing_addr_id`) REFERENCES `full-stack-ecommerce`.`addresses`(`id`)
)
ENGINE=InnoDB
AUTO_INCREMENT=1;

-- ---------------------------------------------------------
-- Create Table `full-stack-ecommerce`.`order_items`
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`order_items`(
	id INT NOT NULL AUTO_INCREMENT,
    order_id INT DEFAULT NULL,
    product_id BIGINT NOT NULL,
    image_url VARCHAR(255),
    unit_price DECIMAL(19,2),
    quantity INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_orders_order_items_order_id
    FOREIGN KEY (`order_id`) REFERENCES `full-stack-ecommerce`.`orders`(`id`)
);


