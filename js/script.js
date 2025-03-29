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

    if (navHome) {
        navHome.addEventListener("click", () => {
            document.title = "Dashboard";
            showSection("home-section");
        });
    }

    if (navCustomer) {
        navCustomer.addEventListener("click", () => {
            document.title = "Customer Manage";
            showSection("customer-section");
        });
    }

    if (navItem) {
        navItem.addEventListener("click", () => {
            document.title = "Item Manage";
            showSection("item-section");
        });
    }

    if (navOrders) {
        navOrders.addEventListener("click", () => {
            document.title = "Order Manage";
            showSection("order-section");
        });
    }
});