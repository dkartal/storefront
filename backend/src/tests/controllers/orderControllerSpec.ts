import supertest, { Response } from "supertest";
import app from "../../app";
import { User, UserStore } from "../../models/User";
import { Product, ProductStore } from "../../models/Product";
import { extractCookieValue } from "../helpers/extractCookieValue";

const request = supertest(app);
describe("order controller E2E", () => {
  let token: string | undefined;
  let orderCreatedResponse: Response;
  const user: User = {
    firstname: "XXXX",
    lastname: "XXXX",
    password: "XXXX"
  };
  let product: Product;
  beforeAll(async () => {
    await new UserStore().create(user);
    product = await new ProductStore().create({
      name: "product name",
      price: 10
    } as Product);
    const response = await request.post("/api/auth/login").send(user);
    const cookies = response.headers["set-cookie"] as unknown as string[];
    token = extractCookieValue(cookies, "token");

    orderCreatedResponse = await request
    .post("/api/orders")
    .send()
    .set("Cookie", `token=${token}`);
  });

  it("should create an order", async () => {
    const response1 = await request
      .post("/api/orders")
      .send()
      .set("Cookie", `token=${token}`);

    expect(response1.status).toBe(201);
    expect(response1.body.id).toBeDefined();
    expect(response1.body.user_id).toBeDefined();
    expect(response1.body.products).toBeDefined();
    expect(response1.body.order_status).toBe("active");
  });

  it("should add a product to an order", async () => {
    const orderId = orderCreatedResponse.body.id as number;
    const response2 = await request
      .post(`/api/orders/${orderId}/products`)
      .send({
        product_id: product.id,
        quantity: 2
      })
      .set("Cookie", `token=${token}`);

      console.log("response2: ", response2.body);
    expect(response2.status).toBe(201);
    expect(response2.body.order_id).toBe(orderId);
    expect(response2.body.product_id).toBe(product.id);
    expect(response2.body.quantity).toBe(2);
  });

  it("should get current active order", async () => {
    const response2 = await request
      .get("/api/orders/active")
      .set("Cookie", `token=${token}`);

    expect(response2.status).toBe(200);
  });
});
