console.log("CustomerController.js is loaded.....");

import { customers } from "../db/DB.js";
import { Customer } from "../model/Customer.js";

// Add Customer
export function addCustomer(id, name, address, salary) {
    if (validateCustomer(id, name, address, salary)) {
        if (!searchCustomer(id)) {
            const newCustomer = new Customer(id, name, address, salary);
            customers.push(newCustomer);
            console.log("Customer added successfully:", newCustomer);
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

// Remove Customer
export function removeCustomer(id) {
    const index = customers.findIndex(customer => customer.id === id);
    if (index !== -1) {
        customers.splice(index, 1);
        console.log("Customer removed successfully:", id);
        return { success: true, message: "Customer removed successfully." };
    } else {
        return { success: false, message: "Customer not found." };
    }
}

// Update Customer
export function updateCustomer(id, newName, newAddress, newSalary) {
    const customer = searchCustomer(id);
    if (customer) {
        if (validateCustomer(id, newName, newAddress, newSalary)) {
            customer.name = newName;
            customer.address = newAddress;
            customer.salary = parseFloat(newSalary);
            console.log("Customer updated successfully:", customer);
            return { success: true, message: "Customer updated successfully." };
        } else {
            return { success: false, message: "Invalid customer data." };
        }
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
    return (
        /^C\d{2}-\d{3}$/.test(id) &&
        /^.{5,20}$/.test(name) &&
        /^.{7,}$/.test(address) &&
        /^\d+(\.\d{2})?$/.test(salary)
    );
}