# NodeJS+Angular ShopPhone
# ProductController Management System

This project is a product management system that supports multiple database types: JSON file, MySQL, MongoDB, PostgreSQL, and Redis. This README provides instructions on how to configure and run the project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Configuration](#database-configuration)
    - [MongoDB](#mongodb)
- [Running the Project](#running-the-project)

## Prerequisites

- Node.js (v14.x or later)
- pnpm (v9.x or later)
- MongoDB (for MongoDB database option)


## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/TanNhatCMS/Angular-Node-JS-ShopPhone.git
    cd Angular-Node-JS-ShopPhone
    ```

2. Install pnpm if you haven't already:

    ```bash
    npm install -g pnpm
    ```

3. Install the dependencies using pnpm:

    ```bash
    pnpm install
    ```

## Database Configuration

The project supports five types of databases: MongoDB. Configure the desired database by setting the appropriate environment variables in a `.env` file at the root of the project.

### MongoDB

To use MongoDB as the database, set the following environment variables in the `.env` file:

    ```env
    DB_TYPE=mongodb
    MONGODB_URL=mongodb://localhost:27017
    MONGODB_DATABASE=your_database
    ```

Ensure you have a MongoDB server running.

## Running the Project

After configuring the database, you can run the project using the following commands:

- For production:

    ```bash
    pnpm start
    ```

- For development:

    ```bash
    pnpm dev
    ```

This will start the server, and the project will be accessible at `http://localhost:3000`.


## Example .env File

Below is an example `.env` file for each database type.


### MongoDB

    ```env
    DB_TYPE=mongodb
    MONGODB_URL=mongodb://localhost:27017
    MONGODB_DATABASE=your_database
    ```

## Notes

- For MongoDB, the necessary collections will be created automatically when you first insert a product.


Feel free to reach out if you have any questions or issues!
