console.log('ItemController.js is loaded.....');

import { items } from "./DB.js";
import { Item } from "./Item.js";

// === ITEM CONTROLLER ===

// Add Item
export function addItem(code, name, qty, price) {
    if (validateItem(code, name, qty, price)) {
        let item = new Item(code, name, qty, price);
        items.push(item);
        return true;
    }
    return false;
}

// Search Item by Code
export function searchItem(code) {
    return items.find(item => item.code === code);
}

// Update Item
export function updateItem(code, newName, newQty, newPrice) {
    let item = searchItem(code);
    if (item) {
        item.name = newName;
        item.qty = parseInt(newQty);
        item.price = parseFloat(newPrice);
        return true;
    }
    return false;
}

// Remove Item
export function removeItem(code) {
    let index = items.findIndex(item => item.code === code);
    if (index !== -1) {
        items.splice(index, 1);
        return true;
    }
    return false;
}

// Validate Item Fields
function validateItem(code, name, qty, price) {
    return code.trim() !== "" && name.trim() !== "" && !isNaN(qty) && qty > 0 && !isNaN(price) && price > 0;
}

// Get All Items
export function getAllItems() {
    return items;
}
