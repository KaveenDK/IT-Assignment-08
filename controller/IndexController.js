console.log("indexController.js is loaded.....");

import {
    addCustomer,
    searchCustomer,
    getAllCustomers,
    removeCustomer,
    updateCustomer,
} from "./CustomerController.js";

import {
    addItem,
    searchItem,
    getAllItems,
    removeItem,
    updateItem,
    validateItemForm,
} from "./ItemController.js";

import {
    generateOrderId,
    addOrder,
    calculateTotal,
    getAllOrders,
} from "./OrderController.js";

import { OrderDetails } from "../model/OrderDetails.js";

// === CUSTOMER MANAGEMENT ===

// Save Customer
document.getElementById("save-customer").addEventListener("click", () => {
    const id = document.getElementById("customer-id").value.trim();
    const name = document.getElementById("customer-name").value.trim();
    const address = document.getElementById("customer-address").value.trim();
    const salary = document.getElementById("customer-salary").value.trim();

    if (validateCustomerForm()) {
        const result = addCustomer(id, name, address, salary);
        if (result.success) {
            alert(result.message);
            updateCustomerTable();
            clearCustomerForm();
            populateCustomerDropdown();
        } else {
            alert(result.message);
        }
    }
});

// Remove Customer
document.getElementById("remove-customer").addEventListener("click", () => {
    const id = document.getElementById("customer-id").value.trim();

    if (!id) {
        alert("Please enter a Customer ID to remove.");
        return;
    }

    const result = removeCustomer(id);
    if (result.success) {
        alert(result.message);
        updateCustomerTable();
        clearCustomerForm();
    } else {
        alert(result.message);
    }
});

// Update Customer
document.getElementById("update-customer").addEventListener("click", () => {
    const id = document.getElementById("customer-id").value.trim();
    const name = document.getElementById("customer-name").value.trim();
    const address = document.getElementById("customer-address").value.trim();
    const salary = document.getElementById("customer-salary").value.trim();

    if (!id) {
        alert("Please enter a Customer ID to update.");
        return;
    }

    if (validateCustomerForm()) {
        const result = updateCustomer(id, name, address, salary);
        if (result.success) {
            alert(result.message);
            updateCustomerTable();
            clearCustomerForm();
        } else {
            alert(result.message);
        }
    }
});

// Get All Customers
document.getElementById("get-all-customers").addEventListener("click", () => {
    updateCustomerTable();
});

// Clear All Fields
document.getElementById("clear-all-fields").addEventListener("click", () => {
    clearCustomerForm();
});

// Add Input Event Listeners for Dynamic Validation
document.getElementById("customer-id").addEventListener("input", validateCustomerForm);
document.getElementById("customer-name").addEventListener("input", validateCustomerForm);
document.getElementById("customer-address").addEventListener("input", validateCustomerForm);
document.getElementById("customer-salary").addEventListener("input", validateCustomerForm);

