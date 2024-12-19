import { Product, ProductStore } from "../../models/Product";

const store = new ProductStore();

describe("ProductStore Model", () => {
  const product1: Product = {
    name: "product-1",
    price: 10
  };

  it("should have all CRUD methods", () => {
    expect(store.getAll).toBeDefined();
    expect(store.getById).toBeDefined();
    expect(store.create).toBeDefined();
  });

  it("should create a new product", async () => {
    const product = await store.create(product1);

    expect(product).toBeDefined();
    expect(product.id).toBeDefined();
  });

  it("should get a product by ID", async () => {
    const product = await store.create(product1);

    expect(product).toBeDefined();
    expect(product.id).toBeDefined();
    const retrievedProduct = await store.getById(product.id ?? 111111111);

    expect(retrievedProduct).toEqual(product);
  });

  it("should return a list of products", async () => {
    const product2: Product = {
      name: "product-2",
      price: 12
    };

    const p1 = await store.create(product1);
    const p2 = await store.create(product2);
  
    const products = await store.getAll();
    expect(products.length).toBeGreaterThan(0);
    expect(products).toEqual(jasmine.arrayContaining([p1, p2]));
  });
});
