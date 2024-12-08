### Architecuture

### Tech Stack

- backend: nodejs, express.js, jasmine
- database: Postgres

### API Endpoints

#### Products

- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

### Models

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

document migrations
db-migrate up --env test
db-migrate down --env test
db-migrate reset --env test

- testing models with jasmine
- setup testing and development dbs so that you have clean dbs for testing and dev
- create .env file with db credentials (host, db, port, user will be the same but the db name will be different for each db)

cd docker/ -> docker-compose up -d

psql -h localhost -p <PORT> -U <USER> -d <DB_NAME>

cd backend/ ->
npm run dev
npm run test
npm run build
npm run deploy

API ENDPOINTS:

GET http://localhost:5000/api/users

[
{
"id": 1,
"firstname": "first1",
"lastname": "last1",
"password": "password"
},
{
"id": 2,
"firstname": "first1",
"lastname": "last1",
"password": "password"
}
]

GET http://localhost:5000/api/users/1

{
"id": 1,
"firstname": "first1",
"lastname": "last1",
"password": "password"
}

POST http://localhost:5000/api/users
body = {
"firstName": "first",
"lastName": "last1",
"password": "password"
}

{
"firstName": "first3",
"lastName": "last3",
"password": "password3"
}

POST http://localhost:5000/api/products

body = {
"name": "product-name",
"price": 12
}

{
"id": 1,
"name": "product-name",
"price": "12.00",
"category": null
}

GET http://localhost:5000/api/products

[
{
"id": 1,
"name": "product-name",
"price": "12.00",
"category": null
}
]

GET http://localhost:5000/api/products/1

{
"id": 1,
"name": "product-name",
"price": "12.00",
"category": null
}

POST http://localhost:5000/api/orders

BODY = {
"userId": 1,
"products": [{"productId": 1, "quantity": 2}, {"productId": 2, "quantity": 5}, {"productId": 1, "quantity": 10}]
}

{
"id": 1,
"userid": 1,
"orderstatus": "active"
}

GET http://localhost:5000/api/orders/1

{
"id": 1,
"userid": 1,
"orderstatus": "active"
}

GET http://localhost:5000/api/orders/completed/1
