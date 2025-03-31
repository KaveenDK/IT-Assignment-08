import { customers, items, orders } from "../db/DB.js";
import { populateCustomerDropdown, populateItemDropdown, generateOrderId } from "./OrderController.js";

export function updateDashboard() {
    const customerCount = customers.length;
    const itemCount = items.length;
    const orderCount = orders.length;

    const totalRevenue = orders.reduce((total, order) => total + order.total, 0);

    $("#customer-count").text(customerCount);
    $("#item-count").text(itemCount);
    $("#order-count").text(orderCount);
    $("#revenue-count").text(`Rs. ${totalRevenue.toFixed(2)}`);
    console.log("Dashboard updated:", { customerCount, itemCount, orderCount, totalRevenue });
}

$(document).ready(() => {
    console.log("IndexController.js loaded...");

    function showSection(sectionId) {
        console.log(`Attempting to show section: ${sectionId}`);
        $("section").addClass("hidden");
        $(`#${sectionId}`).removeClass("hidden");
        console.log(`Section ${sectionId} is now visible.`);
    }

    function updateNavBarTitle(title) {
        $(".navbar-brand").text(title);
        console.log(`Navigation bar title updated to: ${title}`);
    }

    $("#nav-home").on("click", () => {
        console.log("Home link clicked");
        updateNavBarTitle("Dashboard");
        showSection("home-section");
        updateDashboard();
    });

    $("#nav-customer").on("click", () => {
        console.log("Customer link clicked");
        updateNavBarTitle("Customer Manage");
        showSection("customer-section");
    });

    $("#nav-item").on("click", () => {
        console.log("Item link clicked");
        updateNavBarTitle("Item Manage");
        showSection("item-section");
    });

    $("#nav-orders").on("click", () => {
        console.log("Orders link clicked");
        updateNavBarTitle("Order Manage");
        showSection("order-section");
        initializeOrderForm();
    });

    function initializeOrderForm() {
        console.log("Initializing order form...");
        populateCustomerDropdown();
        populateItemDropdown(); // Ensure this is called
        $("#order-id").val(generateOrderId());
        $("#order-customer-id").val("");
        $("#order-table").empty();
        $("#order-total").text("0.00 Rs");
        $("#order-subtotal").text("0.00 Rs");
        $("#balance").val("");
        $("#discount").val("");
        $("#cash").val("");
        console.log("Order form initialized.");
    }

    function addCustomer(customer) {
        customers.push(customer);
        updateDashboard();
    }

    function addItem(item) {
        items.push(item);
        updateDashboard();
    }

    function addOrder(order) {
        orders.push(order);
        updateDashboard();
    }

    showSection("home-section");
    updateNavBarTitle("Dashboard");

    updateDashboard();
});