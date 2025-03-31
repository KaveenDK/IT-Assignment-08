console.log('DB.js is loaded.....');

const customers = [];
const items = [];
const orders = [];

// Function to add a customer
export function addCustomer(id, name, address, salary) {
    if (customers.some((customer) => customer.id === id)) {
        return { success: false, message: "Customer ID already exists!" };
    }
    const customer = { id, name, address, salary: parseFloat(salary) };
    customers.push(customer);
    return { success: true, message: "Customer added successfully!" };
}

// Function to remove a customer
export function removeCustomer(id) {
    const index = customers.findIndex((customer) => customer.id === id);
    if (index !== -1) {
        customers.splice(index, 1);
        return { success: true, message: "Customer removed successfully!" };
    }
    return { success: false, message: "Customer not found!" };
}

// Function to update a customer
export function updateCustomer(id, name, address, salary) {
    const customer = customers.find((customer) => customer.id === id);
    if (customer) {
        customer.name = name;
        customer.address = address;
        customer.salary = parseFloat(salary);
        return { success: true, message: "Customer updated successfully!" };
    }
    return { success: false, message: "Customer not found!" };
}

// Function to get all customers
export function getAllCustomers() {
    return customers;
}

// Function to add an item
export function addItem(code, name, qty, price) {
    if (items.some((item) => item.code === code)) {
        return { success: false, message: "Item code already exists!" };
    }
    const item = { code, name, qty: parseInt(qty), price: parseFloat(price) };
    items.push(item);
    return { success: true, message: "Item added successfully!" };
}

// Function to remove an item
export function removeItem(code) {
    const index = items.findIndex((item) => item.code === code);
    if (index !== -1) {
        items.splice(index, 1);
        return { success: true, message: "Item removed successfully!" };
    }
    return { success: false, message: "Item not found!" };
}

// Function to update an item
export function updateItem(code, name, qty, price) {
    const item = items.find((item) => item.code === code);
    if (item) {
        item.name = name;
        item.qty = parseInt(qty);
        item.price = parseFloat(price);
        return { success: true, message: "Item updated successfully!" };
    }
    return { success: false, message: "Item not found!" };
}

// Function to get all items
export function getAllItems() {
    return items;
}

// Function to add an order
export function addOrder(orderId, customerId, date, total, orderDetails) {
    const order = { orderId, customerId, date, total, orderDetails };
    orders.push(order);
    return { success: true, message: "Order added successfully!" };
}

// Function to remove an order
export function removeOrder(orderId) {
    const index = orders.findIndex((order) => order.orderId === orderId);
    if (index !== -1) {
        orders.splice(index, 1);
        return { success: true, message: "Order removed successfully!" };
    }
    return { success: false, message: "Order not found!" };
}

// Function to get all orders
export function getAllOrders() {
    return orders;
}

// Export arrays for direct access if needed
export { customers, items, orders };