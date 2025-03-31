import { addCustomer, removeCustomer, updateCustomer, getAllCustomers } from "../db/DB.js";

$(document).ready(() => {
    console.log("Customer management script loaded...");

    // Function to render the customer table
    function renderCustomerTable() {
        const $customerTableBody = $("#customer-table");
        $customerTableBody.empty();

        const customers = getAllCustomers();
        if (customers.length === 0) {
            $customerTableBody.append("<tr><td colspan='5' class='text-center'>No customers found</td></tr>");
            return;
        }

        customers.forEach((customer) => {
            const row = `
                <tr>
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.address}</td>
                    <td>${customer.salary.toFixed(2)}</td>
                    <td class="text-center">
                        <button class="btn btn-warning btn-sm edit-customer" data-id="${customer.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-customer" data-id="${customer.id}">Delete</button>
                    </td>
                </tr>
            `;
            $customerTableBody.append(row);
        });
    }

    // Add Customer
    $("#save-customer").on("click", () => {
        const id = $("#customer-id").val().trim();
        const name = $("#customer-name").val().trim();
        const address = $("#customer-address").val().trim();
        const salary = $("#customer-salary").val().trim();

        if (validateCustomerForm(id, name, address, salary)) {
            const result = addCustomer(id, name, address, salary);
            if (result.success) {
                alert(result.message);
                renderCustomerTable();
                clearCustomerForm();
            } else {
                alert(result.message);
            }
        }
    });

    // Delete Customer
    $("#customer-table").on("click", ".delete-customer", function () {
        const id = $(this).data("id");
        const result = removeCustomer(id);
        if (result.success) {
            alert(result.message);
            renderCustomerTable();
        } else {
            alert(result.message);
        }
    });

    // Edit Customer
    $("#customer-table").on("click", ".edit-customer", function () {
        const id = $(this).data("id");
        const customer = getAllCustomers().find((c) => c.id === id);
        if (customer) {
            $("#customer-id").val(customer.id).prop("disabled", true);
            $("#customer-name").val(customer.name);
            $("#customer-address").val(customer.address);
            $("#customer-salary").val(customer.salary);
            $("#update-customer").show();
            $("#save-customer").hide();
        }
    });

    // Update Customer
    $("#update-customer").on("click", () => {
        const id = $("#customer-id").val().trim();
        const name = $("#customer-name").val().trim();
        const address = $("#customer-address").val().trim();
        const salary = $("#customer-salary").val().trim();

        if (validateCustomerForm(id, name, address, salary)) {
            const result = updateCustomer(id, name, address, salary);
            if (result.success) {
                alert(result.message);
                renderCustomerTable();
                clearCustomerForm();
            } else {
                alert(result.message);
            }
        }
    });

    // Clear Form
    $("#clear-all-fields").on("click", () => {
        clearCustomerForm();
    });

    // Function to clear the customer form
    function clearCustomerForm() {
        $("#customer-id").val("").prop("disabled", false);
        $("#customer-name").val("");
        $("#customer-address").val("");
        $("#customer-salary").val("");
        $("#update-customer").hide();
        $("#save-customer").show();
        $(".error").text("");
        $(".form-control").removeClass("is-invalid");
    }

    // Function to validate customer form fields
    function validateCustomerForm(id, name, address, salary) {
        let isValid = true;

        // Validate Customer ID
        if (!/^C\d{2}-\d{3}$/.test(id)) {
            $("#customer-id-error").text("Customer ID is required (Pattern: C00-000)");
            $("#customer-id").addClass("is-invalid");
            isValid = false;
        } else {
            $("#customer-id-error").text("");
            $("#customer-id").removeClass("is-invalid");
        }

        // Validate Customer Name
        if (!/^.{5,20}$/.test(name)) {
            $("#customer-name-error").text("Customer Name must be 5-20 characters long.");
            $("#customer-name").addClass("is-invalid");
            isValid = false;
        } else {
            $("#customer-name-error").text("");
            $("#customer-name").removeClass("is-invalid");
        }

        // Validate Customer Address
        if (!/^.{7,}$/.test(address)) {
            $("#customer-address-error").text("Customer Address must be at least 7 characters long.");
            $("#customer-address").addClass("is-invalid");
            isValid = false;
        } else {
            $("#customer-address-error").text("");
            $("#customer-address").removeClass("is-invalid");
        }

        // Validate Customer Salary
        if (!/^\d+(\.\d{2})?$/.test(salary)) {
            $("#customer-salary-error").text("Customer Salary must be a valid number (e.g., 100.00).");
            $("#customer-salary").addClass("is-invalid");
            isValid = false;
        } else {
            $("#customer-salary-error").text("");
            $("#customer-salary").removeClass("is-invalid");
        }

        return isValid;
    }

    // Dynamic validation for form fields
    $("#customer-id").on("input", function () {
        const id = $(this).val().trim();
        if (/^C\d{2}-\d{3}$/.test(id)) {
            $("#customer-id-error").text("");
            $(this).removeClass("is-invalid");
        }
    });

    $("#customer-name").on("input", function () {
        const name = $(this).val().trim();
        if (/^.{5,20}$/.test(name)) {
            $("#customer-name-error").text("");
            $(this).removeClass("is-invalid");
        }
    });

    $("#customer-address").on("input", function () {
        const address = $(this).val().trim();
        if (/^.{7,}$/.test(address)) {
            $("#customer-address-error").text("");
            $(this).removeClass("is-invalid");
        }
    });

    $("#customer-salary").on("input", function () {
        const salary = $(this).val().trim();
        if (/^\d+(\.\d{2})?$/.test(salary)) {
            $("#customer-salary-error").text("");
            $(this).removeClass("is-invalid");
        }
    });

    // Initial Render
    renderCustomerTable();
    clearCustomerForm();
});