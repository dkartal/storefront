import supertest from "supertest";
import app from "../../app";
import { User, UserStore } from "../../models/User";
import { Product } from "../../models/Product";

const request = supertest(app);

describe("product controller E2E", () => {
  beforeEach(async () => {
    const user: User = {
      firstname: "XXXX",
      lastname: "XXXX",
      password: "XXXX"
    };
    await new UserStore().create(user);
  });
  it("should create a product", async () => {
    const response = await request
      .post("/api/products")
      .send({ name: "name", price: 23 } as Product);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("name");
    expect(response.body.price / 1).toBe(23);
  });

  it("should get product by id", async () => {
    const response1 = await request
      .post("/api/products")
      .send({ name: "nameasd", price: 123 } as Product);
    const response = await request.get("/api/products/" + response1.body.id);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("nameasd");
    expect(response.body.price / 1).toBe(123);
  });

  it("should get all products", async () => {
    const response = await request.get("/api/products");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });
});
