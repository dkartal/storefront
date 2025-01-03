import { Response, Request } from "express";
import { Product, ProductStore } from "../models/Product";

const store = new ProductStore();

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products: Product[] = await store.getAll();
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product: Product = await store.getById(parseInt(req.params.id));
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    };

    const newProduct: Product = await store.create(product);
    res.status(201).json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
