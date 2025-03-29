console.log('OrderDetails.js is loaded.....');

// === Order Details Model ===
export class OrderDetails {
    constructor(itemCode, itemName, qty, unitPrice) {
        this.itemCode = itemCode;
        this.itemName = itemName;
        this.qty = parseInt(qty);
        this.unitPrice = parseFloat(unitPrice);
        this.subTotal = this.qty * this.unitPrice;
    }
}