// Update Customer Table
function updateCustomerTable() {
    const customerTableBody = document.getElementById("customer-table");
    customerTableBody.innerHTML = ""; // Clear existing rows

    const customers = getAllCustomers();
    customers.forEach((customer) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.address}</td>
            <td>${customer.salary}</td>
        `;

        // Add click event listener to populate form fields
        row.addEventListener("click", () => {
            document.getElementById("customer-id").value = customer.id;
            document.getElementById("customer-name").value = customer.name;
            document.getElementById("customer-address").value = customer.address;
            document.getElementById("customer-salary").value = customer.salary;

            // Clear any existing error messages
            document.getElementById("customer-id-error").textContent = "";
            document.getElementById("customer-name-error").textContent = "";
            document.getElementById("customer-address-error").textContent = "";
            document.getElementById("customer-salary-error").textContent = "";

            // Remove 'is-invalid' class from fields
            document.getElementById("customer-id").classList.remove("is-invalid");
            document.getElementById("customer-name").classList.remove("is-invalid");
            document.getElementById("customer-address").classList.remove("is-invalid");
            document.getElementById("customer-salary").classList.remove("is-invalid");

            // Enable the "Save" button
            document.getElementById("save-customer").disabled = false;

            console.log(`Row clicked: ${customer.id}`);
        });

        customerTableBody.appendChild(row);
    });
}

// Clear Customer Form
function clearCustomerForm() {
    document.getElementById("customer-id").value = "";
    document.getElementById("customer-name").value = "";
    document.getElementById("customer-address").value = "";
    document.getElementById("customer-salary").value = "";
    document.getElementById("customer-id-error").textContent = "";
    document.getElementById("customer-name-error").textContent = "";
    document.getElementById("customer-address-error").textContent = "";
    document.getElementById("customer-salary-error").textContent = "";
}

// Validate Customer Form Fields
function validateCustomerForm() {
    const id = document.getElementById("customer-id").value.trim();
    const name = document.getElementById("customer-name").value.trim();
    const address = document.getElementById("customer-address").value.trim();
    const salary = document.getElementById("customer-salary").value.trim();

    let isValid = true;

    // Validate Customer ID
    if (!/^C\d{2}-\d{3}$/.test(id)) {
        document.getElementById("customer-id-error").textContent =
            "Cus ID is a required field - Pattern: C00-000";
        document.getElementById("customer-id").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("customer-id-error").textContent = "";
        document.getElementById("customer-id").classList.remove("is-invalid");
    }

    // Validate Customer Name
    if (!/^.{5,20}$/.test(name)) {
        document.getElementById("customer-name-error").textContent =
            "Cus Name is a required field: Minimum 5, Max 20, Space Allowed";
        document.getElementById("customer-name").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("customer-name-error").textContent = "";
        document.getElementById("customer-name").classList.remove("is-invalid");
    }

    // Validate Customer Address
    if (!/^.{7,}$/.test(address)) {
        document.getElementById("customer-address-error").textContent =
            "Cus Address is a required field: Minimum 7 characters";
        document.getElementById("customer-address").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("customer-address-error").textContent = "";
        document.getElementById("customer-address").classList.remove("is-invalid");
    }

    // Validate Customer Salary
    if (!/^\d+(\.\d{2})?$/.test(salary)) {
        document.getElementById("customer-salary-error").textContent =
            "Cus Salary is a required field: Pattern 100.00 or 100";
        document.getElementById("customer-salary").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("customer-salary-error").textContent = "";
        document.getElementById("customer-salary").classList.remove("is-invalid");
    }

    // Enable/Disable Save Button
    document.getElementById("save-customer").disabled = !isValid;

    return isValid;
}

// === ITEM MANAGEMENT ===

// Save Item
document.getElementById("save-item").addEventListener("click", () => {
    const code = document.getElementById("item-code").value.trim();
    const name = document.getElementById("item-name").value.trim();
    const qty = document.getElementById("item-qty").value.trim();
    const price = document.getElementById("item-price").value.trim();

    if (validateItemForm()) {
        const result = addItem(code, name, qty, price);
        if (result.success) {
            alert(result.message);
            updateItemTable();
            clearItemForm();
            populateItemDropdown();
        } else {
            alert(result.message);
        }
    }
});

// Remove Item
document.getElementById("remove-item").addEventListener("click", () => {
    const code = document.getElementById("item-code").value.trim();

    if (!code) {
        alert("Please enter an Item Code to remove.");
        return;
    }

    const result = removeItem(code);
    if (result.success) {
        alert(result.message);
        updateItemTable();
        clearItemForm();
    } else {
        alert(result.message);
    }
});

// Update Item
document.getElementById("update-item").addEventListener("click", () => {
    const code = document.getElementById("item-code").value.trim();
    const name = document.getElementById("item-name").value.trim();
    const qty = document.getElementById("item-qty").value.trim();
    const price = document.getElementById("item-price").value.trim();

    if (!code) {
        alert("Please enter an Item Code to update.");
        return;
    }

    if (validateItemForm()) {
        const result = updateItem(code, name, qty, price);
        if (result.success) {
            alert(result.message);
            updateItemTable();
            clearItemForm();
        } else {
            alert(result.message);
        }
    }
});

// Get All Items
document.getElementById("get-all-items").addEventListener("click", () => {
    updateItemTable();
});

// Clear All Item Fields
document.getElementById("clear-all-items").addEventListener("click", () => {
    clearItemForm();
});

// Update Item Table
function updateItemTable() {
    const itemTableBody = document.getElementById("item-table");
    itemTableBody.innerHTML = "";

    const items = getAllItems();
    items.forEach((item) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>${item.price}</td>
        `;

        // Add click event listener to populate form fields
        row.addEventListener("click", () => {
            document.getElementById("item-code").value = item.code;
            document.getElementById("item-name").value = item.name;
            document.getElementById("item-qty").value = item.qty;
            document.getElementById("item-price").value = item.price;

            // Clear any existing error messages
            document.getElementById("item-code-error").textContent = "";
            document.getElementById("item-name-error").textContent = "";
            document.getElementById("item-qty-error").textContent = "";
            document.getElementById("item-price-error").textContent = "";

            // Remove 'is-invalid' class from fields
            document.getElementById("item-code").classList.remove("is-invalid");
            document.getElementById("item-name").classList.remove("is-invalid");
            document.getElementById("item-qty").classList.remove("is-invalid");
            document.getElementById("item-price").classList.remove("is-invalid");

            // Enable the "Save" button
            document.getElementById("save-item").disabled = false;

            console.log(`Row clicked: ${item.code}`);
        });

        itemTableBody.appendChild(row);
    });
}

