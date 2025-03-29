console.log("indexController.js is loaded.....");

import { addCustomer, searchCustomer, getAllCustomers, removeCustomer, updateCustomer } from "./CustomerController.js";

// === UI INTERACTIONS ===

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