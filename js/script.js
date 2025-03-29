document.addEventListener("DOMContentLoaded", () => {
    console.log("script.js loaded.....");

    // Function to show the selected section and hide others
    function showSection(sectionId) {
        console.log(`Attempting to show section: ${sectionId}`);
        document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.remove("hidden");
            console.log(`Section ${sectionId} is now visible.`);
        } else {
            console.error(`Section with ID '${sectionId}' not found.`);
        }
    }

    // Function to update the navigation bar title
    function updateNavBarTitle(title) {
        const navBarTitle = document.querySelector(".navbar-brand");
        if (navBarTitle) {
            navBarTitle.textContent = title;
            console.log(`Navigation bar title updated to: ${title}`);
        } else {
            console.error("Navbar title element not found.");
        }
    }

    // Navigation bar event listeners
    const navHome = document.getElementById("nav-home");
    const navCustomer = document.getElementById("nav-customer");
    const navItem = document.getElementById("nav-item");
    const navOrders = document.getElementById("nav-orders");

    if (navHome) {
        navHome.addEventListener("click", () => {
            console.log("Home link clicked");
            updateNavBarTitle("Dashboard");
            showSection("home-section");
        });
    } else {
        console.error("Element with ID 'nav-home' not found.");
    }

    if (navCustomer) {
        navCustomer.addEventListener("click", () => {
            console.log("Customer link clicked");
            updateNavBarTitle("Customer Manage");
            showSection("customer-section");
        });
    } else {
        console.error("Element with ID 'nav-customer' not found.");
    }

    if (navItem) {
        navItem.addEventListener("click", () => {
            console.log("Item link clicked");
            updateNavBarTitle("Item Manage");
            showSection("item-section");
        });
    } else {
        console.error("Element with ID 'nav-item' not found.");
    }

    if (navOrders) {
        navOrders.addEventListener("click", () => {
            console.log("Orders link clicked");
            updateNavBarTitle("Order Manage");
            showSection("order-section");
        });
    } else {
        console.error("Element with ID 'nav-orders' not found.");
    }

    // Show the default section (home-section) on page load
    showSection("home-section");
    updateNavBarTitle("Dashboard");
});