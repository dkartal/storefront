import { Request, Response } from "express";
import { Order, OrderStore } from "../models/Order";

const store = new OrderStore();

export const getCurrentOrderByUserId = async (req: Request, res: Response) => {
  try {
    const order: Order = await store.getCurrentOrderById(
      parseInt(req.params.id)
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getCompletedOrdersByUserId = async (
  req: Request,
  res: Response
) => {
  try {
    const order: Order[] = await store.getCompletedOrdersByUserId(
      parseInt(req.params.id)
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const { user_id, products } = req.body;
  const o = {
    user_id,
    products
  } as Order;
  try {
    const order: Order = await store.createOrder(o);
    res.status(201).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
