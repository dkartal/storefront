import { Request, Response } from "express";
import { User, UserStore } from "../models/User";

const store = new UserStore();

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users: User[] = await store.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user: User = await store.getById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user: User = await store.create({
      firstName: req.body.username,
      lastName: req.body.lastname,
      password: req.body.password
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
