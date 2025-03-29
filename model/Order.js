console.log('Order.js is loaded.....');

// === Order Model ===
export class Order {
    constructor(orderId, customerId, date, total, orderDetails) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.date = date;
        this.total = parseFloat(total);
        this.orderDetails = orderDetails;
    }
}
