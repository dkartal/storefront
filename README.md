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
    - The dev database is used during development.
    - The test database is used when running tests.

      How to connect to you db?

            psql -h localhost -p <PORT> -U <USER> -d <DB_NAME>

5.  Run the server (make sure to set ENV to dev in .env before running dev)

        npm run dev

6.  Run the tests (make sure to set ENV to test in .env before running test)

        npm run test

## API Endpoints

#### Authentication

| HTTP Method | Endpoint                  | Description      |
| ----------- | ------------------------- | ---------------- |
| `POST`      | `/api/auth/login`         | login            |
| `POST`      | `/api/auth/logout`        | logout           |
| `POST`      | `/api/auth/refresh-token` | create a product |

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

#### Product

    {
        id: number;
        name: string;
        price: number;
        category?: string;
    }

#### User

    {
        id: number;
        firstname: string;
        lastname: string;
        password: string; (encrypted)
    }

#### Orders

    {
        id?: number;
        user_id: number;
        order_status?: "active" | "complete";
        products: { product_id: number; quantity: number }[];
    }
