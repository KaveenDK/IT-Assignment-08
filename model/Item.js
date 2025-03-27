console.log('Item.js is loaded.....');

// === Item Model ===
export class Item {
    constructor(code, name, qty, price) {
        this.code = code;
        this.name = name;
        this.qty = parseInt(qty);
        this.price = parseFloat(price);
    }
}
