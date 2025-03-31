import { addItem, removeItem, updateItem, getAllItems } from "../db/DB.js";
import { populateItemDropdown } from "./OrderController.js";
import { updateDashboard } from "./IndexController.js";

$(document).ready(() => {
    console.log("Item management script loaded...");

    // Function to render the item table
    function renderItemTable() {
        const $itemTableBody = $("#item-table");
        $itemTableBody.empty();

        const items = getAllItems();
        if (items.length === 0) {
            $itemTableBody.append("<tr><td colspan='5' class='text-center'>No items found</td></tr>");
            return;
        }

        items.forEach((item) => {
            const row = `
                <tr>
                    <td>${item.code}</td>
                    <td>${item.name}</td>
                    <td>${item.qty}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td class="text-center">
                        <button class="btn btn-warning btn-sm edit-item" data-code="${item.code}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-item" data-code="${item.code}">Delete</button>
                    </td>
                </tr>
            `;
            $itemTableBody.append(row);
        });
    }

    // Add Item
    $("#save-item").on("click", () => {
        const code = $("#item-code").val().trim();
        const name = $("#item-name").val().trim();
        const qty = $("#item-qty").val().trim();
        const price = $("#item-price").val().trim();

        if (validateItemForm(code, name, qty, price)) {
            const result = addItem(code, name, qty, price);
            if (result.success) {
                alert(result.message);
                renderItemTable();
                populateItemDropdown(); // Refresh the dropdown
                clearItemForm();
                updateDashboard(); // Update the dashboard after adding an item
            } else {
                alert(result.message);
            }
        }
    });

    // Delete Item
    $("#item-table").on("click", ".delete-item", function () {
        const code = $(this).data("code");
        const result = removeItem(code);
        if (result.success) {
            alert(result.message);
            renderItemTable();
            populateItemDropdown(); // Refresh the dropdown
            updateDashboard(); // Update the dashboard after deleting an item
        } else {
            alert(result.message);
        }
    });

    // Edit Item
    $("#item-table").on("click", ".edit-item", function () {
        const code = $(this).data("code");
        const item = getAllItems().find((i) => i.code === code);
        if (item) {
            $("#item-code").val(item.code).prop("disabled", true);
            $("#item-name").val(item.name);
            $("#item-qty").val(item.qty);
            $("#item-price").val(item.price);
            $("#update-item").show();
            $("#save-item").hide();
        }
    });

    // Update Item
    $("#update-item").on("click", () => {
        const code = $("#item-code").val().trim();
        const name = $("#item-name").val().trim();
        const qty = $("#item-qty").val().trim();
        const price = $("#item-price").val().trim();

        if (validateItemForm(code, name, qty, price)) {
            const result = updateItem(code, name, qty, price);
            if (result.success) {
                alert(result.message);
                renderItemTable();
                populateItemDropdown(); // Refresh the dropdown
                clearItemForm();
                updateDashboard(); // Update the dashboard after updating an item
            } else {
                alert(result.message);
            }
        }
    });

    // Clear Form
    $("#clear-all-items").on("click", () => {
        clearItemForm();
    });

    // Function to clear the item form
    function clearItemForm() {
        $("#item-code").val("").prop("disabled", false);
        $("#item-name").val("");
        $("#item-qty").val("");
        $("#item-price").val("");
        $("#update-item").hide();
        $("#save-item").show();
        $(".error").text("");
        $(".form-control").removeClass("is-invalid");
    }

    // Function to validate item form fields
    function validateItemForm(code, name, qty, price) {
        let isValid = true;

        // Validate Item Code
        if (!/^I\d{2}-\d{3}$/.test(code)) {
            $("#item-code-error").text("Item Code is required (Pattern: I00-000)");
            $("#item-code").addClass("is-invalid");
            isValid = false;
        } else {
            $("#item-code-error").text("");
            $("#item-code").removeClass("is-invalid");
        }

        // Validate Item Name
        if (!/^.{3,50}$/.test(name)) {
            $("#item-name-error").text("Item Name must be 3-50 characters long.");
            $("#item-name").addClass("is-invalid");
            isValid = false;
        } else {
            $("#item-name-error").text("");
            $("#item-name").removeClass("is-invalid");
        }

        // Validate Item Quantity
        if (!/^\d+$/.test(qty) || parseInt(qty) <= 0) {
            $("#item-qty-error").text("Item Quantity must be a positive number.");
            $("#item-qty").addClass("is-invalid");
            isValid = false;
        } else {
            $("#item-qty-error").text("");
            $("#item-qty").removeClass("is-invalid");
        }

        // Validate Item Price
        if (!/^\d+(\.\d{2})?$/.test(price) || parseFloat(price) <= 0) {
            $("#item-price-error").text("Item Price must be a valid number (e.g., 100.00).");
            $("#item-price").addClass("is-invalid");
            isValid = false;
        } else {
            $("#item-price-error").text("");
            $("#item-price").removeClass("is-invalid");
        }

        return isValid;
    }

    // Dynamic validation for form fields
    $("#item-code").on("input", function () {
        const code = $(this).val().trim();
        if (/^I\d{2}-\d{3}$/.test(code)) {
            $("#item-code-error").text("");
            $(this).removeClass("is-invalid");
        }
    });

    $("#item-name").on("input", function () {
        const name = $(this).val().trim();
        if (/^.{3,50}$/.test(name)) {
            $("#item-name-error").text("");
            $(this).removeClass("is-invalid");
        }
    });

    $("#item-qty").on("input", function () {
        const qty = $(this).val().trim();
        if (/^\d+$/.test(qty) && parseInt(qty) > 0) {
            $("#item-qty-error").text("");
            $(this).removeClass("is-invalid");
        }
    });

    $("#item-price").on("input", function () {
        const price = $(this).val().trim();
        if (/^\d+(\.\d{2})?$/.test(price) && parseFloat(price) > 0) {
            $("#item-price-error").text("");
            $(this).removeClass("is-invalid");
        }
    });

    // Initial Render
    renderItemTable();
    clearItemForm();
});