## Tech Stack

|               | Backend    | Database   |
| ------------- | ---------- | ---------- |
| **Framework** | Express.js | PostgreSQL |
| **Language**  | TypeScript | SQL        |

## Setup

1.  Make sure Node.js is installed

        node --version

2.  Make sure npm is installed

        npm --version

3.  Create the Environment File

        touch .env

    Add the following

        ENV=dev
        ALLOWED_ORIGIN=http://localhost:3000
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

5.  Run the server (make sure to set ENV to dev in .env before running dev)

        npm run dev:backend

6.  Run the tests (make sure to set ENV to test in .env before running test)

        npm run test:backend

## API Endpoints

#### Authentication

| HTTP Method | Endpoint                  | Description      |
| ----------- | ------------------------- | ---------------- |
| `POST`      | `/api/auth/login`         | login            |
| `POST`      | `/api/auth/logout`        | logout           |

#### Products

| HTTP Method | Endpoint            | Description         |
| ----------- | ------------------- | ------------------- |
| `GET`       | `/api/products`     | get all products    |
| `GET`       | `/api/products/:id` | get a product by id |
| `POST`      | `/api/products`     | create a product    |

#### Users

| HTTP Method | Endpoint         | Description                       |
| ----------- | ---------------- | --------------------------------- |
| `GET`       | `/api/users`     | get all users (token required)    |
| `GET`       | `/api/users/:id` | get a user by ID (token required) |
| `POST`      | `/api/users`     | create a user                     |

#### Orders

| HTTP Method | Endpoint                   | Description              |
| ----------- | -------------------------- | ------------------------ |
| `GET`       | `/api/orders/active`       | get current active order |
| `GET`       | `/api/orders/completed`    | get completed orders     |
| `POST`      | `/api/orders`              | create a new order       |
| `POST`      | `/api/orders/:id/products` | add product to an order  |

## Models

#### products

    (
        id: number; (primary key)
        name: string;
        price: number;
        category?: string;
    )

#### users

    (
        id: number; (primary key)
        firstname: string;
        lastname: string;
        password: string; (encrypted)
    )

#### orders

    (
        id?: number; (primary key)
        user_id: number; (foreign key to users table)
        order_status?: "active" | "complete";
        products: { product_id: number; (foreign key to products table) quantity: number }[];
    )
