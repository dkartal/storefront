import { Product, ProductStore } from "../../models/Product";
import { UserStore } from "../../models/User";

const store = new ProductStore();

describe("ProductStore Model", () => {
  const product1: Product = {
    name: "product-1",
    price: 10
  };
  const product2: Product = {
    name: "product-2",
    price: 12
  };

  let user;
  beforeAll(async () => {
    const userStore = new UserStore();
    user = await userStore.create({
      firstname: "John",
      lastname: "Doe",
      password: "password123"
    });
  });

  it("should have all CRUD methods", () => {
    expect(store.getAll).toBeDefined();
    expect(store.getById).toBeDefined();
    expect(store.create).toBeDefined();
  });

  it("should create a new product", async () => {
    const product = await store.create(product1);

    expect(product).toBeDefined();
    expect(product.id).toBeDefined();
    expect(product.name).toBe(product1.name);
    expect(product.price / 1).toBe(product1.price);
  });

  it("should get a product by ID", async () => {
    const product = await store.create(product2);

    expect(product).toBeDefined();
    expect(product.id).toBeDefined();
    const retrievedProduct = await store.getById(product.id ?? 1);

    expect(retrievedProduct).toEqual(product);
  });

  it("should return a list of products", async () => {
    const products = await store.getAll();
    expect(products.length).toBeGreaterThan(0);
  });
});