// Clear Item Form
function clearItemForm() {
    document.getElementById("item-code").value = "";
    document.getElementById("item-name").value = "";
    document.getElementById("item-qty").value = "";
    document.getElementById("item-price").value = "";
    document.getElementById("item-code-error").textContent = "";
    document.getElementById("item-name-error").textContent = "";
    document.getElementById("item-qty-error").textContent = "";
    document.getElementById("item-price-error").textContent = "";
}

// === ORDER MANAGEMENT ===

// Populate Customer Dropdown
function populateCustomerDropdown() {
    const customerDropdown = document.getElementById("order-customer-id");
    customerDropdown.innerHTML = `<option>Select Customer</option>`;

    const customers = getAllCustomers();
    customers.forEach((customer) => {
        const option = document.createElement("option");
        option.value = customer.id;
        option.textContent = `${customer.id} - ${customer.name}`;
        customerDropdown.appendChild(option);
    });
}

// Populate Item Dropdown
function populateItemDropdown() {
    const itemDropdown = document.getElementById("item-code");
    if (!itemDropdown) {
        console.error("Item dropdown not found!");
        return;
    }

    // Clear existing options
    itemDropdown.innerHTML = `<option>Select Item Code</option>`;

    // Fetch all items
    const items = getAllItems();
    console.log("Items in populateItemDropdown:", items);

    // Populate dropdown with items
    items.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.code;
        option.textContent = `${item.code} - ${item.name}`;
        console.log("Appending Option:", option);
        itemDropdown.appendChild(option);
    });
}

// Handle Customer Selection
document.getElementById("order-customer-id").addEventListener("change", () => {
    const customerId = document.getElementById("order-customer-id").value;
    const customer = searchCustomer(customerId);

    if (customer) {
        // Populate the Name and Address fields
        document.getElementById("customer-name").value = customer.name;
        document.getElementById("customer-address").value = customer.address;
    } else {
        // Clear the fields if no customer is found
        document.getElementById("customer-name").value = "";
        document.getElementById("customer-address").value = "";
    }
});

// Handle Item Selection
document.getElementById("item-code").addEventListener("change", () => {
    const itemCode = document.getElementById("item-code").value;
    const item = searchItem(itemCode);

    if (item) {
        document.getElementById("item-name").value = item.name;
        document.getElementById("item-price").value = item.price;
    } else {
        document.getElementById("item-name").value = "";
        document.getElementById("item-price").value = "";
    }
});

