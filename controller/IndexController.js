console.log('indexController.js is loaded.....');

// POS Data Storage (Temporary Memory)
let customers = [];
let items = [];
let orders = [];

// === CUSTOMER MANAGEMENT ===
// Add Customer
function addCustomer(id, name, address, salary) {
    if (validateCustomer(id, name, address, salary)) {
        customers.push({ id, name, address, salary });
        return { success: true, message: "Customer added successfully." };
    }
    return { success: false, message: "Invalid customer data." };
}

// Search Customer
function searchCustomer(id) {
    return customers.find(customer => customer.id === id);
}

// Get All Customers
function getAllCustomers() {
    return customers;
}

// Validate Customer Fields
function validateCustomer(id, name, address, salary) {
    return id.trim() !== "" && name.trim() !== "" && address.trim() !== "" && !isNaN(salary) && salary > 0;
}

// === ITEM MANAGEMENT ===
// Add Item
function addItem(code, name, qty, price) {
    if (validateItem(code, name, qty, price)) {
        items.push({ code, name, qty: parseInt(qty), price: parseFloat(price) });
        return { success: true, message: "Item added successfully." };
    }
    return { success: false, message: "Invalid item data." };
}

// Search Item
function searchItem(code) {
    return items.find(item => item.code === code);
}

// Get All Items
function getAllItems() {
    return items;
}

// Validate Item Fields
function validateItem(code, name, qty, price) {
    return code.trim() !== "" && name.trim() !== "" && !isNaN(qty) && qty > 0 && !isNaN(price) && price > 0;
}

// === ORDER MANAGEMENT ===
// Generate Auto Order ID
function generateOrderId() {
    return "O" + (orders.length + 1).toString().padStart(3, "0");
}

// Add Order
function addOrder(customerId, orderItems) {
    let customer = searchCustomer(customerId);
    if (!customer) return { success: false, message: "Customer not found." };

    for (let orderItem of orderItems) {
        let item = searchItem(orderItem.itemCode);
        if (!item) return { success: false, message: `Item ${orderItem.itemCode} not found.` };
        if (item.qty < orderItem.qty) return { success: false, message: `Insufficient stock for item ${orderItem.itemCode}.` };

        // Reduce stock quantity
        item.qty -= orderItem.qty;
    }

    let orderId = generateOrderId();
    let total = orderItems.reduce((sum, item) => sum + item.total, 0);

    // Save order
    orders.push({ orderId, customerId, orderItems, total });
    return { success: true, message: `Order ${orderId} placed successfully.` };
}

// Search Order
function searchOrder(orderId) {
    return orders.find(order => order.orderId === orderId);
}

// Get Total Order Value
function getTotalOrderValue() {
    return orders.reduce((total, order) => total + order.total, 0);
}

// === EXPORT FUNCTIONS FOR UI ===
export { 
    addCustomer, 
    searchCustomer, 
    getAllCustomers, 
    addItem, 
    searchItem, 
    getAllItems, 
    addOrder, 
    searchOrder, 
    getTotalOrderValue 
};