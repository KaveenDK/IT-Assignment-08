console.log("script.js loaded.....");

function showSection(sectionId) {
    document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(sectionId).classList.remove("hidden");
}

document.getElementById("nav-home").addEventListener("click", () => showSection("home-section"));
document.getElementById("nav-customer").addEventListener("click", () => showSection("customer-section"));
document.getElementById("nav-item").addEventListener("click", () => showSection("item-section"));
document.getElementById("nav-orders").addEventListener("click", () => showSection("order-section"));

document.getElementById("save-customer").addEventListener("click", () => {
    let id = document.getElementById("customer-id").value;
    let name = document.getElementById("customer-name").value;
    let address = document.getElementById("customer-address").value;
    let salary = document.getElementById("customer-salary").value;

    if (id && name && address && salary) {
        let row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`;
        document.getElementById("customer-table").innerHTML += row;
        alert("Customer added successfully!");
    } else {
        alert("Please fill all fields!");
    }
});

document.getElementById("save-item").addEventListener("click", () => {
    let code = document.getElementById("item-code").value;
    let name = document.getElementById("item-name").value;
    let qty = document.getElementById("item-qty").value;
    let price = document.getElementById("item-price").value;

    if (code && name && qty && price) {
        let row = `<tr><td>${code}</td><td>${name}</td><td>${qty}</td><td>${price}</td></tr>`;
        document.getElementById("item-table").innerHTML += row;
        alert("Item added successfully!");
    } else {
        alert("Please fill all fields!");
    }
});

document.getElementById("place-order").addEventListener("click", () => {
    alert("Order placed successfully!");
});
