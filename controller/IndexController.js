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
        return true;
    }
    return false;
}

// Search Customer
function searchCustomer(id) {
    return customers.find(customer => customer.id === id);
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
        return true;
    }
    return false;
}

// Search Item
function searchItem(code) {
    return items.find(item => item.code === code);
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
function addOrder(customerId, itemCode, qty, discount) {
    let customer = searchCustomer(customerId);
    let item = searchItem(itemCode);

    if (!customer || !item) return false;
    if (item.qty < qty) return false; // Check available stock

    let orderId = generateOrderId();
    let total = qty * item.price;
    let finalTotal = total - (total * (discount / 100));

    // Reduce stock quantity
    item.qty -= qty;

    // Save order
    orders.push({ orderId, customerId, itemCode, qty, total: finalTotal });
    return orderId;
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
export { addCustomer, searchCustomer, addItem, searchItem, addOrder, searchOrder, getTotalOrderValue };
