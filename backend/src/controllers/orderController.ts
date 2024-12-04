import { Request, Response } from "express";
import { Order, OrderStore } from "../models/Order";

const store = new OrderStore();

export const getCurrentOrderByUserId = async (req: Request, res: Response) => {
  try {
    const order: Order = await store.getCurrentOrderByUserId(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const { userId, products } = req.body;
  try {
    const order: Order = await store.createOrder({
      userId,
      orderStatus: "active",
      products
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
