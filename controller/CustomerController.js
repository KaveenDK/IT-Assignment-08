console.log("CustomerController.js is loaded.....");

import { customers } from "../db/DB.js";
import { Customer } from "../model/Customer.js";

// === CUSTOMER CONTROLLER ===

// Add Customer
export function addCustomer(id, name, address, salary) {
    if (validateCustomer(id, name, address, salary)) {
        if (!searchCustomer(id)) {
            let customer = new Customer(id, name, address, salary);
            customers.push(customer);
            console.log("Customer added successfully:", customer);
            return { success: true, message: "Customer added successfully." };
        } else {
            return { success: false, message: "Customer ID already exists." };
        }
    } else {
        return { success: false, message: "Invalid customer data." };
    }
}

// Search Customer by ID
export function searchCustomer(id) {
    return customers.find(customer => customer.id === id);
}

// Update Customer
export function updateCustomer(id, newName, newAddress, newSalary) {
    if (validateCustomer(id, newName, newAddress, newSalary)) {
        let customer = searchCustomer(id);
        if (customer) {
            customer.name = newName;
            customer.address = newAddress;
            customer.salary = parseFloat(newSalary);
            console.log("Customer updated successfully:", customer);
            return { success: true, message: "Customer updated successfully." };
        } else {
            return { success: false, message: "Customer not found." };
        }
    } else {
        return { success: false, message: "Invalid customer data." };
    }
}

// Remove Customer
export function removeCustomer(id) {
    let index = customers.findIndex(customer => customer.id === id);
    if (index !== -1) {
        customers.splice(index, 1);
        console.log("Customer removed successfully:", id);
        return { success: true, message: "Customer removed successfully." };
    } else {
        return { success: false, message: "Customer not found." };
    }
}

// Get All Customers
export function getAllCustomers() {
    return customers;
}

// Validate Customer Fields
function validateCustomer(id, name, address, salary) {
    let isValid = true;

    if (!id || id.trim() === "") {
        console.error("Customer ID is required.");
        isValid = false;
    }
    if (!name || name.trim() === "") {
        console.error("Customer Name is required.");
        isValid = false;
    }
    if (!address || address.trim() === "") {
        console.error("Customer Address is required.");
        isValid = false;
    }
    if (!salary || isNaN(salary) || parseFloat(salary) <= 0) {
        console.error("Valid Customer Salary is required.");
        isValid = false;
    }

    return isValid;
}