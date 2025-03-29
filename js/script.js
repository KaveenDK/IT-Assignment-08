console.log("script.js loaded.....");

// Function to show the selected section and hide others
function showSection(sectionId) {
    document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(sectionId).classList.remove("hidden");
}

// Navigation bar event listeners
document.getElementById("nav-home").addEventListener("click", () => showSection("home-section"));
document.getElementById("nav-customer").addEventListener("click", () => showSection("customer-section"));
document.getElementById("nav-item").addEventListener("click", () => showSection("item-section"));
document.getElementById("nav-orders").addEventListener("click", () => showSection("order-section"));

// Save Customer functionality
document.getElementById("save-customer").addEventListener("click", () => {
    let id = document.getElementById("customer-id").value.trim();
    let name = document.getElementById("customer-name").value.trim();
    let address = document.getElementById("customer-address").value.trim();
    let salary = document.getElementById("customer-salary").value.trim();

    if (id && name && address && salary) {
        let row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`;
        document.getElementById("customer-table").innerHTML += row;
        alert("Customer added successfully!");
        document.getElementById("customer-form").reset();
    } else {
        alert("Please fill all fields!");
    }
});

// Save Item functionality
document.getElementById("save-item").addEventListener("click", () => {
    let code = document.getElementById("item-code").value.trim();
    let name = document.getElementById("item-name").value.trim();
    let qty = document.getElementById("item-qty").value.trim();
    let price = document.getElementById("item-price").value.trim();

    if (code && name && qty && price) {
        let row = `<tr><td>${code}</td><td>${name}</td><td>${qty}</td><td>${price}</td></tr>`;
        document.getElementById("item-table").innerHTML += row;
        alert("Item added successfully!");
        document.getElementById("item-form").reset();
    } else {
        alert("Please fill all fields!");
    }
});

// Add Item to Order functionality
document.getElementById("add-order-item").addEventListener("click", () => {
    let itemCode = document.getElementById("item-code").value.trim();
    let itemName = document.getElementById("item-name").value.trim();
    let price = document.getElementById("item-price").value.trim();
    let orderQty = document.getElementById("order-qty").value.trim();

    if (itemCode && itemName && price && orderQty) {
        let total = (parseFloat(price) * parseInt(orderQty)).toFixed(2);
        let row = `<tr><td>${itemCode}</td><td>${itemName}</td><td>${price}</td><td>${orderQty}</td><td>${total}</td></tr>`;
        document.getElementById("order-table").innerHTML += row;
        alert("Item added to order successfully!");
        document.getElementById("item-code").value = "";
        document.getElementById("item-name").value = "";
        document.getElementById("item-price").value = "";
        document.getElementById("order-qty").value = "";
    } else {
        alert("Please fill all fields!");
    }
});

// Place Order functionality
document.getElementById("place-order").addEventListener("click", () => {
    alert("Order placed successfully!");
    document.getElementById("order-table").innerHTML = "";
});