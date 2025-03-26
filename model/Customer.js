console.log("Customer.js is loaded.....");

// === Customer Model ===
export class Customer {
    constructor(id, name, address, salary) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.salary = parseFloat(salary);
    }
}
