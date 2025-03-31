import { orders, customers, items } from "../db/DB.js";
import { addOrder } from "../db/DB.js";
import { Order } from "../model/Order.js";
import { OrderDetails } from "../model/OrderDetails.js";
import { updateDashboard } from "./IndexController.js";

export function populateCustomerDropdown() {
    console.log("Populating customer dropdown...");
    const $customerDropdown = $("#order-customer-id");
    $customerDropdown.empty();
    $customerDropdown.append('<option value="">Select Customer</option>');

    customers.forEach((customer) => {
        $customerDropdown.append(`<option value="${customer.id}">${customer.id} - ${customer.name}</option>`);
    });
}

export function populateItemDropdown() {
    console.log("Populating item dropdown...");
    const $itemDropdown = $("#item-code");
    $itemDropdown.empty();
    $itemDropdown.append('<option value="">Select Item Code</option>');

    items.forEach((item) => {
        $itemDropdown.append(`<option value="${item.code}">${item.code} - ${item.name}</option>`);
    });
}

$(document).ready(() => {
    console.log("Order management script loaded...");

    // Generate Automatic Order ID
    function generateOrderId() {
        if (orders.length === 0) {
            return "O-001";
        }
        const lastOrder = orders[orders.length - 1];
        const lastIdNum = parseInt(lastOrder.orderId.split("-")[1]);
        return `O-${String(lastIdNum + 1).padStart(3, "0")}`;
    }

    // Clear Order Form
    function clearOrderForm() {
        $("#order-id").val(generateOrderId());
        $("#order-customer-id").val("");
        $("#customer-name").val("");
        $("#customer-address").val("");
        $("#item-code").val("");
        $("#item-name").val("");
        $("#item-price").val("");
        $("#order-qty").val("");
        $("#qty-on-hand").val("");
        $("#discount").val("");
        $("#cash").val("");
        $("#balance").val("");
        $("#order-table").empty();
        $("#order-total").text("00.00 Rs");
        $("#order-subtotal").text("00.00 Rs");
    }

    // Handle Customer Dropdown Change
    $("#order-customer-id").on("change", function () {
        const customerId = $(this).val();
        const customer = customers.find((c) => c.id === customerId);
        if (customer) {
            $("#customer-name").val(customer.name);
            $("#customer-address").val(customer.address);
        } else {
            $("#customer-name").val("");
            $("#customer-address").val("");
        }
    });

    // Handle Item Dropdown Change
    $("#item-code").on("change", function () {
        const itemCode = $(this).val();
        const item = items.find((i) => i.code === itemCode);
        if (item) {
            $("#item-name").val(item.name);
            $("#item-price").val(item.price.toFixed(2));
            $("#qty-on-hand").val(item.qty);
        } else {
            $("#item-name").val("");
            $("#item-price").val("");
            $("#qty-on-hand").val("");
        }
    });

    // Add Item to Order Table
    $("#add-order-item").on("click", () => {
        const itemCode = $("#item-code").val();
        const itemName = $("#item-name").val();
        const itemPrice = parseFloat($("#item-price").val());
        const qtyOnHand = parseInt($("#qty-on-hand").val());
        const orderQty = parseInt($("#order-qty").val());

        if (!itemCode || !orderQty || isNaN(orderQty) || orderQty <= 0 || orderQty > qtyOnHand) {
            alert("Invalid item or quantity!");
            return;
        }

        const subTotal = itemPrice * orderQty;

        const $orderTable = $("#order-table");
        const existingRow = $orderTable.find(`tr[data-item-code="${itemCode}"]`);
        if (existingRow.length > 0) {
            const $qtyCell = existingRow.find(".order-qty");
            const $subTotalCell = existingRow.find(".order-subtotal");
            const newQty = parseInt($qtyCell.text()) + orderQty;

            if (newQty > qtyOnHand) {
                alert("Total quantity exceeds available quantity.");
                return;
            }

            $qtyCell.text(newQty);
            $subTotalCell.text((newQty * itemPrice).toFixed(2));
        } else {
            const row = `
                <tr data-item-code="${itemCode}">
                    <td>${itemCode}</td>
                    <td>${itemName}</td>
                    <td>${itemPrice.toFixed(2)}</td>
                    <td class="order-qty">${orderQty}</td>
                    <td class="order-subtotal">${subTotal.toFixed(2)}</td>
                    <td><button class="btn btn-danger btn-sm remove-order-item">Remove</button></td>
                </tr>
            `;
            $orderTable.append(row);
        }

        updateOrderTotals();
    });

    // Remove Item from Order Table
    $("#order-table").on("click", ".remove-order-item", function () {
        $(this).closest("tr").remove();
        updateOrderTotals();
    });

    // Update Order Totals
    function updateOrderTotals() {
        let total = 0;
        $("#order-table tr").each(function () {
            const subTotal = parseFloat($(this).find(".order-subtotal").text());
            total += subTotal;
        });

        const discount = parseFloat($("#discount").val()) || 0;
        const discountedTotal = total - (total * (discount / 100));

        $("#order-total").text(`${total.toFixed(2)} Rs`);
        $("#order-subtotal").text(`${discountedTotal.toFixed(2)} Rs`);
    }

    // Place Order
    $("#place-order").on("click", () => {
        const customerId = $("#order-customer-id").val();
        const discount = parseFloat($("#discount").val()) || 0;

        const orderDetails = [];
        $("#order-table tr").each(function () {
            const itemCode = $(this).data("item-code");
            const qty = parseInt($(this).find(".order-qty").text());
            const unitPrice = parseFloat($(this).find("td:nth-child(3)").text());
            const subTotal = parseFloat($(this).find(".order-subtotal").text());

            orderDetails.push(new OrderDetails(itemCode, "", qty, unitPrice, subTotal));
        });

        if (!customerId || orderDetails.length === 0) {
            alert("Please select a customer and add items to the order.");
            return;
        }

        const orderId = generateOrderId();
        const date = new Date().toISOString().split("T")[0];
        const total = calculateTotal(orderDetails, discount);

        const newOrder = new Order(orderId, customerId, date, total, orderDetails);
        orders.push(newOrder);

        updateItemStock(orderDetails);
        updateDashboard();

        alert(`Order ${orderId} placed successfully!`);
        clearOrderForm();
    });

    function calculateTotal(orderDetails, discount) {
        let total = orderDetails.reduce((sum, item) => sum + item.subTotal, 0);
        return total - (total * (discount / 100));
    }

    function updateItemStock(orderDetails) {
        orderDetails.forEach((orderItem) => {
            const item = items.find((i) => i.code === orderItem.itemCode);
            if (item) {
                item.qty -= orderItem.qty;
            }
        });
    }

    // Initial Setup
    populateCustomerDropdown();
    populateItemDropdown();
    clearOrderForm();
});