// Add Item to Order Table
document.getElementById("add-order-item").addEventListener("click", () => {
    const itemCode = document.getElementById("item-code").value;
    const itemName = document.getElementById("item-name").value;
    const itemPrice = parseFloat(document.getElementById("item-price").value);
    const orderQty = parseInt(document.getElementById("order-qty").value);

    if (!itemCode || !itemName || isNaN(itemPrice) || isNaN(orderQty) || orderQty <= 0) {
        alert("Please select a valid item and enter a valid quantity.");
        return;
    }

    const item = searchItem(itemCode);
    if (item && orderQty > item.qty) {
        alert("Insufficient stock for the selected item.");
        return;
    }

    const orderTable = document.getElementById("order-table");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${itemCode}</td>
        <td>${itemName}</td>
        <td>${itemPrice.toFixed(2)}</td>
        <td>${orderQty}</td>
        <td>${(itemPrice * orderQty).toFixed(2)}</td>
    `;

    orderTable.appendChild(row);

    updateOrderSummary();
    clearItemSelection();
});

// Update Order Summary
function updateOrderSummary() {
    const orderTable = document.getElementById("order-table");
    const rows = orderTable.querySelectorAll("tr");

    let total = 0;
    rows.forEach((row) => {
        const subTotal = parseFloat(row.cells[4].textContent);
        total += subTotal;
    });

    document.getElementById("order-total").textContent = `${total.toFixed(2)}Rs/=`;
    document.getElementById("order-subtotal").textContent = `${total.toFixed(2)}Rs/=`;
}

// Clear Item Selection
function clearItemSelection() {
    document.getElementById("item-code").value = "";
    document.getElementById("item-name").value = "";
    document.getElementById("item-price").value = "";
    document.getElementById("order-qty").value = "";
}

// Place Order
document.getElementById("place-order").addEventListener("click", () => {
    const customerId = document.getElementById("order-customer-id").value;
    const orderTable = document.getElementById("order-table");
    const rows = orderTable.querySelectorAll("tr");
    console.log("Customer ID:", customerId);
    console.log("Order Rows:", rows);
    const discount = parseFloat(document.getElementById("discount").value) || 0;
    const cash = parseFloat(document.getElementById("cash").value) || 0;

    if (!customerId || rows.length === 0) {
        alert("Please select a customer and add items to the order.");
        return;
    }

    const orderDetails = [];
    rows.forEach((row) => {
        const itemCode = row.cells[0].textContent;
        const itemName = row.cells[1].textContent;
        const qty = parseInt(row.cells[3].textContent);
        const unitPrice = parseFloat(row.cells[2].textContent);
        orderDetails.push(new OrderDetails(itemCode, itemName, qty, unitPrice));
    });

    console.log("Order Details:", orderDetails);
    const total = calculateTotal(orderDetails, discount);
    if (cash < total) {
        alert("Insufficient cash to complete the purchase.");
        return;
    }

    const orderId = addOrder(customerId, orderDetails, discount);
    if (orderId) {
        alert(`Order placed successfully! Order ID: ${orderId}`);
        clearOrderForm();
    } else {
        alert("Failed to place the order. Please try again.");
    }
});

// Clear Order Form
function clearOrderForm() {
    document.getElementById("order-id").value = generateOrderId();
    document.getElementById("order-date").value = "";
    document.getElementById("order-customer-id").value = "";
    document.getElementById("customer-name").value = "";
    document.getElementById("customer-address").value = "";
    document.getElementById("item-code").value = "";
    document.getElementById("item-name").value = "";
    document.getElementById("item-price").value = "";
    document.getElementById("order-qty").value = "";
    document.getElementById("cash").value = "";
    document.getElementById("discount").value = "";
    document.getElementById("balance").value = "";
    document.getElementById("order-total").textContent = "00.00Rs/=";
    document.getElementById("order-subtotal").textContent = "00.00Rs/=";
    document.getElementById("order-table").innerHTML = "";
}

// Initialize Order Form
function initializeOrderForm() {
    document.getElementById("order-id").value = generateOrderId();
    populateCustomerDropdown();
    populateItemDropdown();
}

// Call initializeOrderForm when the page loads
initializeOrderForm();