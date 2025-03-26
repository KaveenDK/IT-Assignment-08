console.log("CustomerController.js is loaded.....");

import { customers } from "./DB.js";
import { Customer } from "./Customer.js";

// === CUSTOMER CONTROLLER ===

// Add Customer
export function addCustomer(id, name, address, salary) {
    if (validateCustomer(id, name, address, salary)) {
        let customer = new Customer(id, name, address, salary);
        customers.push(customer);
        return true;
    }
    return false;
}

// Search Customer by ID
export function searchCustomer(id) {
    return customers.find(customer => customer.id === id);
}

// Update Customer
export function updateCustomer(id, newName, newAddress, newSalary) {
    let customer = searchCustomer(id);
    if (customer) {
        customer.name = newName;
        customer.address = newAddress;
        customer.salary = parseFloat(newSalary);
        return true;
    }
    return false;
}

// Remove Customer
export function removeCustomer(id) {
    let index = customers.findIndex(customer => customer.id === id);
    if (index !== -1) {
        customers.splice(index, 1);
        return true;
    }
    return false;
}

// Validate Customer Fields
function validateCustomer(id, name, address, salary) {
    return id.trim() !== "" && name.trim() !== "" && address.trim() !== "" && !isNaN(salary) && salary > 0;
}

// Get All Customers
export function getAllCustomers() {
    return customers;
}
