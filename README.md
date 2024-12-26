## Architecture

![architecture](/docs/diagram.png)

This project consists of three main components:

1. Frontend: An Angular application hosted on AWS S3, serving as the user interface.

    http://storefront-udacity.s3-website-us-east-1.amazonaws.com
    
2. Backend: A Node.js application powered by Express.js, deployed to AWS Elastic Beanstalk to handle API requests and business logic.

    http://storefront-env.eba-63kmh5t7.us-east-1.elasticbeanstalk.com

3. Database: A PostgreSQL database hosted on AWS RDS, used for storing and managing application data.


## Tech Stack

|               | Frontend   | Backend    | Database   |
| ------------- | ---------- | ---------- | ---------- |
| **Framework** | Angular    | Express.js | PostgreSQL |
| **Language**  | TypeScript | TypeScript | SQL        |

## Local Setup

1.  Make sure Node.js is installed

        node --version

2.  Make sure npm is installed

        npm --version

3.  Create the Environment File

        touch .env

    Add the following

        ENV=dev
        ALLOWED_ORIGIN=http://localhost:4200
        SERVER_PORT=5000

        # database
        DB_HOST=localhost
        DB_USER=db_user
        DB_PASSWORD=db_password
        DB_PORT=7000

        # dev db
        DEV_DB_NAME=dev_database

        # test db
        TEST_DB_NAME=test_database

        # encryption
        BCRYPT_PASSWORD=<some-strong-key-for-bcrypt>
        SALT_ROUNDS=10

        # JWT
        JWT_SECRET=<some-strong-key-for-jwt>

4.  Start the local database

        cd docker && docker-compose up -d

    What Happens?

    - Docker creates two PostgreSQL databases: dev_database and test_database.
    - The dev_database is used during development.
    - The test_database is used when running tests.

      How to connect to you db?

            psql -h localhost -p <PORT> -U <USER> -d <DB_NAME>
5.  Install dependencies (backend)

        npm run install:backend

6.  Run the tests (make sure to set ENV to test in .env before running test)

        npm run test:backend

7.  Run the server (make sure to set ENV to dev in .env before running dev)

        npm run dev:backend

8.  Install dependencies (frontend)

        npm run install:frontend
    
7.  Run the frontend

        npm run start:frontend

## API Endpoints

#### Authentication

| HTTP Method | Endpoint                  | Description      | Request Body (Required Fields)    |
| ----------- | ------------------------- | ---------------- | --------------------------------- |
| `POST`      | `/api/auth/login`         | login            | { firstname, lastname, password } |
| `POST`      | `/api/auth/logout`        | logout           | None                              |

#### Products

| HTTP Method | Endpoint            | Description         | Request Body (Required Fields) |
| ----------- | ------------------- | ------------------- | -------------------------------|
| `GET`       | `/api/products`     | get all products    | None                           |
| `GET`       | `/api/products/:id` | get a product by id | None                           |
| `POST`      | `/api/products`     | create a product    | { name, price, category }      |

#### Users

| HTTP Method | Endpoint         | Description                       | Request Body (Required Fields)    |
| ----------- | ---------------- | --------------------------------- | --------------------------------- | 
| `GET`       | `/api/users`     | get all users (token required)    | None                              |
| `GET`       | `/api/users/:id` | get a user by ID (token required) | None                              |
| `POST`      | `/api/users`     | create a user                     | { firstname, lastname, password } |

#### Orders

| HTTP Method | Endpoint                   | Description              | Request Body (Required Fields) |
| ----------- | -------------------------- | ------------------------ | ------------------------------ |
| `GET`       | `/api/orders/active`       | get current active order | None                           |
| `GET`       | `/api/orders/completed`    | get completed orders     | None                           |
| `POST`      | `/api/orders`              | create a new order       | products                       |
| `POST`      | `/api/orders/:id/products` | add product to an order  | { product_id, quantity }       |

## Models

#### products

    (
        id: number, (primary key)
        name: string,
        price: number,
        category: string,
    )

#### users

    (
        id: number, (primary key)
        firstname: string,
        lastname: string,
        password: string (encrypted)
    )

#### orders

    (
        id: number, (primary key)
        user_id: number, (foreign key to users table)
        order_status: "active" | "complete",
        products: [
            product_id: number, (foreign key to products table)
            quantity: number
        ]
    )

#### order_products
    (
        id: number, (primary key)
        order_id: number, (foreign key to orders table)
        product_id: number, (foreign key to products table)
        quantity: number
    )
