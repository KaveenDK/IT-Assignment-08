console.log("OrderController.js is loaded.....");

import { orders, customers, items } from "../db/DB.js";
import { Order } from "../model/Order.js";
import { OrderDetails } from "../model/OrderDetails.js";

// Generate Automatic Order ID
export function generateOrderId() {
    let lastOrder = orders.length ? orders[orders.length - 1] : null;
    if (lastOrder) {
        let lastIdNum = parseInt(lastOrder.orderId.split("-")[1]);
        return `O-${String(lastIdNum + 1).padStart(3, "0")}`;
    }
    return "O-001";
}

// Add New Order
export function addOrder(customerId, orderDetails, discount = 0) {
    let orderId = generateOrderId();
    let date = new Date().toISOString().split("T")[0];
    let total = calculateTotal(orderDetails, discount);

    if (validateOrder(customerId, orderDetails)) {
        let newOrder = new Order(orderId, customerId, date, total, orderDetails);
        orders.push(newOrder);
        updateItemStock(orderDetails);
        return orderId;
    }
    return null;
}

// Calculate Order Total with Discount
export function calculateTotal(orderDetails, discount) {
    let total = orderDetails.reduce((sum, item) => sum + item.subTotal, 0);
    return total - (total * (discount / 100));
}

// Validate Order Data
function validateOrder(customerId, orderDetails) {
    return (
        customers.some((customer) => customer.id === customerId) &&
        orderDetails.length > 0
    );
}

// Update Item Stock
function updateItemStock(orderDetails) {
    orderDetails.forEach((orderItem) => {
        let item = items.find((i) => i.code === orderItem.itemCode);
        if (item) {
            item.qty -= orderItem.qty;
        }
    });
}

// Get All Orders
export function getAllOrders() {
    return orders;
}