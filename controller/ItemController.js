console.log("ItemController.js is loaded.....");

import { Item } from "../model/Item.js";
import { items } from "../db/DB.js";

// === ITEM CONTROLLER ===

// Add Item
export function addItem(code, name, qty, price) {
    if (validateItemForm()) {
        if (!searchItem(code)) {
            const newItem = new Item(code, name, qty, price);
            items.push(newItem);
            console.log("Item added successfully:", newItem);
            return { success: true, message: "Item added successfully." };
        } else {
            return { success: false, message: "Item Code already exists." };
        }
    } else {
        return { success: false, message: "Invalid item data." };
    }
}

// Search Item by Code
export function searchItem(code) {
    return items.find(item => item.code === code);
}

// Update Item
export function updateItem(code, newName, newQty, newPrice) {
    const item = searchItem(code);
    if (item) {
        if (validateItemForm()) {
            item.name = newName;
            item.qty = parseInt(newQty);
            item.price = parseFloat(newPrice);
            console.log("Item updated successfully:", item);
            return { success: true, message: "Item updated successfully." };
        } else {
            return { success: false, message: "Invalid item data." };
        }
    } else {
        return { success: false, message: "Item not found." };
    }
}

// Remove Item
export function removeItem(code) {
    const index = items.findIndex(item => item.code === code);
    if (index !== -1) {
        items.splice(index, 1);
        console.log("Item removed successfully:", code);
        return { success: true, message: "Item removed successfully." };
    } else {
        return { success: false, message: "Item not found." };
    }
}

// Get All Items
export function getAllItems() {
    return items;
}

// Validate Item Form Fields
export function validateItemForm() {
    const code = document.getElementById("item-code").value.trim();
    const name = document.getElementById("item-name").value.trim();
    const qty = document.getElementById("item-qty").value.trim();
    const price = document.getElementById("item-price").value.trim();

    let isValid = true;

    // Validate Item Code
    if (!/^I\d{2}-\d{3}$/.test(code)) {
        document.getElementById("item-code-error").textContent =
            "Item Code is a required field - Pattern: I00-000";
        document.getElementById("item-code").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("item-code-error").textContent = "";
        document.getElementById("item-code").classList.remove("is-invalid");
    }

    // Validate Item Name
    if (!/^.{3,50}$/.test(name)) {
        document.getElementById("item-name-error").textContent =
            "Item Name is a required field: Minimum 3, Max 50 characters";
        document.getElementById("item-name").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("item-name-error").textContent = "";
        document.getElementById("item-name").classList.remove("is-invalid");
    }

    // Validate Item Qty
    if (!/^\d+$/.test(qty) || parseInt(qty) <= 0) {
        document.getElementById("item-qty-error").textContent =
            "Item Qty is a required field: Must be a positive number";
        document.getElementById("item-qty").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("item-qty-error").textContent = "";
        document.getElementById("item-qty").classList.remove("is-invalid");
    }

    // Validate Item Price
    if (!/^\d+(\.\d{2})?$/.test(price) || parseFloat(price) <= 0) {
        document.getElementById("item-price-error").textContent =
            "Item Price is a required field: Pattern 100.00 or 100";
        document.getElementById("item-price").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("item-price-error").textContent = "";
        document.getElementById("item-price").classList.remove("is-invalid");
    }

    return isValid;
}