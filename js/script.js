import { addCustomer, searchCustomer, getAllCustomers, addItem, searchItem, getAllItems, addOrder } from "../controller/IndexController.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("script.js loaded.....");

    // Function to show the selected section and hide others
    function showSection(sectionId) {
        document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.remove("hidden");
        } else {
            console.error(`Section with ID '${sectionId}' not found.`);
        }
    }

    // Navigation bar event listeners
    const navHome = document.getElementById("nav-home");
    const navCustomer = document.getElementById("nav-customer");
    const navItem = document.getElementById("nav-item");
    const navOrders = document.getElementById("nav-orders");

    if (navHome) navHome.addEventListener("click", () => showSection("home-section"));
    if (navCustomer) navCustomer.addEventListener("click", () => showSection("customer-section"));
    if (navItem) navItem.addEventListener("click", () => showSection("item-section"));
    if (navOrders) navOrders.addEventListener("click", () => showSection("order-section"));

    // === CUSTOMER MANAGEMENT ===

    // Save Customer functionality
    const saveCustomerButton = document.getElementById("save-customer");
    if (saveCustomerButton) {
        saveCustomerButton.addEventListener("click", () => {
            const id = document.getElementById("customer-id").value.trim();
            const name = document.getElementById("customer-name").value.trim();
            const address = document.getElementById("customer-address").value.trim();
            const salary = document.getElementById("customer-salary").value.trim();

            const result = addCustomer(id, name, address, salary);

            if (result.success) {
                alert(result.message);
                updateCustomerTable();
                document.getElementById("customer-form").reset();
            } else {
                alert(result.message);
            }
        });
    } else {
        console.error("Element with ID 'save-customer' not found in the DOM.");
    }

    // Update Customer Table
    function updateCustomerTable() {
        const customerTableBody = document.getElementById("customer-table");
        if (!customerTableBody) {
            console.error("Element with ID 'customer-table' not found in the DOM.");
            return;
        }
        customerTableBody.innerHTML = "";

        const customers = getAllCustomers();
        customers.forEach(customer => {
            const row = `
                <tr>
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.address}</td>
                    <td>${customer.salary}</td>
                </tr>
            `;
            customerTableBody.innerHTML += row;
        });
    }

    // === ITEM MANAGEMENT ===

    // Save Item functionality
    const saveItemButton = document.getElementById("save-item");
    if (saveItemButton) {
        saveItemButton.addEventListener("click", () => {
            const code = document.getElementById("item-code").value.trim();
            const name = document.getElementById("item-name").value.trim();
            const qty = document.getElementById("item-qty").value.trim();
            const price = document.getElementById("item-price").value.trim();

            const result = addItem(code, name, qty, price);

            if (result.success) {
                alert(result.message);
                updateItemTable();
                document.getElementById("item-form").reset();
            } else {
                alert(result.message);
            }
        });
    } else {
        console.error("Element with ID 'save-item' not found in the DOM.");
    }

    // Update Item Table
    function updateItemTable() {
        const itemTableBody = document.getElementById("item-table");
        if (!itemTableBody) {
            console.error("Element with ID 'item-table' not found in the DOM.");
            return;
        }
        itemTableBody.innerHTML = "";

        const items = getAllItems();
        items.forEach(item => {
            const row = `
                <tr>
                    <td>${item.code}</td>
                    <td>${item.name}</td>
                    <td>${item.qty}</td>
                    <td>${item.price}</td>
                </tr>
            `;
            itemTableBody.innerHTML += row;
        });
    }

    // === ORDER MANAGEMENT ===

    // Add Item to Order functionality
    const addOrderItemButton = document.getElementById("add-order-item");
    if (addOrderItemButton) {
        addOrderItemButton.addEventListener("click", () => {
            const itemCode = document.getElementById("item-code").value.trim();
            const itemName = document.getElementById("item-name").value.trim();
            const price = document.getElementById("item-price").value.trim();
            const orderQty = document.getElementById("order-qty").value.trim();

            if (itemCode && itemName && price && orderQty) {
                const total = (parseFloat(price) * parseInt(orderQty)).toFixed(2);
                const row = `
                    <tr>
                        <td>${itemCode}</td>
                        <td>${itemName}</td>
                        <td>${price}</td>
                        <td>${orderQty}</td>
                        <td>${total}</td>
                    </tr>
                `;
                const orderTable = document.getElementById("order-table");
                if (orderTable) {
                    orderTable.innerHTML += row;
                    alert("Item added to order successfully!");
                    document.getElementById("item-code").value = "";
                    document.getElementById("item-name").value = "";
                    document.getElementById("item-price").value = "";
                    document.getElementById("order-qty").value = "";
                } else {
                    console.error("Element with ID 'order-table' not found in the DOM.");
                }
            } else {
                alert("Please fill all fields!");
            }
        });
    } else {
        console.error("Element with ID 'add-order-item' not found in the DOM.");
    }

    // Place Order functionality
    const placeOrderButton = document.getElementById("place-order");
    if (placeOrderButton) {
        placeOrderButton.addEventListener("click", () => {
            const customerId = document.getElementById("order-customer-id").value.trim();
            const orderTableRows = document.querySelectorAll("#order-table tr");
            if (!orderTableRows.length) {
                alert("No items in the order.");
                return;
            }

            const orderItems = Array.from(orderTableRows).map(row => {
                const cells = row.querySelectorAll("td");
                return {
                    itemCode: cells[0].textContent,
                    qty: parseInt(cells[3].textContent),
                    total: parseFloat(cells[4].textContent)
                };
            });

            const result = addOrder(customerId, orderItems);

            if (result.success) {
                alert(result.message);
                document.getElementById("order-table").innerHTML = "";
            } else {
                alert(result.message);
            }
        });
    } else {
        console.error("Element with ID 'place-order' not found in the DOM.");
    }
});