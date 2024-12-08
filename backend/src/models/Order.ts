import dbClient from "../config/db";

export type Order = {
  id?: number;
  user_id: number;
  order_status?: "active" | "complete";
  products: { product_id: number; quantity: number }[];
};

export class OrderStore {
  async getCurrentOrderById(user_id: number): Promise<Order> {
    try {
      const conn = await dbClient.connect();
      const result = await conn.query(
        "SELECT * FROM orders WHERE user_id = $1 AND order_status = $2",
        [user_id, "active"]
      );
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${user_id}. Error: ${err}`);
    }
  }

  async getCompletedOrdersByUserId(user_id: number): Promise<Order[]> {
    try {
      const conn = await dbClient.connect();
      const result = await conn.query(
        "SELECT * FROM orders WHERE user_id = $1 AND order_status = $2",
        [user_id, "complete"]
      );
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find order ${user_id}. Error: ${err}`);
    }
  }

  async createOrder(order: Order): Promise<Order> {
    const conn = await dbClient.connect();
    try {
      await conn.query("BEGIN");

      const orderResult = await conn.query(
        "INSERT INTO orders (user_id, order_status) VALUES ($1, $2) RETURNING *",
        [order.user_id, "active"]
      );

      const createOrder = orderResult.rows[0];

      for (const product of order.products || []) {
        await conn.query(
          "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3)",
          [createOrder.id, product.product_id, product.quantity]
        );
      }

      await conn.query("COMMIT");

      return createOrder;
    } catch (err) {
      await conn.query("ROLLBACK");
      throw new Error(`Could not create new order. Error: ${err}`);
    } finally {
      conn.release();
    }
  }
}
