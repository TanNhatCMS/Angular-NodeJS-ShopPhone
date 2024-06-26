# NodeJS+Angular ShopPhone
# ProductController Management System

This project is a product management system that supports multiple database types: JSON file, MySQL, MongoDB, PostgreSQL, and Redis. This README provides instructions on how to configure and run the project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Configuration](#database-configuration)
    - [JSON File](#json-file)
    - [MySQL](#mysql)
    - [MongoDB](#mongodb)
    - [PostgreSQL](#postgresql)
    - [Redis](#redis)
- [Running the Project](#running-the-project)

## Prerequisites

- Node.js (v14.x or later)
- pnpm (v6.x or later)
- MySQL (for MySQL database option)
- MongoDB (for MongoDB database option)
- PostgreSQL (for PostgreSQL database option)
- Redis (for Redis database option)


## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/TanNhatCMS/NodeJS-ShopPhone.git
    cd NodeJS-ShopPhone
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

The project supports five types of databases: JSON file, MySQL, MongoDB, PostgreSQL, and Redis. Configure the desired database by setting the appropriate environment variables in a `.env` file at the root of the project.

### JSON File

The JSON file database option is the default configuration. If you wish to use the JSON file database, you don't need to set any additional environment variables.

### MySQL

To use MySQL as the database, set the following environment variables in the `.env` file:

    ```env
    DB_TYPE=mysql
    MYSQL_HOST=localhost
    MYSQL_USER=root
    MYSQL_PASSWORD=your_password
    MYSQL_DATABASE=your_database
    ```

Ensure you have a MySQL server running and have created the specified database. You can create the database using the following SQL command:

    ```sql
    CREATE DATABASE your_database;
    ```

### MongoDB

To use MongoDB as the database, set the following environment variables in the `.env` file:

    ```env
    DB_TYPE=mongodb
    MONGODB_URL=mongodb://localhost:27017
    MONGODB_DATABASE=your_database
    ```

Ensure you have a MongoDB server running.

### PostgreSQL

To use PostgreSQL as the database, set the following environment variables in the `.env` file:

    ```env
    DB_TYPE=postgresql
    PG_HOST=localhost
    PG_PORT=5432
    PG_USER=your_user
    PG_PASSWORD=your_password
    PG_DATABASE=your_database
    ```

Ensure you have a PostgreSQL server running and have created the specified database. You can create the database using the following SQL command:

    ```sql
    CREATE DATABASE your_database;
    ```

### Redis

To use Redis as the database, set the following environment variables in the `.env` file:

    ```env
    DB_TYPE=redis
    REDIS_HOST=localhost
    REDIS_PORT=6379
    REDIS_PASSWORD=your_password (if required)
    ```

Ensure you have a Redis server running.

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

### JSON File (default)

    ```env
    DB_TYPE=json
    ```

### MySQL

    ```env
    DB_TYPE=mysql
    MYSQL_HOST=localhost
    MYSQL_USER=root
    MYSQL_PASSWORD=your_password
    MYSQL_DATABASE=your_database
    ```

### MongoDB

    ```env
    DB_TYPE=mongodb
    MONGODB_URL=mongodb://localhost:27017
    MONGODB_DATABASE=your_database
    ```

### PostgreSQL

    ```env
    DB_TYPE=postgresql
    PG_HOST=localhost
    PG_PORT=5432
    PG_USER=your_user
    PG_PASSWORD=your_password
    PG_DATABASE=your_database
    ```

### Redis

    ```env
    DB_TYPE=redis
    REDIS_HOST=localhost
    REDIS_PORT=6379
    REDIS_PASSWORD=your_password (if required)
    ```

## Notes

- Ensure that the `Products.json` file exists in the `database` folder if you are using the JSON file database option. You can create an empty JSON file with the following content:

    ```json
    []
    ```

- For MySQL, ensure you have the necessary tables created. You can use the following SQL script to create the `products` table:

    ```sql
    CREATE TABLE products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        screen VARCHAR(255),
        backCamera VARCHAR(255),
        frontCamera VARCHAR(255),
        img VARCHAR(255),
        `desc` TEXT,
        type VARCHAR(255)
    );
    ```

- For MongoDB, the necessary collections will be created automatically when you first insert a product.

- For PostgreSQL, ensure you have the necessary tables created. You can use the following SQL script to create the `products` table:

    ```sql
    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        screen VARCHAR(255),
        backCamera VARCHAR(255),
        frontCamera VARCHAR(255),
        img VARCHAR(255),
        desc TEXT,
        type VARCHAR(255)
    );
    ```

- For Redis, ensure you have the Redis server running and properly configured with the required environment variables.

Feel free to reach out if you have any questions or issues!
