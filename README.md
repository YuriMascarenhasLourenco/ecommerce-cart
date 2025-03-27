# Shopee Cart Project

## Overview
The Shopee Cart project is an e-commerce backend application built using the **NestJS** framework. It provides functionality for managing users, products, carts, and payments. The project integrates with **Stripe** for payment processing and uses **PostgreSQL** as the database.

---

## Features
- **User Management**: Create, update, and manage user accounts with roles and authentication.
- **Product Management**: Add, update, and manage product inventory.
- **Cart Management**: Add items to a cart, update quantities, and checkout.
- **Payment Integration**: Secure payment processing using Stripe.
- **Authentication and Authorization**: JWT-based authentication and role-based access control.

---

## Technologies Used
- **NestJS**: Backend framework.
- **TypeORM**: ORM for database interaction.
- **PostgreSQL**: Relational database.
- **Stripe**: Payment gateway integration.
- **JWT**: Authentication and authorization.
- **ConfigModule**: For environment variable management.

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd shopee-cart
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following:
   ```
   DATABASE_HOST=<your-database-host>
   DATABASE_PORT=<your-database-port>
   DATABASE_USERNAME=<your-database-username>
   DATABASE_PASSWORD=<your-database-password>
   DATABASE_NAME=<your-database-name>
   STRIPE_SECRET_KEY=<your-stripe-secret-key>
   ```

4. Run the application:
   ```bash
   npm run start:dev
   ```

---

## API Endpoints

### **Authentication**
- `POST /auth/login`: Authenticate a user and return a JWT token.

### **Users**
- `POST /users`: Create a new user.
- `GET /users`: Retrieve all users (admin only).

### **Products**
- `POST /products`: Add a new product.
- `GET /products`: Retrieve all products.

### **Cart**
- `POST /cart`: Create a new cart for a user.
- `POST /cart/add-item`: Add an item to a cart.
- `GET /cart/:id`: Retrieve cart details.

### **Payment**
- `POST /payment`: Create a Stripe checkout session for a cart.

---

## Database Schema

### **User**
- `id`: Primary key.
- `name`: User's name.
- `email`: Unique email address.
- `password`: Encrypted password.
- `salt`: Salt for password hashing.
- `role`: User role (`user` or `admin`).
- `cart`: One-to-one relationship with `Cart`.

### **Product**
- `id`: Primary key.
- `name`: Unique product name.
- `price`: Product price.
- `description`: Product description.
- `stock`: Available stock.
- `cartItem`: One-to-many relationship with `CartItem`.

### **Cart**
- `id`: Primary key.
- `finished`: Indicates if the cart is checked out.
- `userId`: One-to-one relationship with `User`.
- `itens`: One-to-many relationship with `CartItem`.

### **CartItem**
- `id`: Primary key.
- `name`: Item name.
- `quantity`: Quantity of the product.
- `cart`: Many-to-one relationship with `Cart`.
- `product`: Many-to-one relationship with `Product`.

---

## Stripe Integration
The project integrates with Stripe for payment processing. The `PaymentService` handles the creation of Stripe checkout sessions. Ensure the `STRIPE_SECRET_KEY` is correctly configured in the `.env` file.

---

## Running Tests
To run the tests, use the following command:
```bash
npm run test
```

---

## Future Improvements
- Add support for multiple payment gateways.
- Implement order history for users.
- Add unit and integration tests for all modules.

---

## License
This project is licensed under the MIT License.