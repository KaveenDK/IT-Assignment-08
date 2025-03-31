# POS System by KaveeN

## Project Overview

This project is part of the IT-Assignment series. It is a **Point of Sale (POS) System** that allows users to manage customers, items, and orders efficiently. The system demonstrates various JavaScript functionalities, including dynamic DOM manipulation, event handling, and data validation.

## Live Demo

You can view the live demo of the project [here](https://pos-system-by-kaveen.web.app/).

## Features

- **Customer Management**:

  - Add, update, and delete customer details.
  - View customer information dynamically.

- **Item Management**:

  - Add, update, and delete item details.
  - View item information dynamically.

- **Order Management**:

  - Create orders by selecting customers and items.
  - Validate order quantities and calculate totals, discounts, and balances.
  - Display order summaries and update item stock automatically.

- **Dynamic UI**:

  - Responsive design with Bootstrap.
  - Real-time updates to the UI based on user interactions.

- **Error Handling**:
  - Input validation for customer, item, and order fields.
  - Display error messages for invalid inputs.

## Technologies Used

- **Frontend**:

  - HTML5, CSS3, JavaScript (ES6+)
  - Bootstrap 5 for responsive design

- **Backend (Simulated)**:

  - JavaScript arrays to simulate a database for customers, items, and orders.

- **Hosting**:
  - Firebase Hosting for live demo

## Clone the Repository

To clone the repository, use the following commands:

```sh
git clone https://github.com/KaveenDK/IT-Assignment-08.git
cd IT-Assignment-08
```

## Project Structure

The project is organized as follows:

```
IT-Assignment-08/
├── controller/
│   ├── CustomerController.js   # Handles customer-related logic
│   ├── ItemController.js       # Handles item-related logic
│   ├── OrderController.js      # Handles order-related logic
│   ├── IndexController.js      # Handles dashboard updates
├── db/
│   ├── DB.js                   # Simulated database for customers, items, and orders
├── model/
│   ├── Customer.js             # Customer model
│   ├── Item.js                 # Item model
│   ├── Order.js                # Order model
│   ├── OrderDetails.js         # OrderDetails model
├── index.html                  # Main HTML file
├── styles.css                  # Custom styles
├── README.md                   # Project documentation
```

## How to Run the Project

1. Clone the repository using the commands above.
2. Open the project folder in your code editor (e.g., VS Code).
3. Open `index.html` in your browser to view the application.

## How to Use the POS System

1. **Customer Management**:

   - Add customers by filling out the form and clicking "Add Customer."
   - Update or delete customers using the customer table.

2. **Item Management**:

   - Add items by filling out the form and clicking "Add Item."
   - Update or delete items using the item table.

3. **Order Management**:
   - Select a customer and items to create an order.
   - Enter the order quantity and click "Add Item" to add it to the order table.
   - Apply discounts and enter cash to calculate the balance.
   - Click "Purchase" to place the order.

## Future Enhancements

- Integrate a real backend using Firebase or Node.js.
- Add user authentication for secure access.
- Implement advanced reporting features for sales and inventory.

## ☕ Support Me

If you found this project helpful, consider supporting me:

[Buy me a coffee](https://www.buymeacoffee.com/vpdkkaveenp)
