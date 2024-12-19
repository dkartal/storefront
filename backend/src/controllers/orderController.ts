import { Response } from "express";
import { Order, OrderProduct, OrderStore } from "../models/Order";
import { AuthenticatedRequest } from "../middlewares/authenticateToken";

const store = new OrderStore();

export const getCurrentOrderByUserId = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId: number = req.user?.id as number;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const order: Order = await store.getCurrentOrderById(userId);
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "cannot get current order" });
  }
};

export const getCompletedOrdersByUserId = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId: number = req.user?.id as number;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const order: Order[] = await store.getCompletedOrdersByUserId(userId);
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "cannot get orders" });
  }
};

export const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  const userId: number = req.user?.id as number;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { products } = req.body;
  const o = {
    user_id: userId,
    products: products ?? []
  } as Order;

  try {
    const order: Order = await store.createOrder(o);
    res.status(201).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "cannot create order" });
  }
};

export const addProduct = async (req: AuthenticatedRequest, res: Response) => {
  const orderId: number = parseInt(req.params.id);
  const productId: number = parseInt(req.body.product_id);
  const quantity: number = parseInt(req.body.quantity);

  try {
    const order: OrderProduct = await store.addProduct(orderId, {product_id: productId, quantity: quantity} as OrderProduct);
    res.status(201).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "cannot add product" });
  }
};
