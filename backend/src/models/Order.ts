import { dbClient as client } from "../server";
export type Order = {
  id?: number;
  userId: number;
  orderStatus: "active" | "complete";
  products: { productId: number; quantity: number }[];
};

export class OrderStore {
  async getCurrentOrderByUserId(userId: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const result = await conn.query(
        "SELECT * FROM orders WHERE user_id = $1 AND status = $2",
        [userId, "active"]
      );
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find current order for user ${userId}. Error: ${err}`
      );
    }
  }

  async getCompletedOrdersByUserId(userId: string): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const result = await conn.query(
        "SELECT * FROM orders WHERE user_id = $1 AND status = $2",
        [userId, "complete"]
      );
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not find completed orders for user ${userId}. Error: ${err}`
      );
    }
  }

  async createOrder(order: Order): Promise<Order> {
    const conn = await client.connect();
    try {
      await conn.query("BEGIN");

      const orderResult = await conn.query(
        "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *",
        [order.userId, "active"]
      );

      const createOrder = orderResult.rows[0];

      for (const product of order.products || []) {
        await conn.query(
          "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3)",
          [createOrder.id, product.productId, product.quantity]
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
