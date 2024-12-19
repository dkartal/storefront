import dbClient from "../config/db";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category?: string;
};

export class ProductStore {
  async getAll(): Promise<Product[]> {
    let conn;
    try {
      conn = await dbClient.connect();
      const result = await conn.query("SELECT * FROM products");
      return result.rows as Product[];
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }

  async getById(id: number): Promise<Product> {
    const conn = await dbClient.connect();
    try {
      const result = await conn.query("SELECT * FROM products WHERE id=($1)", [
        id
      ]);
      return result.rows[0] as Product;
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    } finally {
      conn.release();
    }
  }

  async create(product: Product): Promise<Product> {
    const conn = await dbClient.connect();
    try {
      const result = await conn.query(
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *",
        [product.name, product.price, product.category]
      );
      return result.rows[0] as Product;
    } catch (err) {
      throw new Error(
        `Could not add new product ${product.name}. Error: ${err}`
      );
    } finally {
      conn.release();
    }
  }
}
