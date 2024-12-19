import dbClient from "../config/db";

export type Order = {
  id?: number;
  user_id: number;
  order_status?: "active" | "complete";
  products: OrderProduct[];
};

export type OrderProduct = {
  product_id: number;
  quantity: number;
};
export class OrderStore {
  sql = `
      SELECT 
        o.id,
        o.user_id,
        o.order_status,
        json_agg(
          json_build_object(
            'product_id', op.product_id,
            'quantity', op.quantity
          )
        ) AS products
      FROM 
        orders o
      JOIN 
        order_products op ON o.id = op.order_id
      WHERE 
        o.user_id = $1 AND o.order_status = $2
      GROUP BY 
        o.id, o.user_id, o.order_status;
      `;

  async getCurrentOrderById(user_id: number): Promise<Order> {
    try {
      const conn = await dbClient.connect();
      const result = await conn.query(this.sql, [user_id, "active"]);
      conn.release();
      return result.rows[0] as Order;
    } catch (err) {
      throw new Error(`Could not find order ${user_id}. Error: ${err}`);
    }
  }

  async getCompletedOrdersByUserId(user_id: number): Promise<Order[]> {
    try {
      const conn = await dbClient.connect();
      const result = await conn.query(this.sql, [user_id, "active"]);
      conn.release();
      return result.rows as Order[];
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

      return {
        ...createOrder,
        products: order.products
      } as Order;
    } catch (err) {
      await conn.query("ROLLBACK");
      throw new Error(`Could not create new order. Error: ${err}`);
    } finally {
      conn.release();
    }
  }

  async addProduct(
    orderId: number,
    orderProduct: OrderProduct
  ): Promise<OrderProduct> {
    const conn = await dbClient.connect();
    try {
      const orderResult = await conn.query(
        "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
        [orderId, orderProduct.product_id, orderProduct.quantity]
      );

      const result = orderResult.rows[0];

      return result as OrderProduct;
    } catch (err) {
      console.log(err);
      throw new Error(`Could not create new order.`);
    } finally {
      conn.release();
    }
  }
}
